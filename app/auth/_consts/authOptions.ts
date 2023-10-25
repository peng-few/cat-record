import { Collection } from "../_db/Collection";
import { UserRole } from "../_db/schema/UserSchema";
import { type AuthOptions, type Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET  ?? '',
    })
  ],
  callbacks: {
    signIn({ account, profile }) {
      return !!(account?.provider !== "google" || profile?.email_verified)
    },

    async jwt({ token, user }) {
      if (!user) return token;

      const [DBUser] = await Collection.getDatas([{ $match: { email: user?.email } }])
      console.log('jwt')
      if (DBUser) {
        return { ...token, ...user, role: DBUser.role, _id: DBUser._id }
      }

      const newUser = await Collection.addData({ email: user?.email as string, role: UserRole.Enum.General })
      return { ...token, ...user, role: newUser.role, _id: newUser._id.toHexString()}
    },

    async session({ session, token }) {
      const sess: Session = {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          _id: token._id,
        },
      };

      return sess;
    },
  }
}
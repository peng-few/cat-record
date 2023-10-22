import { UserRole } from "@/auth/_db/schema/UserSchema"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    expires: string,
    user: {
      role: UserRole
      name: string
      email: string
      image: string
    }
  }
  interface Profile {
    email_verified?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
  }
}
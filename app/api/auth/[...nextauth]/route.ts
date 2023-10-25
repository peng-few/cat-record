import { authOptions } from "@/auth/_consts/authOptions"
import NextAuth from "next-auth"
import { revalidateTag } from "next/cache"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
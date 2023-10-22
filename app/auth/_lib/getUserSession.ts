import { getServerSession } from "next-auth"
import { authOptions } from "../_consts/authOptions"

export const getUserSession = () => {
  return getServerSession(authOptions)
}
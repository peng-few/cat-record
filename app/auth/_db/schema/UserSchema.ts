import { z } from "zod";

export const UserRole = z.enum(['Admin','General'])
export type UserRole = z.infer<typeof UserRole>;

export const UserSchema = z.object({
  email: z.string(),
  role: UserRole,
})
export type User = z.infer<typeof UserSchema>; 

export const isAdmin = (type?: string) => type === UserRole.Enum.Admin
export const isGeneral = (type?:string) => type === UserRole.Enum.General
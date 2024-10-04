import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(6, "Username must be at least six characters long")
  .max(10, "Username must not be more than 8 characters")
  .regex(/^[0-9]+$/, "Username must only contain numbers (0-9)");


export const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/\d/, { message: "Password must contain at least one number (0-9)" });


export const emailValidation = z
        .string()
        .email({ message: "Invalid email address" })
        // .regex(/^[\w-\.]+@uap-bd\.edu$/, { message: "Email must belong to the domain '@uap-bd.edu'" });

export const roleValidation = z.enum(["user", "admin"],{
    errorMap: () => ({ message: "Role must be either 'user' or 'admin'" }),
})

export const signUpSchema  = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    role: roleValidation.default("user"), 
    invitationCode: z.string().optional(),
})



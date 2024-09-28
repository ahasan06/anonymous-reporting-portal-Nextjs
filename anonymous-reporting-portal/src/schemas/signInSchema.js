import {z} from "zod"

export const identifireValidation =  z
    .string()
    .min(1,"Email or Username is Required")
    .max(100,"Email or Username not longer than 100 characters")

export const passwordValidation = z
    .string()
    .min(6,"Password must be at least 6 characters long")

export const signInSchema = z.object({
    identifier: identifireValidation,
    password : passwordValidation
})
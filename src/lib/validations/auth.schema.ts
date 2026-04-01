import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .nonempty({ message: "Email is required" })
    .trim(),
  password: z
    .string()
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter"})
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password is too long" })
    .trim(),
});
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const changePasswordFormSchema = toTypedSchema(z.object({
  oldPassword: z.string({
    required_error: "Preencha este campo"
  }),
  newPassword: z.string({
    required_error: "Preencha este campo"
  })
    .min(4, "A senha deve ter no mínimo 8 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial."),
  confirm_password: z.string({
    required_error: "Preencha este campo"
  }),
}).refine(data => data.newPassword === data.confirm_password, {
  message: "As senhas devem ser iguais.",
  path: ["confirm_password"],
}))
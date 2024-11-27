import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const formSchema = toTypedSchema(z.object({
  username: z.string({
    required_error: "Insira username para prosseguir.",
  }).trim()
    .min(1, "O username não pode estar vazio."),
  password: z.string({
    required_error: "A senha é obrigatória. Insira uma senha segura para continuar.",
  }).trim()
    .min(1, "A senha não pode estar vazia."),
}))
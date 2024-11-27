import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const accountFormSchema = toTypedSchema(z.object({
  type: z.string({
    required_error: "Selecione o tipo de conta"
  }).min(1, "Deve selecionar o tipo de conta."),
  currency: z.string({
    required_error: "Selecione o tipo de moeda para a conta"
  })
    .min(1, "Deve selecionar o tipo de moeda."),
  name: z.string({
    required_error: "Preencha este campo"
  }).min(1, "Insira o nome da conta."),
  institution: z.string().nullable(),
  description: z.string().nullable(),
}))
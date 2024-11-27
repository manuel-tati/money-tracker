import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const depositFormSchema = toTypedSchema(z.object({
  accountId: z.string({
    required_error: "Selecione a conta"
  }).min(1, "Deve selecionar a conta que deseja depositar."),
  balance: z.number()
    .positive({ message: "O valor do depósito deve ser maior que zero" })
    .nonnegative({ message: "O saldo não pode ser negativo" })
}))
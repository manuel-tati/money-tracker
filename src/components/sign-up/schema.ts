import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'E-mail é obrigatório!',
      })
      .email('E-mail inválido! Por favor, insira um e-mail válido.')
      .min(1, 'O campo de e-mail não pode estar vazio.'),
    username: z
      .string({
        required_error:
          'Username é obrigatório. Insira um username para prosseguir.',
      })
      .trim()
      .min(1, 'O username não pode estar vazio.'),
    password: z
      .string({
        required_error:
          'A senha é obrigatória. Insira uma senha segura para continuar.',
      })
      .trim()
      .min(1, 'A senha não pode estar vazia.'),
  })
);

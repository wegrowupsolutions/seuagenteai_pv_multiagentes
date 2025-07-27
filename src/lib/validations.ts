import { z } from 'zod';

// Auth validation schemas
export const signUpSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  displayName: z.string().optional()
});

export const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
});

// Chat message validation schema
export const chatMessageSchema = z.object({
  message: z.string()
    .min(1, 'Mensagem não pode estar vazia')
    .max(500, 'Mensagem muito longa (máximo 500 caracteres)')
    .refine(
      (text) => !/<script|javascript:|data:|vbscript:/i.test(text),
      'Conteúdo não permitido na mensagem'
    )
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type ChatMessageData = z.infer<typeof chatMessageSchema>;
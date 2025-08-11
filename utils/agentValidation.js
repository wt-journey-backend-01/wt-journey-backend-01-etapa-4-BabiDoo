import z from 'zod';

const agentSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório.'),
  dataDeIncorporacao: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'A data deve estar no formato YYYY-MM-DD.'),
  cargo: z.string().min(1, 'Cargo é obrigatório.'),
});

export { agentSchema };
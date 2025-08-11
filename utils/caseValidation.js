const { z } = require('zod');

const caseSchema = z.object({
  titulo: z.string().min(10, 'O título do caso deve ter pelo menos 10 caracteres.'),
  descricao: z.string().min(10, 'A descrição do caso deve ter pelo menos 10 caracteres.'),
  status: z.enum(['aberto', 'solucionado']).optional(),
  agenteId: z.number().int().positive().nullable().optional(),
});

module.exports = { caseSchema };

import { z } from 'zod';

const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

export const UpsertInvoice = InvoiceFormSchema.omit({ id: true, date: true });

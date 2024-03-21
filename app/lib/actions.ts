'use server';

import { UpsertInvoice } from '@/app/lib/schemas';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createInvoice = async (formData: FormData) => {
  const { customerId, amount, status } = UpsertInvoice.parse(
    Object.fromEntries(formData.entries()),
  );
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`INSERT INTO invoices (customer_id, amount, status, date)
                  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error) {
    return { message: 'Database Error: Failed to Create Invoice.' };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};

export const updateInvoice = async (id: string, formData: FormData) => {
  const { customerId, amount, status } = UpsertInvoice.parse(
    Object.fromEntries(formData.entries()),
  );
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  try {
    await sql`UPDATE invoices
                  SET customer_id = ${customerId},
                      amount      = ${amountInCents},
                      status      = ${status},
                      date        = ${date}
                  WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Update Invoice Failed.' };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};

export const deleteInvoice = async (id: string) => {
  try {
    await sql`DELETE
                  FROM invoices
                  WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Delete Invoice Failed...' };
  }

  revalidatePath('/dashboard/invoices');
  return { message: 'Invoice Deleted.' };
};

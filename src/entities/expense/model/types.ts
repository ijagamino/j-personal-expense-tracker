import type { Tables, TablesInsert, TablesUpdate } from 'src/shared/api/database.types';

export type Expense = Tables<'expenses'>;
export type CreateExpenseDto = TablesInsert<'expenses'>;
export type UpdateExpenseDto = TablesUpdate<'expenses'>;

export type ExpenseFilters = {
  from: string;
  to: string;
};

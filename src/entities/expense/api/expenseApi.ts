import { endOfDay, formatISO, startOfDay } from 'date-fns';
import { supabase } from 'src/shared/api';
import type { CreateExpenseDto, Expense, ExpenseFilters, UpdateExpenseDto } from '../model/types';

export const expenseApi = {
  async fetchAll(filters?: ExpenseFilters): Promise<Expense[]> {
    let query = supabase.from('expenses').select('*').order('created_at', { ascending: false });

    if (filters && filters.from && filters.to) {
      query = query
        .gte('date', formatISO(startOfDay(filters.from)))
        .lte('date', formatISO(endOfDay(filters.to)));
    }

    const { data, error } = await query;
    if (error) throw error;

    return data;
  },

  // async fetchById(id: string): Promise<Expense> {
  //   const { data, error } = await supabase
  //     .from('expenses')
  //     .select('*, categories(*)')
  //     .eq('id', id)
  //     .single();

  //   if (error) throw error;
  //   return data as Expense;
  // },

  async create(expense: CreateExpenseDto): Promise<Expense> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        ...expense,
        user_id: user.id,
      })
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: number, payload: UpdateExpenseDto): Promise<Expense> {
    const { data, error } = await supabase
      .from('expenses')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('expenses').delete().eq('id', id);

    if (error) throw error;
  },
};

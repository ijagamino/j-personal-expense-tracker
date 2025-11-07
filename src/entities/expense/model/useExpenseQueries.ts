import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { UseMutationWithNotify } from 'src/shared/api';
import type { MaybeRef } from 'vue';
import { computed, toValue } from 'vue';
import { expenseApi } from '../api/expenseApi';
import { expenseKeys } from './queries';
import type { CreateExpenseDto, Expense, ExpenseFilters, UpdateExpenseDto } from './types';

export function useExpenses(filters?: MaybeRef<ExpenseFilters>) {
  return useQuery<Expense[]>({
    queryKey: computed(() => expenseKeys.list(toValue(filters))),
    queryFn: () => expenseApi.fetchAll(toValue(filters)),
    // enabled: computed(() => !filters || !!unref(filters)?.from),
  });
}

export function useAddExpense() {
  return UseMutationWithNotify<Expense, CreateExpenseDto, ExpenseFilters>({
    mutationFn: (expense: CreateExpenseDto) => expenseApi.create(expense),
    entityKey: expenseKeys,
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateExpenseDto }) =>
      expenseApi.update(id, payload),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: expenseKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: expenseKeys.detail(variables.id) });
    },

    onError: (error: Error) => {
      console.error('Failed to update expense:', error.message);
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => expenseApi.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: expenseKeys.lists() });
    },

    onError: (error: Error) => {
      console.error('Failed to delete expense:', error.message);
    },
  });
}

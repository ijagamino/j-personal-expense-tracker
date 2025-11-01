import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useExpenseStore } from './store';
import type { Expense } from './types';
import { useExpenses } from './useExpenseQueries';

export function useExpenseTotals() {
  const expenseStore = useExpenseStore();
  const { filters } = storeToRefs(expenseStore);

  const { data: expenses, isLoading } = useExpenses(filters);

  const totalAmount = computed(() => {
    if (!expenses.value) return 0;
    return expenses.value.reduce((sum, e: Expense) => sum + Number(e.amount), 0);
  });

  return {
    totalAmount,
    isLoading,
  };
}

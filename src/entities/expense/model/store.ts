import { format } from 'date-fns';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ExpenseFilters } from './types';

export const useExpenseStore = defineStore('expenses', () => {
  const today = format(new Date(), 'yyyy/MM/dd');
  const filters = ref<ExpenseFilters>({ from: today, to: today });

  function setFilters(newFilters: ExpenseFilters) {
    filters.value = {
      ...filters.value,
      ...newFilters,
    };
  }

  return { filters, setFilters };
});

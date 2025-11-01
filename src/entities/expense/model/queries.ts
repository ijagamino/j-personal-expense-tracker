import { queryOptions } from '@tanstack/vue-query';
import { expenseApi } from '../api/expenseApi';
import type { ExpenseFilters } from './types';

export const expenseKeys = {
  all: ['expenses'] as const,
  lists: () => [...expenseKeys.all, 'list'] as const,
  list: (filters?: ExpenseFilters) => [...expenseKeys.lists(), filters] as const,
  details: () => [...expenseKeys.all, 'detail'] as const,
  detail: (id: number) => [...expenseKeys.details(), id] as const,
};

export const expenseQueries = {
  all: () =>
    queryOptions({
      queryKey: expenseKeys.lists(),
      queryFn: () => expenseApi.fetchAll(),
    }),

  // detail: (id: number) =>
  //   queryOptions({
  //     queryKey: expenseKeys.detail(id),
  //     queryFn: () => expenseApi.fetchById(id),
  //     enabled: !!id,
  //   }),
};

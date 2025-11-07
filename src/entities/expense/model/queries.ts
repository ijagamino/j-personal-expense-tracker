import { queryOptions } from '@tanstack/vue-query';
import type { EntityKeys } from 'src/shared/api/query.types';
import { expenseApi } from '../api/expenseApi';
import type { ExpenseFilters } from './types';

export const expenseKeys: EntityKeys<ExpenseFilters> = {
  all: ['expenses'],
  lists: () => [...expenseKeys.all, 'list'],
  list: (filters?: ExpenseFilters) => [...expenseKeys.lists(), filters],
  details: () => [...expenseKeys.all, 'detail'],
  detail: (id: number) => [...expenseKeys.details(), id],
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

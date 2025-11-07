import { useMutation, useQueryClient, type MutationFunction } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import type { EntityKeys } from './query.types';

export function UseMutationWithNotify<TData, TVariables, Filters = unknown>({
  mutationFn,
  entityKey,
  errorMessage = '',
}: {
  mutationFn: MutationFunction<TData, TVariables>;
  entityKey: EntityKeys<Filters>;
  errorMessage?: string;
}) {
  const queryClient = useQueryClient();
  const $q = useQuasar();

  return useMutation({
    mutationFn,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: entityKey.lists() });
    },

    onError: (error: Error) => {
      $q.notify({
        message: error.message || errorMessage || 'Request failed',
        color: 'negative',
        icon: 'error',
      });
    },
  });
}

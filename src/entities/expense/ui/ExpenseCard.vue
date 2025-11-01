<template>
  <q-card>
    <q-card-section v-if="!isEditing" horizontal class="justify-between">
      <q-card-section class="column justify-around">
        <header class="flex items-center">
          <q-icon :name="expense.amount < 0 ? 'arrow_circle_down' : 'arrow_circle_up'"
            :color="expense.amount < 0 ? 'negative' : 'positive'" size="md">
          </q-icon>

          <h3 class="q-ml-sm text-h4 text-weight-bold">
            {{ formattedAmount }}

            <!-- <q-popup-edit :model-value="expense.amount" v-slot="scope" buttons label-set="Update"
              @save="(val) => handleUpdateAmount(id, val)">
              <q-input v-model.number="scope.value" type="number" autofocus outlined dense />
            </q-popup-edit> -->
          </h3>

        </header>
        <!-- <div> -->
        <span class="text-caption">
          {{ expense.description }}
          <!-- <q-popup-edit :model-value="expense.description" v-slot="scope" buttons label-set="Update"
            @save="(val) => handleUpdateAmount(id, val)">
            <q-input v-model.trim="scope.value" autofocus outlined dense />
          </q-popup-edit> -->
        </span>
        <span class="text-subtitle2 text-weight-regular text-italic">{{ formattedCreateAt }}</span>
        <!-- </div> -->
      </q-card-section>

      <q-card-actions class="justify-around" vertical>
        <q-btn icon="edit" color="positive" flat round @click="handleEdit" />
        <q-btn icon="delete" color="negative" flat round @click="handleDelete(expense.id)" />
      </q-card-actions>
    </q-card-section>

    <q-card-section v-else horizontal class="justify-between">
      <q-card-section class="column q-col-gutter-xs">
        <q-input class="text-h4 text-weight-bold" v-model.number="localExpense.amount" autofocus outlined dense />
        <q-input class="text-subtitle-2 text-weight-regular" v-model.trim="localExpense.description" outlined dense />
      </q-card-section>

      <q-card-actions class="justify-around" vertical>
        <q-btn icon="check" color="positive" flat round @click="handleUpdate(expense.id, {
          amount: localExpense.amount,
          description: localExpense.description,
          created_at: expense.created_at,
          id: expense.id,
          user_id: expense.user_id,
        })" />
        <q-btn icon="close" color="negative" flat round @click="isEditing = false" />
      </q-card-actions>
    </q-card-section>
  </q-card>

</template>

<script setup lang="ts">
import { format } from 'date-fns';
import _ from 'lodash';
import { useDeleteExpense, useUpdateExpense } from 'src/entities/expense';
import type { Tables } from 'src/shared/api/database.types';
import { computed, ref } from 'vue';
import type { UpdateExpenseDto } from '../model/types';


const expense = defineProps<{
  id: Tables<'expenses'>['id'],
  amount: Tables<'expenses'>['amount'],
  description: Tables<'expenses'>['description'],
  created_at: Tables<'expenses'>['created_at'],
  user_id: Tables<'expenses'>['user_id']
}>()

const { mutate: deleteExpense } = useDeleteExpense()
const { mutate: updateExpense } = useUpdateExpense()

const isEditing = ref(false)

const localExpense = ref<{
  amount: number,
  description: string,
}>({
  amount: 0,
  description: '',
})

const formattedCreateAt = computed(() => format(expense.created_at, 'MMM d, p'))

const formattedAmount = computed(() => Math.abs(expense.amount))

function handleEdit(): void {
  isEditing.value = true

  _.assign(localExpense.value, _.cloneDeep(expense))
}

function handleDelete(id: number): void {
  deleteExpense(id)
}

// function handleUpdateAmount(id: number, newAmount: number) {
//   updateExpense({ id, data: { amount: newAmount } })
// }

// function handleUpdateDescription(id: number, newDescription: string) {
//   updateExpense({ id, data: { description: newDescription } })
// }

function handleUpdate(id: number, data: UpdateExpenseDto): void {
  updateExpense({ id, data })
  isEditing.value = false
}
</script>

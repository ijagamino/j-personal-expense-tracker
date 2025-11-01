<template>
  <q-splitter v-model="splitterModel" :horizontal="$q.screen.lt.md" style="height: 32em;">
    <template #before>
      <div class=q-pa-md>
        <q-date v-model="selectedDate" range today-btn :title="dateTitle" />
      </div>
    </template>

    <template #after>
      <div class="q-pa-md">
        <div v-if="isPending">Loading...</div>
        <div v-else class="col q-col-gutter-md">
          <div v-for="expense in expenses" :key="expense.id">
            <expense-card v-bind="expense" />
          </div>
        </div>
      </div>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import { format, parse } from 'date-fns';
import { storeToRefs } from 'pinia';
import { useExpenses } from 'src/entities/expense';
import { computed, ref, watch } from 'vue';
import { useExpenseStore } from '../model/store';
import { type ExpenseFilters } from '../model/types';
import ExpenseCard from './ExpenseCard.vue';

const expenseStore = useExpenseStore()
const { filters } = storeToRefs(expenseStore)

const today = format(new Date(), 'yyyy/MM/dd')

const splitterModel = ref(50)
const selectedDate = ref<string | ExpenseFilters>(today ?? '')

const { data: expenses, isPending } = useExpenses(filters)

watch(selectedDate, (val) => {
  if (typeof val === 'string') {
    expenseStore.setFilters({ from: val, to: val })
  } else if (val && val.from && val.to) {
    expenseStore.setFilters(val)
  } else {
    expenseStore.setFilters({ from: '', to: '' })
  }
})

const dateTitle = computed(() => {
  const formatDate = (date: string) =>
    format((parse(date, 'yyyy/MM/dd', new Date())), 'MMM d');
  // rturn const formatted = format(parsedDate, 'MMM d');

  const val = selectedDate.value;

  // no date at all
  if (!val) return 'All time';

  // range mode but both empty
  if (typeof val !== 'string' && !val.from && !val.to) return 'All time';

  // single date string
  if (typeof val === 'string') return formatDate(val);

  // range with from/to
  if (val.from && val.to) return `${formatDate(val.from)} - ${formatDate(val.to)}`;
  if (val.from) return formatDate(val.from);
  if (val.to) return formatDate(val.to);

  return 'All time';
})
</script>

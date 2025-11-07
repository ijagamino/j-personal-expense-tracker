<template>
  <div>
    <add-expense-button />

    <div class="text-subtitle1 flex items-center">
      Total amount:
      <span class="q-ml-xs text-weight-bold">
        {{ expenseTotal.totalAmount.value }}
      </span>
      <q-icon class="q-ml-xs" :name="expenseTotal.totalAmount.value < 0 ? 'arrow_circle_down' : 'arrow_circle_up'"
        :color="expenseTotal.totalAmount.value < 0 ? 'negative' : 'positive'" />
    </div>
  </div>

  <expense-list />

</template>

<script setup lang="ts">
import { ExpenseList } from 'src/entities/expense';
import { AddExpenseButton } from 'src/features/expense/add-expense';
// import { useExpenseQueries } from 'src/entities/expense';
import { useExpenseTotals } from 'src/entities/expense';

const expenseTotal = useExpenseTotals()

// const expenseStore = useExpenseStore()
</script>

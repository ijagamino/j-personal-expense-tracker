<template>
  <q-card flat bordered>
    <q-card-section tag="header">
      <h3 class="text-h6 text-weight-bold">Add Entry</h3>
    </q-card-section>

    <q-card-section tag="form" id="expenseForm" @submit.prevent="handleSubmit">
      <div class="row q-col-gutter-sm">
        <q-input class="col-12 col-md" v-model.number="formData.amount" type="number" label="Amount" dense outlined
          hint="Required">
          <template #append>
            <q-icon name="attach_money" />
          </template>
        </q-input>
        <q-input class="col-12 col-md" v-model.trim="formData.description" label="Description" dense outlined
          hint="Required">
          <template #append>
            <q-icon name="description" />
          </template>
        </q-input>
        <q-input class="col-12 col-md" v-model="formData.date" type="date" label="Date" dense outlined clearable
          hint="Optional, defaults to today" />
      </div>
    </q-card-section>

    <q-card-actions class="q-pa-md" align="right">
      <q-btn type="submit" form="expenseForm" color="primary" label="Add Expense" icon="add" />
    </q-card-actions>
  </q-card>
</template>


<script setup lang="ts">
import { useAddExpense } from 'src/entities/expense'
import type { CreateExpenseDto } from 'src/entities/expense/model/types'
import { ref } from 'vue'


const formData = ref<CreateExpenseDto>({
  amount: 0,
  description: '',
  date: '',
})

const addExpense = useAddExpense()

function handleSubmit() {
  addExpense.mutate(formData.value)

  formData.value = {
    amount: 0,
    description: '',
    date: '',
  }
}
</script>

<template>
  <q-form @submit.prevent="handleSubmit">
    <div class="row q-col-gutter-sm">
      <q-input class="col-12 col-md-6" v-model.number="formData.amount" type="number" label="Amount" dense outlined />
      <q-input class="col-12 col-md-6" v-model.trim="formData.description" label="Description" dense outlined />

      <div class="col-auto q-ml-auto">
        <q-btn type="submit" color="primary" label="Add Expense" icon="add" />
      </div>
    </div>
  </q-form>
</template>


<script setup lang="ts">
import { useAddExpense } from 'src/entities/expense'
import type { CreateExpenseDto } from 'src/entities/expense/model/types'
import { ref } from 'vue'


const formData = ref<CreateExpenseDto>({
  amount: 0,
  description: '',
})

const addExpense = useAddExpense()

function handleSubmit() {
  addExpense.mutate(formData.value)

  formData.value = {
    amount: 0,
    description: '',
  }
}
</script>

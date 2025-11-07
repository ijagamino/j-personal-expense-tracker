<template>
  <q-card style="min-width: 32em;">
    <q-card-section tag="header" class="flex items-center ">
      <q-btn :to="{ name: 'login' }" icon="arrow_back" round flat />
      <h2 class="q-ml-sm text-h6">Forgot Password</h2>
    </q-card-section>

    <q-separator />

    <q-card-section class="col q-col-gutter-sm">
      <q-input v-model="email" label="Email" filled dense>
        <template #append>
          <q-icon name="person" />
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-actions align="center" vertical>
      <q-btn class="fit" label="Reset password" color="primary" icon-right="restart_alt"
        @click="userStore.forgotPassword(email)" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/entities/user';
import { ref } from 'vue';

const email = ref('')

const userStore = useUserStore()
</script>

<template>
  <q-card style="min-width: 32em;">
    <q-card-section>
      <header>
        <h2 class=text-h6>Log In</h2>
      </header>
    </q-card-section>

    <q-separator />

    <q-card-section class="col q-col-gutter-sm">
      <q-input v-model="userStore.email" label="Email" filled dense>
        <template #append>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input v-model="userStore.password" label="Password" :type="passwordVisibility ? 'password' : 'text'" filled
        dense>
        <template #append>
          <q-icon :name="passwordVisibility ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="togglePassword" />
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-section class="row">
      <q-btn label="Register" color="primary" icon-right="add" @click="userStore.handleRegister" />
      <q-btn class="q-ml-auto" label="Log In" color="primary" icon-right="login"
        @click="userStore.handleLogin(router)" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/entities/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const passwordVisibility = ref(true)
const router = useRouter()

const togglePassword = () => {
  passwordVisibility.value = !passwordVisibility.value
}

const userStore = useUserStore()
</script>

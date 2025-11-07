<template>
  <q-card style="min-width: 32em;">
    <q-card-section tag="header" class="flex items-center ">
      <h2 class="q-ml-sm text-h6">Update Password</h2>
    </q-card-section>

    <q-separator />

    <q-card-section class="col q-col-gutter-sm">
      <q-input v-model="password" label="Password" :type="passwordVisibility ? 'password' : 'text'" filled dense>
        <template #append>
          <q-icon :name="passwordVisibility ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="passwordVisibility = !passwordVisibility" />
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-actions align="center" vertical>
      <q-btn class="q-ml-auto" label="Update password" color="primary" icon-right="login"
        @click="userStore.updatePassword(password, router)" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/entities/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// const passwordVisibility = ref(true)
const router = useRouter()

const password = ref('')

const passwordVisibility = ref(true)

const userStore = useUserStore()
</script>

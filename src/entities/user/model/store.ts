import _ from 'lodash';
import { acceptHMRUpdate, defineStore } from 'pinia';
// import { api } from 'src/boot/axios';
import type { User } from '@supabase/supabase-js';
import { supabase } from 'src/shared/api';
import { computed, ref, watch } from 'vue';
// import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  // const router = useRouter();

  const token = ref(localStorage.getItem('access_token') || null);
  const user = ref<User | null>();

  const loading = ref(false);
  const email = ref('');
  const password = ref('');

  const initialize = async () => {
    loading.value = true;

    const { data } = await supabase.auth.getSession();

    if (data.session?.user) {
      user.value = data.session.user;
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null;
    });

    loading.value = false;
  };

  const handleLogin = async (router: Router) => {
    try {
      loading.value = true;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      user.value = data.user;
      // isAuthenticated.value = true;

      console.log(token.value);
      await router.push({ name: 'home' });
      return data;
      // alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading.value = false;
    }
  };

  watch(token, (newToken) => {
    if (newToken) {
      // api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      localStorage.setItem('access_token', newToken);
    } else {
      // delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('access_token');
    }
  });

  const handleRegister = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const logout = async (router: Router) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await router.push({ name: 'login' });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // const isAuthenticated = computed(() => !!token.value && !_.isEmpty(user.value));
  const isAuthenticated = computed(() => !_.isEmpty(user.value));

  return {
    email,
    password,
    initialize,
    token,
    user,
    isAuthenticated,
    handleLogin,
    handleRegister,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

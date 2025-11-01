import { useUserStore } from 'src/entities/user';
import type { Router } from 'vue-router';

export function setupAuthGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    // Protected routes
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
      next({ name: 'login' });
      return;
    }

    // Public-only routes (login/register)
    if (to.meta.guestOnly && userStore.isAuthenticated) {
      next({ name: 'home' });
      return;
    }

    next();
  });
}

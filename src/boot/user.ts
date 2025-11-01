import { defineBoot } from '#q-app/wrappers';
import { useUserStore } from 'src/entities/user';

export default defineBoot(async ({ store }) => {
  const userStore = useUserStore(store);

  await userStore.initialize();
});

import { defineBoot } from '#q-app/wrappers';
import { type AxiosInstance } from 'axios';
import { api, axios } from 'src/shared/api';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };

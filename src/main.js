import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import DropZone from 'dropzone-vue';
import VueCookies from 'vue3-cookies';
import axios from 'axios';
import App from './App.vue';
import router from './router';

import '@/assets/styles/bootstrap.css';
import '@/assets/styles/bootstrap-vue3.css';
import store from './store';

const axiosInstance = axios.create();

const app = createApp(App).use(store);
app.config.globalProperties.$axios = { ...axiosInstance };
app
  .use(router)
  .use(BootstrapVue3)
  .use(DropZone)
  .use(VueCookies, {
    expireTimes: '30d',
  })
  .mount('#app');

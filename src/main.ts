import './assets/main.css';

import { Icon, IconConfigProvider } from '@vicons/utils';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Icon', Icon);
app.component('IconConfigProvider', IconConfigProvider);

app.use(router);
app.use(createPinia());

app.mount('#app');

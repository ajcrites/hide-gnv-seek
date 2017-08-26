import Vue from 'vue';
import VueRouter from 'vue-router';

import VueQr from 'vue-qrcode';

import Landing from './landing';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/landing', component: Landing },
  ],
});

new Vue({
  router,
  components: {
    qrcode: VueQr,
  },
}).$mount("#app");

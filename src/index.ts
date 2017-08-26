import Vue from 'vue';
import VueRouter from 'vue-router';

import VueQr from 'vue-qrcode';

import Landing from './landing';
import Place from './place';

Vue.use(VueRouter);

const sot = {
  lastPlace: '',
  places: [],
};

const router = new VueRouter({
  data() {
    return sot;
  },
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', component: Landing },
    { path: '/place/:id', component: Place, props: true },
  ],
});

new Vue({
  router,
  components: {
    qrcode: VueQr,
  },
}).$mount("#app");

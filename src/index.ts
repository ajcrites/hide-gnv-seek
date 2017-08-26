import Vue from 'vue';
import VueRouter from 'vue-router';

import Landing from './landing';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/landing', component: Landing },
  ],
});

new Vue({
  router,
}).$mount("#app");

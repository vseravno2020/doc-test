import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from "@/router";
// @ts-ignore
Vue.use(VueRouter);
Vue.config.productionTip = false
export const eventBus = new Vue()

/* eslint-disable no-new */
const app = new Vue({
  router,
  components: {
    App
  },
  template: '<App />'
}).$mount('#app')

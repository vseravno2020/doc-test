import VueRouter from "vue-router";

import catalog from "@/pages/catalog";
import favorites from "@/pages/favorites";

const routes = [
  {
    path: "",
    component: catalog,
  },
  {
    path: "/favorites",
    component: favorites,
  },
];

const router = new VueRouter({
  linkExactActiveClass:'header__item-active',
  // @ts-ignore
  routes,
  mode: "history",
});


export default router

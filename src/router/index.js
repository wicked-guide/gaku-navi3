import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  // もくじ
  {
    path: "/:course",
    name: "course",
    component: () => import("../views/CourseIndex.vue"),
  },
  // クレジット
  {
    path: "/credit",
    name: "credit",
    component: () => import("../views/CreditinfoView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

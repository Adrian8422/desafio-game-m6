import { Router } from "@vaadin/router";

const root = document.querySelector(".root");

const router = new Router(root);

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/register", component: "sign-up" },
  { path: "/home-dos", component: "home-dos" },
]);

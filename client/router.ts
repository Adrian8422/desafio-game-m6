import { Router } from "@vaadin/router";

const root = document.querySelector(".root");

const router = new Router(root);

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/register", component: "sign-up" },
  { path: "/home-dos", component: "home-dos" },
  { path: "/full-sala", component: "full-sala" },
  { path: "/share-code", component: "share-code" },
  { path: "/access-room", component: "access-room" },
  { path: "/waiting-start", component: "waiting-start" },
  { path: "/select-play", component: "select-play" },
]);

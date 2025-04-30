import "./components/menu-categories.js";
import "./components/item-card.js";
import "./components/header.js";

import "./pages/landing-page.js";
import "./pages/menu-page.js";
import "./pages/item-page.js";

import { Router } from "./router.js";

const router = new Router({
  rootId: "app",
  routes: {
    '/': 'landing-page',
    '/menu': 'menu-page',
    '/item/:id': 'item-page',
  }
});

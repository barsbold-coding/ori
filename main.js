import "./components/menu-categories.js";
import "./components/item-card.js";
import "./components/header.js";
import "./components/footer.js";

import "./pages/landing-page.js";
import "./pages/menu-page.js";
import "./pages/item-page.js";
import "./pages/login-page.js"
import "./pages/cart-page.js";

import { Router } from "./router.js";
import { cartService } from "./cart-service.js";

window.cartService = cartService;

const hideHeaderOnPaths = [
  '/login', 
  '/'
];

const hideFooterOnPaths = [
  '/login',
  '/'
];

const router = new Router({
  rootId: "app",
  routes: {
    '/': 'landing-page',
    '/menu': 'menu-page',
    '/item/:id': 'item-page',
    '/login': 'login-page',
    '/cart': 'cart-page',
    '/account': 'login-page',
    '/order-history': 'login-page',
  },
  hideHeaderOnPaths,
  hideFooterOnPaths
});

window.router = router;

window.addTestItemToCart = () => {
  cartService.addItem({
    id: Math.floor(Math.random() * 1000),
    name: "Test Coffee",
    price: 4.99,
    quantity: 1
  });
  console.log("Added test item to cart");
};

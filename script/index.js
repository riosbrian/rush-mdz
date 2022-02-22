import { ProductModel } from "./models/product.js";
import { ProductView } from "./models/product.js";
import { ProductController } from "./controllers/productController.js";
import { GiftCardController } from "./controllers/giftCardController.js";
import { ShoppingCart } from "./models/shoppingCart.js";
import { GiftCardModel, GiftCardView } from "./models/giftCard.js";

const cart = new ShoppingCart();

/* INSTANCIAR MVC */
const productModel = new ProductModel();
const productView = new ProductView();
const giftModel = new GiftCardModel();
const giftView = new GiftCardView();
const app = new ProductController(productModel, productView);
const giftCard = new GiftCardController(giftModel, giftView);

/* GUARDAR PRODUCTOS EN EL LOCAL STORAGE */

const getProducts = async () => {
  try {
    const res = await fetch("script/products.json");
    const data = await res.json();
    const toLocalStorage = JSON.stringify(data.stock);
    localStorage.setItem("stock", toLocalStorage);
  } catch (error) {
    console.log(error);
  }
};

getProducts();

const getCards = async () => {
  try {
    const res = await fetch("script/products.json");
    const data = await res.json();
    const toLocalStorage = JSON.stringify(data.cards);
    localStorage.setItem("cards", toLocalStorage);
  } catch (error) {
    console.log(error);
  }
};

getCards();

$(document).ready(function () {
  document.location.href = "#";
  cart.printCart();
  cart.totalCart();

  $(".btn--clearCart").click((e) => {
    e.preventDefault();
    cart.emptyCart();
    cart.printCart();
    cart.totalCart();
  });
});
/* OBTENER PRODUCTOS DEL LOCALSTORAGE PARA PINTAR EL CARRITO */

/* DEFINIR RUTAS */

const routes = [
  { path: "/", action: "productos" },
  { path: "/giftcard", action: "giftcard" },
  { path: "/contacto", action: "contacto" },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || "/";
const findActionByPath = (path, routes) =>
  routes.find((r) => r.path == path || undefined);

const router = () => {
  const path = parseLocation();
  const { action = "error" } = findActionByPath(path, routes);
  console.log(action);
  switch (action) {
    case "productos":
      document.location.href = "#";
      app.list("#app", cart);
      break;
    case "giftcard":
      giftCard.list("#app", cart);
      break;
    case "contacto":
      app.list("#app", cart);
      break;
    default:
      console.log("error");
  }
};

$(window).on("load", function () {
  router();
});

$(window).on("hashchange", function (e) {
  console.log("hash change");
  router();
});

$(".btn--shoppingCart").click(function (e) {
  e.preventDefault();
  $(".shoppingCart").toggle();
});

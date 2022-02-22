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

$(document).ready(function () {
  /* document.location.href = "#"; */
  cart.printCart();
  cart.totalCart();

  /* mostrar carrito */
  $(".btn--shoppingCart").click(function (e) {
    e.preventDefault();
    $(".shoppingCart").toggle();
  });

  /* vaciar carrito */
  $(".btn--clearCart").click((e) => {
    e.preventDefault();
    cart.emptyCart();
    cart.printCart();
    cart.totalCart();
  });

  /* comprar */
  $(".btn--buy").click((e) => {
    e.preventDefault();

    const cartItems = JSON.parse(localStorage.getItem("itemsCart")) || [];
    const giftCode = JSON.parse(localStorage.getItem("codes"));

    if (cartItems.length >= 1) {
      let discountArray = [];
      let codes = "";
      let cont = 1;
      if (giftCode) {
        for (const i of giftCode) {
          codes += `código ${cont}: ${i.code} `;
          discountArray.push(i);
          localStorage.setItem("discountCode", JSON.stringify(discountArray));
        }
        cont++;
        swal(
          "¡Te lo mereces!",
          `Gracias por comprar en RUSH SPORTWEAR
           Estos son tus codigos de gift Card: ${codes}`,
          "success"
        );
        localStorage.removeItem("codes");
      } else {
        swal(
          "¡Te lo mereces!",
          "Gracias por comprar en RUSH SPORTWEAR",
          "success"
        );
        localStorage.removeItem("discount");
      }
    } else {
      swal("", "Agrega algo al carrito!", "error");
    }

    cart.emptyCart();
    cart.totalCart();
    cart.printCart();
  });
});

/* DEFINIR RUTAS */

const routes = [
  { path: "/", action: "productos" },
  { path: "/giftcard", action: "giftcard" },
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

class Product {
  constructor(id, productName, price, img, stock, amount) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.productImg = img;
    this.stock = stock;
    this.amount = amount;
  }
}

class ProductModel {
  constructor() {
    const getProducts = JSON.parse(localStorage.getItem("stock")) || [];
    this.products = getProducts.map(
      (product) =>
        new Product(
          product.id,
          product.productName,
          product.price,
          product.productImg,
          product.stock,
          product.amount
        )
    );
  }

  printProducts() {
    this.products.forEach((e) => {
      console.log(e);
    });
  }
}

class ProductView {
  listProducts(app, data, cart) {
    let htmlContent = "";

    const products = data.map((data) => {
      let productCard = `<article id=${data.id} class="productItem">
                          <img class="productItem__img" src= ${data.productImg} alt="">
                          <h3 class="productItem__description">${data.productName}</h3>
                          <p class="productItem__price">$${data.price}</p>
                          <button id=${data.id} class="btn--addToCart">Agregar al Carrito</button>
                         </article>`;
      htmlContent += productCard;
    });

    document.querySelector(app).innerHTML = htmlContent;

    $(".btn--addToCart").click(function (e) {
      /* BUSCO EL ID DEL BOTON */
      let buttonId = e.target.getAttribute("id");
      /* EVALUO SI YA ESTA EN EL CARRITO ESE ITEM */
      let inCart = cart.items.find((item) => item.id == buttonId);
      if (!inCart) {
        let item = e.target.getAttribute("id");
        cart.addToCart(data[item - 1]);
        cart.printCart();
        cart.totalCart();
      }
    });
  }

  giftCard(app) {
    const hola = `<img src="./images/1.png" alt="">`;
    document.querySelector(app).innerHTML = hola;
  }
}

export { Product };
export { ProductModel };
export { ProductView };

"use strict";

class ShoppingCart {
  constructor(customerName, date) {
    this.customerName = customerName;
    this.date = date;
    this.items = [];
    this.total = 0;
  }

  getProductsToLS() {
    const getProductsToLS = JSON.parse(localStorage.getItem("itemsCart")) || [];
    this.items = getProductsToLS;
    return this.items;
  }

  saveToLocalStorage() {
    const toJson = JSON.stringify(this.items);
    localStorage.setItem("itemsCart", toJson);
  }

  addToCart(product) {
    /* REVISO SI SE ENCUENTRA EN EL CARRITO */
    const inCart = this.items.find((item) => item.id == product.id);

    if (!inCart) {
      this.items.push(product);
      this.saveToLocalStorage();
      this.printCart();
    }
  }

  deleteToCart(product) {
    const items = this.getProductsToLS();
    const noProduct = items.filter((item) => item.id != product.id);
    this.items = noProduct;
    this.saveToLocalStorage();
  }

  printCart() {
    /* OBTENGO LOS PRODUCTOS DEL LOCALSTORAGE */
    const productList = this.getProductsToLS();

    /* CREO UN ARRAY SIN ITEMS DUPLICADOS */
    let noDuplicates = productList.reduce((acumulador, element) => {
      if (!acumulador.find((data) => data.id === element.id)) {
        acumulador.push(element);
      }
      return acumulador;
    }, []);

    let htmlContent = "";

    /* IMPRIMO EL ARRAY SIN DUPLICADOS */
    if (noDuplicates != []) {
      noDuplicates.map((item) => {
        let itemCard = `<div id=${item.id} class="item">
                        <img class="item__img" src=${item.productImg} alt=""/>
                        <h4 class="item__description">${item.productName}</h4>
                        <div class="item__amount">
                          <button id=${item.id} class="btnAmount btn--rest"><i class="fa-solid fa-angle-left"></i></button>
                          <p class="itemAmount itemAmount--${item.id}">${item.amount}</p>
                          <button id=${item.id} class="btnAmount btn--sum"><i class="fa-solid fa-angle-right"></i></button>
                        </div>
                        <p class="item__price">+${item.price}</p>
                        <button id=${item.id} class="btn--deleteItem">
                         <i class="fa-solid fa-trash-can btn--trash"></i>
                        </button>
                      </div>`;

        htmlContent += itemCard;
      });
    }
    document.querySelector(".shoppingCart__items").innerHTML = htmlContent;

    /* AUMENTAR ITEMS DEL CARRITO */
    $(".btn--sum").click((e) => {
      let itemID = e.target.parentNode.getAttribute("id");
      const getItem = document.querySelector(`.itemAmount--${itemID}`);

      const getAmount = JSON.parse(localStorage.getItem("itemsCart"));

      for (const i of getAmount) {
        if (i.id == itemID) {
          if (itemID > 100) {
            swal(
              "Oops",
              "Para adquirir otra gift card hagado de la propia sección",
              "error"
            );
          } else {
            i.amount = i.amount + 1;
            console.log(i);
            getItem.innerHTML = i.amount;
            localStorage.setItem("itemsCart", JSON.stringify(getAmount));
          }
        }
      }

      this.totalCart();
    });

    /* DISMINUIR ITEMS DEL CARRITO */
    $(".btn--rest").click((e) => {
      let itemID = e.target.parentNode.getAttribute("id");
      const getItem = document.querySelector(`.itemAmount--${itemID}`);

      const getAmount = JSON.parse(localStorage.getItem("itemsCart"));

      let cont = 0;
      for (const i of getAmount) {
        if (i.id == itemID) {
          i.amount = i.amount - 1;
          if (i.amount == 0) {
            getAmount.splice(cont, 1);
            e.target.parentNode.parentNode.parentNode.remove();
            localStorage.setItem("itemsCart", JSON.stringify(getAmount));
            this.totalCart();
          } else {
            getItem.innerHTML = i.amount;
            localStorage.setItem("itemsCart", JSON.stringify(getAmount));
            this.totalCart();
          }
        }
        cont++;
      }

      this.totalCart();
    });

    /* ELIMINAR ITEMS DEL CARRITO */
    $(".btn--trash").click((e) => {
      let itemID = e.target.parentNode.getAttribute("id");

      const getItem = JSON.parse(localStorage.getItem("itemsCart"));

      for (const i of getItem) {
        if (i.id == itemID) {
          this.deleteToCart(i);
          e.target.parentNode.parentNode.remove();
          this.totalCart();
        }
      }
    });
  }

  /* VACIAR CARRITO */
  emptyCart() {
    this.items = [];
    this.saveToLocalStorage();
  }

  /* CALCULAR EL TOTAL DEL CARRITO */
  totalCart() {
    const array = this.getProductsToLS();
    let discount = JSON.parse(localStorage.getItem("discount"));

    let sum = 0;

    for (const i of array) {
      sum = sum + i.price * i.amount;
    }

    if (array.length == 0 && !discount) {
      sum = 0;
    } else {
      if (sum == 0) {
        sum = -discount;
        /* localStorage.removeItem("discount"); */
      } else {
        sum = sum - discount;

        if (discount - sum <= 0) {
          localStorage.removeItem("discount");
        } else {
          const rest = -0 - sum;
          localStorage.getItem("discount", JSON.stringify(rest));
          console.log(rest);
        }
      }
    }

    document.querySelector(".shoppingCart__total").innerHTML = `Total: $${sum}`;
  }
}

export { ShoppingCart };

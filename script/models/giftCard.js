/* CLASE PARA GUARDAR LOS CODIGOS DE DESCUENTO */

class Codes {
  constructor(amount, code) {
    this.amount = amount;
    this.code = code;
  }
}

/* ARRAY CON LOS CODIGOS DE DESCUENTO */
const codes = [];

class GiftCard {
  constructor(id, productName, img, price, amount) {
    this.id = id;
    this.productName = productName;
    this.productImg = img;
    this.price = price;
    this.amount = amount;
  }
}

class GiftCardModel {
  constructor() {}

  printCards() {
    console.table(this.tarjetas);
  }
}

class GiftCardView {
  listGiftCards(app, cart) {
    let cardContent = `<article class="buyGiftCard">
                            <h3 class="buyGiftCard__title">COMPRE UNA GIFT CARD</h3>
                            <p class="buyGiftCard__text">Si no sabe que regalar esta es su mejor opción, regale una gift card desde $5000 pesos.</p>
                            <div class="buyGiftCard__input">
                              <input id="input" type="text" placeholder="$ Ingrese el monto"></input>
                              <button class="btn--buyGiftCard">COMPRAR</button>
                            </div>
                           </article>
                           <article class="exchangeGiftCard">
                            <h3 class="exchangeGiftCard__title">CANJEAR UNA GIFT CARD</h3>
                            <p class="exchangeGiftCard__text">Si ya tenés un código ingresalo, el valor de la gift card se verá reflejado en el total de tu compra.</p>
                            <div class="exchangeGiftCard__input">
                              <input id="code" type="text" placeholder="Ingrese el código"></input>
                              <button class="btn--exchangeGiftCard">CANJEAR</button>
                            </div>
                           </article>`;

    document.querySelector(app).innerHTML = cardContent;

    $(".btn--buyGiftCard").click((e) => {
      e.preventDefault();
      let price = parseInt(document.querySelector("#input").value);
      let inputText = document.querySelector("#input");

      /* VERIFICO QUE EL PRECIO SEA MAYOR A LO ESTABLECIDO */
      if (price < 5000) {
        swal("Oops", "Ingrese un valor superior a $5000", "error");
        /* alert("Ingrese un valor superior a $5000"); */
        inputText.value = "";
      } else {
        const findID = JSON.parse(localStorage.getItem("itemsCart")) || [];

        /* ASIGNO UN ID A LA TARJETA COMPRADA */
        let cardId;
        cardId = Math.floor(Math.random() * (200 - 100) + 100);

        /* CORROBORO SI HAY OTRA TARJETA CON ESE ID */
        for (const i of findID) {
          if (i.id == cardId) {
            cardId = Math.floor(Math.random() * 10 + 1);
          }
        }

        /* CREO UN OBJETO TARJETA CON SUS RESPECTIVOS DATOS */
        const tarjeta = new GiftCard(
          cardId,
          `Gift Card ${price}`,
          "./images/products/p-cordones.png",
          price,
          1
        );

        cart.addToCart(tarjeta);
        cart.printCart();
        cart.totalCart();

        const code = new Codes(price, `code${price}/${cardId}`);
        codes.push(code);

        localStorage.setItem("codes", JSON.stringify(codes));
        inputText.value = "";
      }
    });

    $(".btn--exchangeGiftCard").click((e) => {
      e.preventDefault();
      const getDiscount = JSON.parse(localStorage.getItem("discountCode"));
      const getInput = document.querySelector("#code").value.toLowerCase();

      for (const code of getDiscount) {
        let discount = code.amount;
        localStorage.setItem("discount", JSON.stringify(discount));

        if (code.code == getInput) {
          /* BUSCO Y ELIMINO ESE CODIGO PARA QUE NO SE VUELVA A USAR */
          const updateCodes = getDiscount.filter(
            (item) => item.code != getInput
          );
          localStorage.setItem("discountCode", JSON.stringify(updateCodes));
        }
      }
      cart.totalCart();
    });
  }
}

export { GiftCard };
export { GiftCardModel };
export { GiftCardView };

const cardItem = document.createElement("article");
cardItem.className = "item";

const img = document.createElement("img");
img.className = "item__img";
img.src = product.img;

const description = document.createElement("h4");
description.className = "item__description";
description.textContent = product.productName;

/* AUMENTAR Y DISMINUIR CANTIDAD */
const amount = document.createElement("div");
amount.className = "item__amount";

const btnRest = document.createElement("button");
btnRest.className = "btnAmount";
btnRest.textContent = "-";
const input = document.createElement("input");
input.className = "itemAmount";
const btnSum = document.createElement("button");
btnSum.className = "btnAmount";
btnSum.textContent = "+";

/* amount.appendChild(btnRest, input, btnSum); */
amount.appendChild(btnRest);
amount.appendChild(input);
amount.appendChild(btnSum);

const price = document.createElement("p");
price.className = "item__price";
price.textContent = product.price;

const btnDelete = document.createElement("button");
btnDelete.className = "btn--deleteItem";
btnDelete.textContent = <i class="fa-solid fa-trash-can"></i>;

/* PINTAR LOS PRODUCTOS EN EL CARRITO */
let htmlContent = "";
const printCart = () => {
  cart.items.map((item) => {
    let itemCard = `<div class="item">
                     <img class="item__img" src=${item.productImg} alt=""/>
                     <h4 class="item__description">${item.productName}</h4>
                     <div class="item__amount">
                      <button class="btnAmount btn--rest">-</button>
                       <input id="amount" class="itemAmount" type="number" readonly/>
                      <button class="btnAmount btn--sum">+</button>
                     </div>
                     <button class="btn--deleteItem">
                       <i class="fa-solid fa-trash-can"></i>
                     </button>
                    </div>`;

    htmlContent += itemCard;
  });
  document.querySelector(".shoppingCart__items").innerHTML = htmlContent;
};
printCart();

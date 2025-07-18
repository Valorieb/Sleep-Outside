// import { getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const shoppingCart = new ShoppingCart();
shoppingCart.renderCartContents();

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   const cartTotal = getCartTotal(cartItems);
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
//   document.querySelector(".sum-cost").innerHTML = `Total: $${cartTotal}`;
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// function getCartTotal(array) {
//   let i = 0;
//   let cartTotal = 0;
//   if (array.length == 0) {
//     cartTotal = 0;
//   }
//   else {
//       while (i < array.length) {
//         cartTotal += array[i].FinalPrice;
//         i++;
//     }
//   }

//   return cartTotal;
// }

// renderCartContents();

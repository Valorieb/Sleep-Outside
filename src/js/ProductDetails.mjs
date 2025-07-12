import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
         const element = document.querySelector(".product-detail");
        element.innerHTML = productDetailsTemplate(this.product);
    }
}

function calcDiscount(finalPrice, suggestedPrice){
  const discount = ((suggestedPrice - finalPrice) / suggestedPrice) * 100;
  console.log("discount:", discount.toFixed(0));
  return discount.toFixed(0);
}


function productDetailsTemplate(product) {
    const discount = calcDiscount(product.FinalPrice, product.SuggestedRetailPrice);
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${product.Image}"
          alt="${product.Name}"
        />

        <p class="product-card__price">${product.FinalPrice}</p>

        ${discount > 0 ? `<p>Discounted at ${discount}% off!</p>` : ""}

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;
}
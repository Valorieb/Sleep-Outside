import { renderListWithTemplate, calcDiscount } from "./utils.mjs";

export default class ProductList {
  constructor(productCategory, dataSource, listElement) {
    this.productCategory = productCategory;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.productList = []; 
  }

  async init() {
    this.productList = await this.dataSource.getData();
    this.renderList(this.productList);
  }

  renderList(productList) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
    this.addRemoveListeners();
  }

  addRemoveListeners() {
    const buttons = this.listElement.querySelectorAll(".remove-btn");
    buttons.forEach(button => {
      button.addEventListener("click", (e) => {
        const li = e.target.closest(".product-card");
        const productId = li.dataset.id; 
        this.removeFromCart(productId);
      });
    });
  }

  removeFromCart(productId) {
    const id = String(productId);  
    this.productList = this.productList.filter(item => String(item.Id) !== id);
    this.renderList(this.productList); 
  }
}

function productCardTemplate(product) {
  const discount = calcDiscount(
    product.FinalPrice,
    product.SuggestedRetailPrice
  );

  return `<li class="product-card" data-id="${product.Id}">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Brand.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discount > 0 ? `<p>Discounted at ${discount}% off!</p>` : ""}
    </a>
    <button class="remove-btn">Remove from Cart</button>
  </li>`;
}

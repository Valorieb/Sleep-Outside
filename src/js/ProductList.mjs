import { renderListWithTemplate, calcDiscount } from "./utils.mjs";

export default class ProductList {
  constructor(productCategory, dataSource, listElement) {
    this.productCategory = productCategory;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }
  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
  }
}

function productCardTemplate(product) {
  const discount = calcDiscount(
    product.FinalPrice,
    product.SuggestedRetailPrice,
  );
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Brand.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discount > 0 ? `<p>Discounted at ${discount}% off!</p>` : ""}
    </a>
  </li>`;
}

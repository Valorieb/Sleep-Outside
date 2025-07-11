// The purpose of this script will be to generate a list of product cards in HTML from an array.

export default class ProductList{
    constructor(productCategory, dataSource, listElement){
        this.productCategory = productCategory;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init(){
      const list = await this.dataSource.getData();
      this.renderList(list);
    }
    renderList(productList){
        const htmlStrings = productList.map(productCardTemplate);
        const combinedHtml =  htmlStrings.join("");
        this.listElement.innerHTML = combinedHtml;
        

    }
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Brand.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}
// The purpose of this script will be to generate a list of product cards in HTML from an array.

export default class ProductList{
    constructor(productCategory, dataSource, listElement){
        this.productCategory = productCategory;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init(){
      const list = await this.dataSource.getData();
      // eslint-disable-next-line no-console
      console.log("Product list loaded:", list);
    }
}
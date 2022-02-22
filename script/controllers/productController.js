class ProductController {
  constructor(productModel, productView) {
    this.productModel = productModel;
    this.productView = productView;
  }

  list(app, cart) {
    this.productView.listProducts(app, this.productModel.products, cart);
  }
}

export { ProductController };

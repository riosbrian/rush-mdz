class ProductController {
  constructor(productModel, productView) {
    this.productModel = productModel;
    this.productView = productView;
  }

  gift(app) {
    this.productView.giftCard(app);
  }

  list(app, cart) {
    this.productView.listProducts(app, this.productModel.products, cart);
  }
}

export { ProductController };

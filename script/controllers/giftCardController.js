class GiftCardController {
  constructor(giftCardModel, giftCardView) {
    this.giftCardModel = giftCardModel;
    this.giftCardView = giftCardView;
  }

  list(app, cart) {
    this.giftCardView.listGiftCards(app, this.giftCardModel.tarjetas, cart);
  }
}

export { GiftCardController };

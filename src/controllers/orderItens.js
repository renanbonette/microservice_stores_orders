class OrderItensController {
  constructor(OrderItens, Sequelize) {
    this.OrderItens = OrderItens;
    this.Sequelize = Sequelize;
  }

  async saveOrderItens(OrderId, orderDetail, productIds) {
    const orderItensArray = orderDetail.order_itens.map((item) => {
      const OrderItem = {
        order_id: OrderId,
        product_id: null,
        full_price: item.full_price,
        discount_price: item.discount_price,
        quantity: item.quantity,
      };
      productIds.forEach((element) => {
        if (item.product_id === element.sku) {
          OrderItem.product_id = element.id;
        }
      });
      return OrderItem;
    }, []);
    return this.OrderItens.bulkCreate(orderItensArray)
      .then(res => res)
      .catch(err => err.name);
  }

  async getOrderItens(OrderId) {
    return this.Sequelize.query(`SELECT oi.full_price, oi.discount_price, quantity, p.name, p.sku, p.image_url FROM order_itens as oi LEFT JOIN products p ON p.id = oi.product_id WHERE oi.order_id = ${OrderId};`, { type: this.Sequelize.QueryTypes.SELECT })
      .then(res => res)
      .catch(err => err);
  }

}

export default OrderItensController;

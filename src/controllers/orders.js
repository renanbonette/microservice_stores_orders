import HttpStatus from 'http-status';
import { defaultResponse, errorResponse } from '../utils/response';
import ProductController from './products';
import OrderItensController from './orderItens';

class OrdersController {
  constructor(Orders, OrderItens, Products, Sequelize) {
    this.Orders = Orders;
    this.OrderItens = OrderItens;
    this.Products = Products;
    this.Sequelize = Sequelize;
  }

  async update(params, data) {
    return this.Orders.update(data, { where: params })
    .then((result) => {
      if (result[0] === 1) {
        return defaultResponse({}, HttpStatus.OK);
      }
      return defaultResponse({}, HttpStatus.NO_CONTENT);
    })
    .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  async create(body) {
    const productController = new ProductController(this.Products, this.Sequelize);
    await productController.saveProducts(body.order.order_itens);
    const productListId = await productController.getProductIdsBySku(body.order.order_itens);
    const order = await this.saveOrder(body);
    const orderItensController = new OrderItensController(this.OrderItens);
    return orderItensController.saveOrderItens(order.id, body.order, productListId)
      .then(() => defaultResponse(order))
      .catch(err => errorResponse(err.errors));
  }

  async saveOrder(body) {
    const Order = {
      order_code: body.order.order_code,
      order_value: body.order.order_value,
      order_items_quantity: body.order.order_items_quantity,
      order_secret_code: (Math.random(1000, 10000) * 10000),
      order_date: body.order.order_date,
      payment_type: body.order.payment_type,
      address_id: body.order.address_id,
      person_number: body.customer.person_number,
      person_name: body.customer.person_name,
      person_email: body.customer.person_email,
      person_phone: body.customer.person_phone,
      person_address: body.customer.person_address,
      store_id: body.store.store_id,
      order_text: JSON.stringify(body),
    };
    return this.Orders.create(Order)
      .then(res => res)
      .catch(err => err.errors);
  }

  async getByOrderCode(params, query) {
    let whereParam = '';
    if (query.orderCode) {
      whereParam = `o.order_code = '${params.id}'`;
    } else {
      whereParam = `o.id = ${params.id}`;
    }

    const sqlQuery = `SELECT o.id as order_id, o.address_id, o.payment_type, o.observation_type, o.observation, o.order_date, o.person_name, o.person_number, o.person_email, o.person_phone, o.person_address, o.order_code, o.order_secret_code, o.order_status_id, os.name as status_name, s.* FROM orders o INNER JOIN stores s ON s.id = o.store_id LEFT JOIN order_statuses os ON os.id = o.order_status_id WHERE ${whereParam};`;
    const order = await this.Sequelize.query(
      sqlQuery,
      { type: this.Sequelize.QueryTypes.SELECT })
      .then((res) => {
        if (res) {
          if (res.length > 0) {
            const OrderDetail = {
              id: res[0].order_id,
              order_code: res[0].order_code,
              order_secret_code: res[0].order_secret_code,
              order_status_id: res[0].order_status_id,
              order_status_name: res[0].status_name,
              observation_type: res[0].observation_type,
              observation: res[0].observation,
              order_date: res[0].order_date,
              address_id: res[0].address_id,
              payment_type: res[0].payment_type,
              person_name: res[0].person_name,
              person_number: res[0].person_number,
              person_email: res[0].person_email,
              person_phone: res[0].person_phone,
              person_address: res[0].person_address,
              store: {
                id: res[0].id,
                name: res[0].name,
                address: res[0].address,
                compl: res[0].compl,
                neighborhood: res[0].neighborhood,
                zip_code: res[0].zip_code,
                image_url: res[0].image_url,
                latitude: res[0].latitude,
                longitude: res[0].longitude,
              },
            };
            return OrderDetail;
          }
        }
        return res;
      })
      .catch(err => errorResponse(err.message));
    if (order.length === 0) {
      return defaultResponse(order, 404);
    } else if (query.itens) {
      const orderItensController = new OrderItensController(this.OrderItens, this.Sequelize);
      const orderItens = await orderItensController.getOrderItens(order.id);
      order.orde_itens = orderItens;
      return defaultResponse(order);
    }
    return defaultResponse(order);
  }
}

export default OrdersController;

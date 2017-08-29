import OrdersController from '../controllers/orders';

export default (app) => {
  const storesController = new OrdersController(
        app.datasource.models.orders,
        app.datasource.models.order_itens,
        app.datasource.models.products,
        app.datasource.sequelize);

  app.route('/orders')
        .post((req, res) => {
          storesController.create(req.body)
                .then((response) => {
                  res.status(response.statusCode);
                  res.json(response.data);
                });
        });

  app.route('/orders/:id')
        .get((req, res) => {
          storesController.getByOrderCode(req.params, req.query)
                .then((response) => {
                  res.status(response.statusCode);
                  res.json(response.data);
                });
        })
        .put((req, res) => {
          storesController.update(req.params, req.body)
                .then((response) => {
                  res.status(response.statusCode);
                  res.json(response.data);
                });
        });
};

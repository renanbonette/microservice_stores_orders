import StoresController from '../controllers/stores';

export default (app) => {
  const storesController = new StoresController(app.datasource.models.stores, app.datasource.models.orders);

  app.route('/stores')
    .get((req, res) => {
      storesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/stores/:store_id/orders')
    .get((req, res) => {
      storesController.getAllByStore(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};

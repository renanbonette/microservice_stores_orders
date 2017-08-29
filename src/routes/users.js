import UsersController from '../controllers/users';

export default (app) => {
  const usersController = new UsersController(app.datasource.models.users, app.datasource.sequelize);

  app.route('/users')
    //.all(app.auth.authenticate())
    .get((req, res) => {
      usersController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      usersController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/users/:id')
    .get((req, res) => {
      usersController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/users/:id/orders')
    .get((req, res) => {
      usersController.getAllOrders(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/users/:user_id/stores')
    .get((req, res) => {
      usersController.getAllStoresByUser(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};

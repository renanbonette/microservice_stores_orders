import CitiesController from '../controllers/cities';

export default (app) => {
  const citiesController = new CitiesController(
      app.datasource.sequelize,
      app.datasource.models.cities,
      app.datasource.models.stores);

  app.route('/cities')
    .get((req, res) => {
      citiesController.getAll(req.query)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};

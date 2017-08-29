import jwt from 'jwt-simple';

describe('Routes Stores', () => {
  const Stores = app.datasource.models.stores;
  const Users = app.datasource.models.users;
  const jwtSecret = app.config.jwtSecret;

  const defaultStore = {
    name: 'Loja 1',
    address: 'Av. RebouÃ§as, 3970 - SÃ£o Paulo/SP',
    zip_code: '08580-130',
    compl: 'Loja 333 -  2 piso',
    neighborhood: 'Loja 333 -  2 piso',
    image_url: 'htttp://lorenipsum.com/300/300',
    latitude: -23.4573688,
    longitude: -54.78645983269852,
    manager: 'Maria Christina do Carvalho',
    active: 1,
    city_id: 1,
  };

  let token;

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'John',
        email: 'john@mail.com',
        password: '123',
      }))
      .then((user) => {
        Stores
          .destroy({ where: {} })
          .then(() => Stores.create(defaultStore))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
          })
          .then(() => {
            done();
          });
      });
  });

  describe('Route GET /stores', () => {
    it('should return a list of stores', (done) => {
      const story = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        address: Joi.string(),
        zip_code: Joi.string(),
        compl: Joi.string(),
        neighborhood: Joi.string(),
        image_url: Joi.string(),
        latitude: Joi.number(),
        longitude: Joi.number(),
        manager: Joi.string(),
        city_id: Joi.string(),        
      });

      request
        .get('/stores/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, story);
          done(err);
        });
    });
  });
});

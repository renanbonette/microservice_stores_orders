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
    neighborhood: 'bairro',
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
              console.log("xxx");
            token = jwt.encode({ id: user.id }, jwtSecret);
            console.log("aaa");
          });
      });
  });

  describe('Route GET /stores', () => {
      console.log("abcdaaaa");
    it('should return a list of stores', (done) => {
        console.log("abc");
      request
        .get('/stores')
        //.set('Authorization', `JWT ${token}`)
        .end((err, res) => {
            console.log(res);
            console.log(err);
            done(err);
        //   expect(res.body[0].id).to.be.eql(defaultStore.id);
        //   expect(res.body[0].name).to.be.eql(defaultStore.name);
        //   expect(res.body[0].address).to.be.eql(defaultStore.address);
        //   expect(res.body[0].zip_code).to.be.eql(defaultStore.zip_code);
        //   done(err);
        });
    });
  });

//   describe('Route GET /classifications?cycle=2017-01', () => {
//     it('should return a list of categories by cycle', (done) => {
//       request
//         .get('/classifications?cycle=2017-01')
//         .set('Authorization', `JWT ${token}`)
//         .end((err, res) => {
//           expect(res.body[0].id).to.be.eql(defaultCategory.id);
//           expect(res.body[0].name).to.be.eql(defaultCategory.name);
//           expect(res.body[0].type).to.be.eql(defaultCategory.type);
//           expect(res.body[0]._link.href).to.be.eql(defaultCategory.link_href);
//           expect(res.body[0]._link.rel).to.be.eql(defaultCategory.link_rel);
//           done(err);
//         });
//     });
//   });

//   describe('Route GET /classifications/{classification_id}/prodcuts?cycle=2017-01}', () => {
//     it('should return a list of product ids ', (done) => {
//       request
//         .get('/classifications/1/products?cycle=2017-01')
//         .set('Authorization', `JWT ${token}`)
//         .end((err, res) => {
//           expect(res.body[0].product_id).to.be.eql(defaultCategoryProduct.product_id);
//           done(err);
//         });
//     });
//   });
});

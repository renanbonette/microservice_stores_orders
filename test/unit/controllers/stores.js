import StoresController from '../../../src/controllers/stores';

describe('Controllers: Stores', () => {
  describe('Route GET all stores: getAll()', () => {
    it('should return a list of stores', () => {
      const Stores = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test store',
        address: 'address',
        compl: 'Teste compl',
      }];

      td.when(Stores.findAll({})).thenResolve(expectedResponse);
      const storesController = new StoresController(Stores);
      return storesController.getAll({})
        .then(response => expect(response.data[0]).to.be.eql(expectedResponse[0]));
    });
  });
  /*
  describe('Route GET a store: getById()', () => {
    it('should return a store', () => {
      const Stores = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test categories',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        created_at: '2016-09-10T23:55:36.692Z',
        updated_at: '2016-09-10T23:55:36.692Z',
      }];

      td.when(Stores.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const categoriesController = new StoresController(Stores);
      return categoriesController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });
  describe('Create a store: create()', () => {
    it('should create a store', () => {
      const Stores = {
        create: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'test categories',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        link: 'http://gmail.com',
      };
      const expectedResponse = [{
        id: 1,
        name: 'test categories',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        created_at: '2016-09-10T23:55:36.692Z',
        updated_at: '2016-09-10T23:55:36.692Z',
      }];

      td.when(Stores.create(requestBody)).thenResolve(expectedResponse);

      const categoriesController = new StoresController(Stores);
      return categoriesController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a store: update()', () => {
    it('should update a store', () => {
      const Stores = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'test categories updated',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
      };
      const expectedResponse = [{
        id: 1,
        name: 'test categories updated',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
      }];

      td.when(Stores.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const categoriesController = new StoresController(Stores);
      return categoriesController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a store: delete()', () => {
    it('should delete a store', () => {
      const Stores = {
        destroy: td.function(),
      };

      td.when(Stores.destroy({ where: { id: 1 } })).thenResolve({});

      const categoriesController = new StoresController(Stores);
      return categoriesController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
  */
});

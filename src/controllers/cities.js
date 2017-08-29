import Promise from 'bluebird';
import { defaultResponse, errorResponse } from '../utils/response';

class CitiesController {
  constructor(Sequelize, Cities, Stores) {
    this.Sequelize = Sequelize;
    this.Cities = Cities;
    this.Stores = Stores;
  }

  getAll(query) {
    const cities = this.Cities.findAll({});
    let stores;
    if (JSON.stringify(query) === '{}') {
      stores = this.Stores.findAll({});
    } else {
      const sql = `select stores.*, ST_Distance(geom, ST_MakePoint(${query.long}, ${query.lat})::geography) as distance from stores where stores.active=true;`;
      stores = this.Sequelize.query(sql, { type: this.Sequelize.QueryTypes.SELECT });
    }
    return Promise.join(cities, stores, (Cities, Stores) => {
      const result = [];
      Cities.forEach((city) => {
        const NewCity = {
          id: city.id,
          name: city.name,
          state_name: city.state_name,
          state_slug: city.state_slug,
          stores: [],
        };
        Stores.forEach((store) => {
          if (city.id === store.city_id) {
            const NewStore = {
              id: store.id,
              name: store.name,
              address_id: store.address_id,
              address: store.address,
              zip_code: store.zip_code,
              compl: store.compl,
              number: store.number,
              neighborhood: store.neighborhood,
              phoneNumber: store.phone,
              image_url: store.image_url,
              latitude: store.latitude,
              longitude: store.longitude,
              manager: store.manager,
              distance: store.distance || null,
            };
            NewCity.stores.push(NewStore);
          }
        }, this);
        result.push(NewCity);
      }, this);
      return defaultResponse({ cities:  result  });
    })
    .catch(err => errorResponse(err));
  }

}

export default CitiesController;

import HttpStatus from 'http-status';
import { defaultResponse, errorResponse } from '../utils/response';

class UsersController {
  constructor(Users, Sequelize) {
    this.Users = Users;
    this.Sequelize = Sequelize;
  }

  getAll() {
    return this.Users.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getAllOrders() {
    return this.Users.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Users.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Users.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Users.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Users.destroy({ where: params })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  getAllStoresByUser(params) {
    const sql = `select s.id, s.name, s.address, s.compl, s.neighborhood, s.zip_code, s.image_url, s.latitude, s.longitude, s.manager, s.active, s.city_id, s.geom, c.name as city_name, c.state_name, c.state_slug FROM stores s LEFT JOIN user_stores us ON us.store_id = s.id LEFT JOIN cities c ON c.id = s.city_id WHERE us.user_id = ${params.user_id};`;
    return this.Sequelize.query(sql, { type: this.Sequelize.QueryTypes.SELECT })
        .then(res => defaultResponse({ stores: res }))
        .catch(err => errorResponse(err));
  }

}

export default UsersController;

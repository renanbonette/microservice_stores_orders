import { defaultResponse, errorResponse } from '../utils/response';

class StoresController {
  constructor(Stores, Orders) {
    this.Stores = Stores;
    this.Orders = Orders;
  }

  getAll() {
    return this.Stores.findAll({ where: { active: true } })
      .then(result => defaultResponse({ stores: result }))
      .catch(error => errorResponse(error));
  }

  getAllByStore(params) {
    return this.Orders.findAll({ where: { store_id: params.store_id }, order: '"createdAt" DESC' })
      .then(result => defaultResponse({ orders: result }))
      .catch(error => errorResponse(error));
  }

}

export default StoresController;

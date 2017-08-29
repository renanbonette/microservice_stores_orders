class ProductsController {
  constructor(Products, Sequelize) {
    this.Products = Products;
    this.Sequelize = Sequelize;
  }

  async saveProducts(products) {
    let Sqlproducts = '';
    products.map((elem, index) => {
      let delimiter = '';
      if (products.length === index + 1) {
        delimiter = '';
      } else {
        delimiter = ',';
      }
      Sqlproducts += `(DEFAULT ,${elem.product_id}, '${elem.product_name}', '${elem.product_url}')${delimiter}`;
      return Sqlproducts;
    });
    const sql = `INSERT INTO "products" ("id","sku","name","image_url") VALUES ${Sqlproducts} ON CONFLICT DO NOTHING`;
    return this.Sequelize.query(sql, { type: this.Sequelize.QueryTypes.INSERT})
        .then(() => {})
        .catch(err => err);
  }

  async getProductIdsBySku(skuList) {
    const productSkus = skuList.map(elem => elem.product_id);
    return this.Products.findAll({
      attributes: ['id', 'sku'],
      where: {
        sku: { $in: productSkus },
      },
    })
    .then(res => res)
    .catch(err => err);
  }

}

export default ProductsController;

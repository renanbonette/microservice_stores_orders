export default (sequelize, DataType) => {
  const OrderItens = sequelize.define('order_itens', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    product_id: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'products',
        key: 'id',
      },
    },
    full_price: {
      type: DataType.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    discount_price: {
      type: DataType.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quantity: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    },
    updatedAt: {
      type: DataType.DATE,
    },
  }, {
    classMethods: {
      associate(models) {
        OrderItens.hasOne(models.Orders, {
          foreignKey: 'order_id',
        });
        OrderItens.hasOne(models.Orders, {
          foreignKey: 'product_id',
        });
      },
    },
  });
  return OrderItens;
};

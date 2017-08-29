export default (sequelize, DataType) => {
  const Products = sequelize.define('products', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sku: {
      type: DataType.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image_url: {
      type: DataType.STRING,
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
  });
  return Products;
};

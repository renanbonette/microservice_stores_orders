export default (sequelize, DataType) => {
  const Stores = sequelize.define('stores', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address_id: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    compl: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    neighborhood: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    zip_code: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    number: {
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
    latitude: {
      type: DataType.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    longitude: {
      type: DataType.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    manager: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    active: {
      type: DataType.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city_id: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'cities',
        key: 'id',
      },
    },
    geom: {
      type: DataType.GEOMETRY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataType.DATE,
    },
    updatedAt: {
      type: DataType.DATE,
    },
  }, {
    hooks: {
      beforeCreate: (store) => {
      },
    },
    classMethods: {
      associate(models) {
        Stores.haOne(models.Cities, {
          foreignKey: 'city_id',
        });
      },
    },
  });
  return Stores;
};

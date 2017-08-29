export default (sequelize, DataType) => {
  const UserStores = sequelize.define('user_stores', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'users',
        key: 'id',
      },
    },
    store_id: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'stores',
        key: 'id',
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
        UserStores.hasMany(models.Users, {
          foreignKey: 'user_id',
        });
        UserStores.hasMany(models.Stores, {
          foreignKey: 'store_id',
        });
      },
    },
  });
  return UserStores;
};

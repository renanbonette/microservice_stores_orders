export default (sequelize, DataType) => {
  const Cities = sequelize.define('cities', {
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
    state_name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state_slug: {
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
  },
    {
      classMethods: {
        associate(models) {
          Cities.hasMany(models.Stores);
        },
      },
    });
  return Cities;
};

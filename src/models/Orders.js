import EmailComponent from '../components/email';

export default (sequelize, DataType) => {
  const Orders = sequelize.define('orders', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_code: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    order_value: {
      type: DataType.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    order_items_quantity: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    order_secret_code: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    order_date: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    payment_type: {
      type: DataType.STRING,
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
    person_number: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    person_name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    person_email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    person_phone: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    person_address: {
      type: DataType.TEXT,
      length: 'medium',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    observation_type: {
      type: DataType.STRING,
    },
    observation: {
      type: DataType.TEXT,
      length: 'medium',
    },
    delivery_client_password: {
      type: DataType.STRING,
    },
    delivery_client_name: {
      type: DataType.STRING,
    },
    delivery_client_document: {
      type: DataType.STRING,
    },
    delivery_person_store: {
      type: DataType.STRING,
    },
    delivery_person_store_delivered: {
      type: DataType.STRING,
    },
    order_received_date: {
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    },
    order_delivered_date: {
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    },
    store_product_use: {
      type: DataType.BOOLEAN,
    },
    order_text: {
      type: DataType.TEXT,
      length: 'large',
    },
    order_status_id: {
      type: DataType.INTEGER,
      references: {
        model: 'order_statuses',
        key: 'id',
      },
    },
    store_id: {
      type: DataType.INTEGER,
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
    hooks: {
      afterBulkUpdate: (order) => {
        if (order.attributes.order_status_id === 2) {
          Orders.find({
            where: order.where,
          })
          .then((res) => {
            const emailComponent = new EmailComponent();
            const mail = emailComponent.setOrderContent(res.order_text, res.order_code, res.order_secret_code, res.person_name, res.person_email, res.payment_type, emailComponent.orderDeliveredTemplateId, 'Pedido Entregue na Loja');
            return new Promise((resolve, reject) => {
              resolve(emailComponent.sendEmail(mail));
            });
          })
          .catch((err) => {});
        }
      },
      beforeCreate: (order) => {
        order.set('order_status_id', 1);
      },
      afterCreate: (order) => {
        const emailComponent = new EmailComponent();
        const mail = emailComponent.setOrderContent(order.order_text, order.order_code, order.order_secret_code, order.person_name, order.person_email, order.payment_type, emailComponent.orderCreateTemplateId, 'Registramos seu pedido');
        return new Promise((resolve, reject) => {
          resolve(emailComponent.sendEmail(mail));
        });
      },
    },
    classMethods: {
      associate(models) {
        Orders.hasOne(models.Stores, {
          through: 'stores',
          foreignKey: 'store_id',
        });
        Orders.hasOne(models.OrderStatus, {
          through: 'order_statuses',
          foreignKey: 'order_status_id',
        });
      },
    },
  });
  return Orders;
};

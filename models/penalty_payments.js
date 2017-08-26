export default (sequelize, DataType) => {
  let penalty_payments = sequelize.define('penalty_payments', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    penalty_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataType.FLOAT,
      allowNull: false
    },
    date_paid: {
      type: DataType.DATE,
      allowNull: false
    },
    created_at: {
      type: DataType.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataType.DATE,
      allowNull: false
    }
  }, {
    charset: 'latin1',
    timestamps: false,
    tableName: 'penalty_payments'
  });

  penalty_payments.associate = (models) => {
    penalty_payments.belongsTo(models.penalties, {
      foreignKey: 'penalty_id',
      localKey: 'id'
    });
  }

  return penalty_payments;
}
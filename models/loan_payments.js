export default (sequelize, DataTypes) => {
  let loan_payments = sequelize.define('loan_payments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true
    },
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    period_paid: {
      type: DataTypes.DATE,
      allowNull: false
    },
    payment_coverage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quarter: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    date_paid: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    charset: 'latin1',
    timestamps: false,
    tableName: 'loan_payments'
  });

  loan_payments.associate = (models) => {
    loan_payments.belongsTo(models.loans, {
      foreignKey: 'loan_id',
      localKey: 'id'
    });
  }

  return loan_payments;
}
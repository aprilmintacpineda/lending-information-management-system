export default (sequelize, DataTypes) => {
  let loans = sequelize.define('loans', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true
    },
    borrower_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loan_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    interest: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    interest_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    interest_rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    months_to_pay: {
      type: DataTypes.INTEGER
    },
    payment_method: {
      type: DataTypes.INTEGER
    },
    expected_date_of_payment: {
      type: DataTypes.DATE
    },
    per_month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    per_semi_month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    per_day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    condition_applied: {
      type: DataTypes.STRING(50),
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
    timestamps: false
  });

  loans.associate = (models) => {
    loans.hasMany(models.loan_payments, {
      foreignKey: 'loan_id',
      localKey: 'id'
    });

    loans.hasMany(models.penalties, {
      foreignKey: 'loan_id',
      localKey: 'id'
    });

    loans.belongsTo(models.borrowers, {
      foreignKey: 'borrower_id',
      localKey: 'id'
    });
  }

  return loans;
}
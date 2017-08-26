export default (sequelize, DataTypes) => {
  let penalties = sequelize.define('penalties', {
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
      type: DataTypes.FLOAT,
      allowNull: false
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    was_waved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date_waved: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    date_given: {
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
    tableName: 'penalties'
  });

  penalties.associate = (models) => {
    penalties.hasMany(models.penalty_payments, {
      foreignKey: 'penalty_id',
      localKey: 'id'
    });

    penalties.belongsTo(models.loans, {
      foreignKey: 'loan_id',
      localKey: 'id'
    });
  }
  
  return penalties;
}
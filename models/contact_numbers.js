export default (sequelize, DataTypes) => {
  let contact_numbers = sequelize.define('contact_numbers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true
    },
    borrower_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING('20'),
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

  contact_numbers.associate = (models) => {
    contact_numbers.belongsTo(models.borrowers, {
      foreignKey: 'borrower_id',
      localKey: 'id'
    });
  }

  return contact_numbers;
}
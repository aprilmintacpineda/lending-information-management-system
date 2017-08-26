export default (sequelize, DataTypes) => {
  let borrowers = sequelize.define('borrowers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    middlename: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gender: {
      type: DataTypes.BOOLEAN,
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

  borrowers.associate = (models) => {
    // one to many association to contact numbers
    borrowers.hasMany(models.contact_numbers, {
      foreignKey: 'borrower_id',
      localKey: 'id'
    });

    // one to many association to loans
    borrowers.hasMany(models.loans, {
      foreignKey: 'borrower_id',
      localKey: 'id'
    });
  }

  return borrowers;
}
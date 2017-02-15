module.exports = (sequelize, DataTypes) => sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: DataTypes.STRING
}, {
  freezeTableName: true,
  classMethods: {
    associate(models) {
      this.belongsTo(models.Cv);
    }
  }
});

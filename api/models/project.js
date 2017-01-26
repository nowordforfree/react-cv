module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: DataTypes.STRING
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Cv);
      }
    }
  });
}
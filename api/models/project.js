module.exports = (sequelize, DataTypes) => {
  let Project = sequelize.define('Project', {
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
        Project.belongsTo(models.Cv);
      }
    }
  });
  return Project;
}
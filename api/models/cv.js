module.exports = (sequelize, DataTypes) => {
  let Cv = sequelize.define('Cv', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: DataTypes.STRING,
    communication: DataTypes.STRING,
    education: DataTypes.STRING,
    tools: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Cv.hasMany(models.Project, { as: 'projects' });
        Cv.hasMany(models.Experience, { as: 'experiences' });
      }
    }
  });
  return Cv;
}
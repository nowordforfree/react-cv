module.exports = (sequelize, DataTypes) => sequelize.define('Cv', {
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
    associate(models) {
      this.hasMany(models.Project, { as: 'projects' });
      this.hasMany(models.Experience, { as: 'experiences' });
    }
  }
});

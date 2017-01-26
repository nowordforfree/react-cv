function validateYear(value) {
  let currentYear = new Date().getFullYear();
  // dy: dy[0] - decade; dy[1] - year;
  let dy = currentYear.toString().replace(/^\d{2}/, '');
  let tillPastDecade = dy[0] > 0 ? `20[0-${dy[0]}][0-9]` : '';
  let tillCurrentYear = `20${dy[0]}[0-${dy[1]}]`;
  let yearRegex = new RegExp(
    `^(19[5-9]\\d|${tillPastDecade}|${tillCurrentYear})$`
  );
  return yearRegex.test(value);
}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Experience', {
    since: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isValidYear: (value, next) => {
          if (!validateYear(value)) {
            throw new Error('Year must be in range 1950 - current year');
          }
          next();
        }
      }
    },
    till: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isValidYear: (value, next) => {
          if (!validateYear(value)) {
            throw new Error('Year must be in range 1950 - current year');
          }
          next();
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Cv);
      }
    }
  });
}
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [1, 50]
      }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Email must be a valid email address' },
        notEmpty: { msg: 'Email field is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: (user) => {
        if (!user.password) {
          throw new Error('Password field is required');
        }
        if (user.password.length < 6) {
          throw new Error('Password should contain at least 6 characters')
        }
        return new Promise((resolve, reject) => {
          bcrypt
            .hash(user.password, 8)
            .then((hash) => {
              user.password = hash;
              resolve(user);
            })
            .catch((err) => {
              reject(err);
            })
        });
      }
    },
    instanceMethods: {
      comparePassword: function (val) {
        return bcrypt.compareSync(val, this.password);
      },
      toJSON: function () {
        let values = Object.assign({}, this.get());
        delete values.password;
        return values;
      }
    }
  });
}
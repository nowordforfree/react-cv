const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secret = 'aSecretKey';

module.exports = (sequelize, DataTypes) => sequelize.define('User', {
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
        throw new Error('Password should contain at least 6 characters');
      }
      return new Promise((resolve, reject) => {
        const cipher = crypto.createCipher(algorithm, secret);
        try {
          let encrypted = cipher.update(user.password, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          // eslint-disable-next-line no-param-reassign
          user.password = encrypted;
          resolve(user);
        } catch (e) {
          reject(e);
        }
      });
    }
  },
  instanceMethods: {
    comparePassword(val) {
      const decipher = crypto.createDecipher(algorithm, secret);
      try {
        let decrypted = decipher.update(this.password, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return val === decrypted;
      } catch (e) {
        return false;
      }
    },
    toJSON() {
      const values = Object.assign({}, this.get());
      delete values.password;
      return values;
    }
  }
});

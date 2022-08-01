'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A name is required'
        },
        notEmpty: {
          msg: 'Please provide a name'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A name is required'
        },
        notEmpty: {
          msg: 'Please provide a name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "The email you entered already exists"
      },
      validate: {
        notNull: {
            msg:"An email is required"
        },
        isEmail: {
            msg:"Please provide an email address please"
        }
      }

    },
    password: {
        type: DataTypes.STRING,  
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A password is required'
          },
          notEmpty: {
            msg: 'Please provide a password'
          }
        }
  }}, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, { //1-to many association 
        as: 'user',
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
      },
    });
  };


  return User;
};

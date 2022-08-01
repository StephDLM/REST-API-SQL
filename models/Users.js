'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    firstName: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  }, { sequelize });

//   Users.associate = (models) => {
//     Users.hasMany(models.courses, {
//       as: 'director',
//       foreignKey: {
//         fieldName: 'directorPersonId',
//         allowNull: false,
//       },
//     });
//   };

  return User;
};

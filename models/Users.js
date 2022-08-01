// 'use strict';
// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   class User extends Model {}
//   User.init({
//     firstName: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: 'A name is required'
//         },
//         notEmpty: {
//           msg: 'Please provide a name'
//         }
//       }
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: 'A name is required'
//         },
//         notEmpty: {
//           msg: 'Please provide a name'
//         }
//       }
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: {
//         msg: "The email you entered already exists"
//       },
//       validate: {
//         notNull: {
//             msg:"An email is required"
//         },
//         isEmail: {
//             msg:"Please provide an email address please"
//         }
//       }

//     },
//     password: {
//         type: DataTypes.STRING,  
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: 'A password is required'
//           },
//           notEmpty: {
//             msg: 'Please provide a password'
//           }
//         }
//   }}, { sequelize });

// //   Users.associate = (models) => {
// //     Users.hasMany(models.courses, {
// //       as: 'director',
// //       foreignKey: {
// //         fieldName: 'directorPersonId',
// //         allowNull: false,
// //       },
// //     });
// //   };

//   return User;
// };

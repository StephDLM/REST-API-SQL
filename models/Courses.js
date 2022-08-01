// const { Model, DataTypes } = require('sequelize');


// module.exports = (sequelize) => {
//     class Course extends Model {}
//     Users.init({
//       title: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       estimatedTime: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       materialsNeeded: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//     }, { sequelize });
  
//     Course.associate = (models) => {
//       Course.belongsto(models.Users, {
//         as: 'Users',
//         foreignKey: {
//           fieldName: 'directorPersonId',
//           allowNull: false,
//         },
//       });
//     };
  
//     return Course;
//   };
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    class Course extends Model {}
    Users.init({
      title: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      estimatedTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      materialsNeeded: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    }, { sequelize });
  
    Course.associate = (models) => {
      Course.belongsTo(models.Users, { //1-1 association
        as: 'Users',
        foreignKey: {
          fieldName: 'PersonId',
          allowNull: false,
        },
      });
    };
  
    return Course;
  };
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'A title is required'
            },
            notEmpty: {
              msg: 'title provide a password'
            }
          }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'A title is required'
            },
            notEmpty: {
              msg: 'title provide a password'
            }
          }
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
      Course.belongsTo(models.User, { //1-1 association
        as: 'user',
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
    };
  
    return Course;
  };
  //ref: https://teamtreehouse.com/library/data-relationships-with-sql-and-sequelize-2/data-relationships-in-sequelize/define-a-onetomany-relationship-using-sequelize-associations

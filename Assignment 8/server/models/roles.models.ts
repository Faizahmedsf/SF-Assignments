'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class roles extends Model {
   
    static associate(models:any) {
      roles.hasOne(models.Users);
    }
  }
  roles.init(
    {
      id: {
       type: DataTypes.INTEGER,
       allowNull:false,
       primaryKey: true
      },
      
      role_name: {
       type: DataTypes.STRING,
       allowNull:false,
      },
      
      role_description: {
       type: DataTypes.STRING,
       allowNull:false,
      }
    },
   {
    sequelize,
    modelName: 'uRole',
  });
  return roles;
};
'use strict';
import { Model } from 'sequelize';
import { customerInterface } from '../Interface/customer.interface';
module.exports = (sequelize:any, DataTypes:any) => {
  class Customer extends Model implements customerInterface {
   
    static associate(models:any) {
      Customer.hasOne(models.Users);
    }
    
    id!: number
    name!: string
    website!: string
    address!: string
    role!: string
  }

  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },

      name: {
       type: DataTypes.STRING,
       allowNull:false
      },
      
      website: {
       type: DataTypes.STRING,
       allowNull:false
      },
      
      address: {
       type: DataTypes.STRING,
       allowNull:false
      },

      role: {
        type: DataTypes.STRING,
        allowNull:false
      },

      

    }, 
  {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;

};

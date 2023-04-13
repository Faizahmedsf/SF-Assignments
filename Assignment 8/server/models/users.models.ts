'use strict';

import { userInterface } from "../Interface/user.interface";
import { uuid } from 'uuidv4';

const {
  Model
} = require('sequelize');
module.exports = (sequelize:any, DataTypes:any) => {
  class Users extends Model implements userInterface {

    static associate(models:any) {
      Users.belongsTo(models.Customer)
      Users.belongsTo(models.uRole)
    }

    user_id!: number
    first_name!:string
    dob!:string
    middle_name!:string
    last_name!:string
    email!:string
    phone_number!: number
    role!: string
    address!: string
  }
  
  Users.init(
    {

      user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncremet: true
      },

      first_name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      
      dob:{
        type: DataTypes.STRING,
        allowNull: false
      },
      
      middle_name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      
      last_name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      
      email:{
        type: DataTypes.STRING,
        allowNull: false
      },
      
      phone_number:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
      role:{
        type: DataTypes.STRING,
        allowNull: false
      },
      
      address:{
        type: DataTypes.STRING,
        allowNull: false
      }


    },
  
  {
    sequelize,
    modelName: 'Users',
  });

  return Users;
};
 
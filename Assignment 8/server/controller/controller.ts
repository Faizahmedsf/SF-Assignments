import  { Request, Response} from "express";
import db from "../models";
import { userInterface } from "../Interface/user.interface";
var http = require("http");
var fs = require("fs");

let result: Array<userInterface> = [];

const getdata = async (req: Request, res: Response) => {
  db.Users.findAll({
    include: [
      {
        model: db.Customer
      },
      {
        model: db.uRole,
      },
    ],
  })
    .then((response: userInterface[] | any) => {
      // res.send(response);

      for (let i = 0; i < response.length; i++) {
        let resObj = {
          user_id: response[i].user_id,
          first_name: response[i].first_name,
          dob: response[i].dob,
          middle_name: response[i].middle_name,
          last_name: response[i].last_name,
          email: response[i].email,
          phone_number: response[i].phone_number,
          role: response[i].role,
          address: response[i].address,
          createdAt: response[i].createdAt,
          updatedAt: response[i].updatedAt,
          customerName: response[i].Customer.name,
          customerRole: response[i].uRole.role_name,
        };

        result.push(resObj);
      }
      res.send(result)
    })
    .catch((error: Error) => res.send({message: error}));
};

const postdata = async (req: Request, res: Response) => {
  let {
    user_id,
    first_name,
    dob,
    middle_name,
    last_name,
    email,
    phone_number,
    role,
    address,
    CustomerId,
    uRoleId
  } = req.body;

  db.Users.create({
    user_id,
    first_name,
    dob,
    middle_name,
    last_name,
    email,
    phone_number,
    role,
    address,
    CustomerId,
    uRoleId
  })
    .then(() => {
      res.send({message: "User added Successfully"});
    })
    .catch((error: Error) => {
      res.send(error);
    });
};

const patchdata = async (req: Request, res: Response) => {
  let user_id = req.param("id")

  let {
    first_name,
    dob,
    middle_name,
    last_name,
    email,
    phone_number,
    role,
    address,
  } = req.body;

  await db.Users.update({
    first_name,
    dob,
    middle_name,
    last_name,
    email,
    phone_number,
    role,
    address,
  } , 
    {where: {user_id} }
   ).then(() => {
      res.send({message: `user with id: ${user_id} updated`})
   }).catch((error:Error) => {
    res.send({message: error.message})
   })
};

const deletedata = async (req: Request, res: Response) => {
  let id = req.param("id");
  db.Users.destroy({
    where: {
      user_id: id,
    },
  })
    .then((isrowDeleted: any) => {
      isrowDeleted
        ? res.send({ message: `User with id: ${id} got  deleted` })
        : res.send({
            message: `User with id: ${id} does not exists in Database`,
          });
    })
    .catch((error: any) => {
      res.send(error);
    });
};

const getsingleuser = async (req: Request, res: Response) => {
  let id = req.param("id")

  let singleUser = db.Users.findOne({
    where: {
      user_id: id
    }
  })

  singleUser.then((response: userInterface) => res.send({message: response}))
  .catch((error: Error) => res.send(error))

};

export default { getdata, postdata, patchdata, deletedata, getsingleuser };

import e, { Request, Response } from "express";
import { QueryResult } from "pg";
var http = require("http");
var fs = require("fs");
import { client } from "../Database/dbconfig";
import { name, User } from "../interface/interface";
console.log(name);

const getdata = async (req: Request, res: Response) => {
  /* in  in this we have a primary key in users table and a foreign key in customer table and we are 
          calling a right join query and for created_on we have used a timestamp type and for default value i am  using current_timestamp and for 
        modified created a trigger which get executed before an update on every row 
        */
  client.query(
    "select users.*, customer.customer_name , customer.customer_role  from customer RIGHT JOIN users on customer.user_id = users.user_id order by users.user_id ASC",
    (err: Error, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.rows);
      }
    }
  )
};

const postdata = async (req: Request, res: Response) => {
  const data = [
    req.body.user_id,
    req.body.first_name,
    req.body.DOB,
    req.body.middle_name,
    req.body.last_name,
    req.body.email,
    req.body.phone_number,
    req.body.role,
    req.body.address,
  ];
  const temp = `insert into users (user_id , first_name , dob, middle_name, last_name, email, phone_number, role, address) Values($1 , $2, $3, $4, $5, $6, $7, $8, $9) `;

  client.query(temp, data);

  if (temp) {
    res.send("Data Added Successfully");
  } else {
    res.send("Failed");
  }
};

const patchdata = async (req: Request, res: Response) => {
  let uID: any = req.param("id");

  const data = [
    req.body.first_name,
    req.body.DOB,
    req.body.middle_name,
    req.body.last_name,
    req.body.email,
    req.body.phone_number,
    req.body.role,
    req.body.address,
    req.param("id"),
  ];

  const temp: any =
    "UPDATE users SET first_name =$1 , dob = $2 , middle_name = $3 , last_name = $4 , email = $5, phone_number = $6,  role = $7 ,  address = $8  where id = $9  RETURNING * ";

  client.query(temp, data);

  if (temp) {
    res.send("Update Successfully");
  } else {
    res.send("Update failed");
  }
};

const deletedata = async (req: Request, res: Response) => {
  const id: string = req.param("id");
  res.send(id);

  const temp = "DELETE from users where id = $1";
  await client.query(temp, [id]);
};

// get single user
// we are passing an id in header and using that id to get the single user
const getsingleuser = async (req: Request, res: Response) => {
  let uID: string = req.param("id");
  const t = await client.query("select * from users where id = $1", [uID]);
  res.send(t.rows);
};

export default { getdata, postdata, patchdata, deletedata, getsingleuser };

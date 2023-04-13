import { Request, Response } from "express";
import { conn } from "../DataBase/dbConfig";
import { user } from "../Interfaces/interface";

const getUser = (req: Request, res: Response) => {
  // a simple Query to get all the data from table users
  conn.query("select * from users order by id", (error, result) => {
    error
      ? res.status(401).send({ message: error })
      : res.status(200).send(result.rows);
  });
};

const postUser = async (req: Request, res: Response) => {
  // destructuring data from req body
  const { firstName, middleName, lastName, email, phone, role, address } =  req.body;
  // storing de structured data into a varibale to pass it down to the query
  const data: user[] = [ firstName, middleName, lastName, email, phone, role, address,];

  const success = `insert into users (firstName , middleName, lastName, email, phone, role, address) VALUES($1, $2, $3, $4, $5, $6, $7) `;

  conn.query(success, data);

  success
    ? res.send("Data Added Successfully")
    : res.send("There has been a error");
};

const updateUser = (req: Request, res: Response) => {
  const id: string = req.param("id");

  // destructuring data from req body
  const { firstName, middleName, lastName, email, phone, role, address } = req.body;

  // storing de structured data into a varibale to pass it down to the query
  const data: user[] = [ firstName, middleName, lastName, email, phone, role, address, id,];

  const success =
    "UPDATE users SET firstName = $1, middleName = $2, lastName=$3, email = $4, phone = $5, role = $6, address = $7 where id = $8 returning *";

  conn.query(success, data);
  success
    ? res.send("User has been Updated")
    : res.send("There has been a error");
};

const deleteUser = (req: Request, res: Response) => {
  const id = req.param("id");
  const success = "Delete from users where id = $1";
  conn.query(success, [id]);
  success
    ? res.send({ message: "User has been Deleted" })
    : res.send({ message: "There has been a error" });
};

const singleUser = async (req: Request, res: Response) => {
  const id: string = req.param("id");

  const success = "select * from users where id = $1";
  console.log("Succ" , success);
  

  conn.query(success, [id], (error, result) => {
    result
      ? res.status(200).send(JSON.stringify(result.rows[0]))
      : res.status(421).send({ message: error });
  });
};

export default { getUser, postUser, updateUser, deleteUser, singleUser };

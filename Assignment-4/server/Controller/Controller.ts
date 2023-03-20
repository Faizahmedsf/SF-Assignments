import axios from 'axios';
import e, { Request, response, Response } from 'express';
import { user } from '../Interface/Interface';
var http = require('http');
var fs = require('fs');

const readFiledata = async () => {
     return await fs.promises.readFile('./data.json', 'utf8')
     .then((response: user[]) => {return response})
     .catch((error:Error) => {return error})
}
// console.log(readFiledata())

// global function for writing in json file
const writeFiledata = (data: user[]) => {
    return fs.promises.writeFile('./data.json', JSON.stringify(data))
    .then((response: Response) => {return "Data Added to File data.json"})
     .catch((error:Error) => {return error})    
}

const getdata = async (req: Request, res: Response) => {
    let userData: user = await readFiledata()
    res.send(userData) 
}

const postdata = async (req: Request, res: Response) => {
    const data = [
    {    id: req.body.id,
        first_name: req.body.first_name,
        DOB: req.body.DOB,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role: req.body.role,
        address: req.body.address
    }
    ];
    let userResponse: user = await writeFiledata(data)
    res.send(userResponse);
}

// in patch firstly we are taking an id a params, and creating a var userData in which we are storing content of
// data.json file and we are comparing and req.param.id with the user id and updating the content
const patchdata = async (req: Request, res: Response) => {
    const id = req.param('id');
    let usersData = await readFiledata()
    // res.send(usersData)
    
    for (let i = 0; i < usersData.length; i++) {
        const singleUser = usersData[i];        
        if (id == singleUser.id) {
            const updateUserData: user[] =[ 
                singleUser.id = req.body.id,
                singleUser.first_name = req.body.first_name,
                singleUser.DOB = req.body.DOB,
                singleUser.middle_name = req.body.middle_name,
                singleUser.last_name = req.body.last_name,
                singleUser.email = req.body.email,
                singleUser.phone_number = req.body.phone_number,
                singleUser.role = req.body.role,
                singleUser.address = req.body.address
            
]
            const userResponse: user = await writeFiledata(updateUserData)
            res.send(userResponse);

        }
    }

}

const deletedata = async (req: Request, res: Response) => {

    // first we are reading the data and then after getting all the data in a variable we are using delete and
    // the value which we are passing in key is removing the data & in postman its showing null on that index

    const id = req.param('id');
    let userData: any = await readFiledata()
    // res.send(userData[2])
    var key: string = id
    delete userData[key]
    res.send(userData)

}

// get single user 
// we are passing an id in header and using that id to get the single user
const getsingleuser = async (req: Request, res: Response) => {
    let uID: string = req.param('id')
    // console.log(req.param('id'));
    let userData: any = await readFiledata()
    res.send(userData[uID])
}

export default { getdata, postdata, patchdata, deletedata, getsingleuser }
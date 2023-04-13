import express from "express"
import db from "./models"
import { users } from "./seeders/users"
import { userInterface } from "./Interface/user.interface"
import { customer } from "./seeders/customer"
import { customerInterface } from "./Interface/customer.interface"
import { role } from "./seeders/role"
import { roleInterface } from "./Interface/role.interface"
import router from "./routers/router"
const app = express()
const port = process.env.port || 8001
app.use(express.json())

const createUser = () => {
    users.map((user: userInterface) => {
        db.Users.create(user)
    })
}
// createUser() 

const createCustomer = () => {
    customer.map((customer: customerInterface) => {
        db.Customer.create(customer)
    })
}
// createCustomer()

const createRole = () => {
    role.map((element: roleInterface) => {
        db.uRole.create(element)
    })
}
// createRole()


db.sequelize.sync().then(() => {
    app.listen(port , () => {
        console.log("App is listening on Port:" , port )
    })
})

app.use(router)
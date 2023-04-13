import { userRole } from "../Interface/user.enums"
import { userInterface } from "../Interface/user.interface"


export const users: userInterface[] = [
    {
        user_id: 1,
        first_name: "Faiz",
        dob: "08/06/2003",
        middle_name: "Ahmed",
        last_name: "Choudhary",
        email: "faiz.ahmed@mail.com",
        phone_number: 9181212111,
        role: userRole.SuperAdmin,
        address: "Toronto",
        CustomerId: 2,
        uRoleId: 3
    },
    
    {
        user_id: 2,
        first_name: "Zain",
        dob: "22/12/1923",
        middle_name: "OneD",
        last_name: "Malik",
        email: "zain.malik@mail.com",
        phone_number: 2349861232,
        role: userRole.Admin,
        address: "NYC",
        CustomerId: 1,
        uRoleId: 2
    },

    {
        user_id: 3,
        first_name: "Rohan",
        dob: "18/02/2001",
        middle_name: "Kapoor",
        last_name: "Gupta",
        email: "rohan.kapoor@mail.com",
        phone_number: 9181212111,
        role: userRole.Subscriber,
        address: "LA",
        CustomerId: 3,
        uRoleId: 1
    },

]
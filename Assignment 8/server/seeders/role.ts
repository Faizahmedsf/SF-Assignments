import { roleInterface } from "../Interface/role.interface";
import { userRole } from "../Interface/user.enums";

export const role: roleInterface[] = [
    {
        id: 1,
        role_name: userRole.Admin,
        role_description: "Admin Description"
    },

    {
        id: 2,
        role_name: userRole.SuperAdmin,
        role_description: "Super Admin Description"
    },

    {
        id: 3,
        role_name: userRole.Subscriber,
        role_description: "Subscriber Description"
    }
]
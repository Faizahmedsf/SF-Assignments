
export interface user {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: number;
    role: string;
    address: string;
  }

export interface IIS {
    loading?: boolean;
    users: user[] | any;
    error: string;
  }

  // enums
export enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber",
  }
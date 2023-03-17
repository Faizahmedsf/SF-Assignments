import {
  userData,
  User,
  data,
  IUserGui,
  userOperation,
  TempSubject,
  TempObserver,
  bonus,
} from "./interfaces/interfaces";

console.log("To do list practical 1");

// user data class
class dataSource implements data {
  constructor() {}
  public getdata(): userData[] {
    return [
      {
        id: 1,
        uname: "faiz",
        email: "faiz@mail.com",
        dob: 12 / 12 / 1111,
      },

      {
        id: 2,
        uname: "ahmed",
        email: "ahmed@mail.com",
        dob: 12 / 90 / 6543,
      },
    ];
  }
}

// user class which contains all the business logic
class Employee implements User {
  Userdata: userData[];

  constructor(data: userData[]) {
    this.Userdata = data;
  }

  addUser(): string {
    // console.log(`user ${this.Userdata[1].uname} added to db with id ${this.Userdata[1].id}`)
    return "hey new user is added now use the viewuser() to show the data";
  }

  editUser(): void {
    console.log(
      `user ${this.Userdata[0].uname} has been edited in db with id ${this.Userdata[0].id}`
    );
  }

  deleteUser(): void {
    console.log(
      `user ${this.Userdata[1].uname} has been deleted from db of id ${this.Userdata[1].id}`
    );
  }

  updateUser(): void {
    console.log(
      `user ${this.Userdata[0].uname} has been updated in db of id ${this.Userdata[0].id}`
    );
  }
}

// an instance of datasource class
const data = dataSource.getinstance().getdata();
console.log(data);

// an instance of emp class
const emp = new Employee(data);
emp.addUser();

// user class which contains the ui logic
class UserGui implements IUserGui {
  data: userData[];

  constructor(data: userData[]) {
    this.data = data;
  }

  ViewUsers() {
    console.log("contains all the ui logic to show Users on a web page");
    return "contains all the ui logic to show Users on a web page";
  }

  ViewSingleUser() {
    console.log("contains logic for viewing single users");
    return ".eetpadA eht fo roivaheb laicepS";
  }
}

// factory method
// in this we are letting user/admin to select the type of data he want to view example single user or all user
// we are hiding all the logic/complexity behind other classes and calling the instance of that class here on the basis of if else condition

class Usershow {
  private type: string = "All";

  public ShowAccCond(): any {
    if (this.type == "All") {
      return new UserGui(data).ViewUsers();
    }
    return new UserGui(data).ViewSingleUser();
  }
}

class AddingUser {
  public static request(): string {
    return new Employee(data).addUser();
  }
}

class ViewingUser {
  public Adaptee(): string {
    return new UserGui(data).ViewSingleUser();
  }
}

// the view single is incomaptible
// now lets create a adpater so the view single is compatible with the adduser
class userAdapter extends AddingUser {
  private ViewUser: ViewingUser;

  constructor(ViewUser: ViewingUser) {
    super();
    this.ViewUser = ViewUser;
  }

  public request(): string {
    const result = this.ViewUser.Adaptee().split("").reverse().join("");
    return `Adapter updated ${result}`;
  }
}

function client(ViewingUser: ViewingUser) {
  const addinguser = new AddingUser();
}

console.log("start the behaviour");
console.log(AddingUser.request());

const vu = new ViewingUser();
const uadpater = new userAdapter(vu);
console.log(uadpater.request());

// creating a decorator method to adding new behaviours to objects without making a subclass
// example we are checking which employee salary has been paid and whose not
// after getting that object we are extending its ability without creating other subclasses

abstract class salary {
  public abstract salarypaid(): void;
}

class UserSalary extends salary {
  data: userData[];

  constructor(data: userData[]) {
    super();
    this.data = data;
  }

  salarypaid() {
    for (let index = 0; index < this.data.length; index++) {
      if (this.data[index].id > 0) {
        console.log(`salary has been paid to User ${this.data[index].id}`);
        return `salary has been paid to User ${this.data[index].id}`;
      }
      console.log(`salary is been pending of User ${this.data[index].id}`);
      return `salary is been pending of User ${this.data[index].id}`;
    }
  }
}

abstract class decoratorOptions extends salary {
  public employee: salary;

  public abstract salarypaid(): string;
}

class decortaor extends decoratorOptions {
  public employee: salary;

  constructor(employee: salary) {
    super();
    this.employee = employee;
  }
  public salarypaid(): string {
    return this.employee.salarypaid() + ` Decorator updated`;
  }
}

const faiz = new UserSalary(data);
console.log(faiz);

// debugger
const doa = new decortaor(faiz);
console.log(doa.salarypaid());

// using a command patterns i am creating some commands for user classs

//  A Command for adding Emp User
class addEmpuser implements userOperation {
  private data: userData[];

  constructor(data: userData[]) {
    this.data = data;
  }

  execute(): string {
    console.log(
      `user ${this.data[0].uname} has been added in db with id ${this.data[0].id}`
    );
    return `user ${this.data[0].uname} has been added in db with id ${this.data[0].id}`;
  }

  undo(): string {
    console.log(
      `user ${this.data[0].uname} operation has been undo ${this.data[0].id}`
    );
    return `user ${this.data[0].uname} addition operation has been undo ${this.data[0].id}`;
  }
}

//  A Command for deleting Emp User
class delEmpuser implements userOperation {
  private data: userData[];

  constructor(data: userData[]) {
    this.data = data;
  }

  execute(): string {
    console.log(
      `user ${this.data[0].uname} has been deleted from db with id ${this.data[0].id}`
    );
    return `user ${this.data[0].uname} has been deleted from db ${this.data[0].id}`;
  }

  undo(): string {
    console.log(
      `user ${this.data[0].uname} deletion operation has been undo ${this.data[0].id}`
    );
    return `user ${this.data[0].uname} deletion operation has been undo ${this.data[0].id}`;
  }
}

// an abstract class will be extended by the usermaincommand
abstract class maincommand {
  public static command: userOperation;

  abstract executecommand(): string;

  abstract undocommand(): string;
}

// in this class we are creating an execute and undo command where we can call the any execute or undo command of any class

class UsermainCommand extends maincommand {
  public command: userOperation;
  public value: string;

  constructor(command: userOperation) {
    super();
    this.command = command;
  }

  executecommand(): string {
    this.value = this.command.execute();
    return this.value;
  }

  undocommand(): string {
    this.value = this.command.undo();
    return this.value;
  }
}

const addEmployeeUser = new addEmpuser(data);
const delEmployeeUser = new delEmpuser(data);

// debugger
const mcommand = new UsermainCommand(addEmployeeUser);
mcommand.executecommand();
mcommand.undocommand();

const ncommand = new UsermainCommand(delEmployeeUser);
ncommand.executecommand();
ncommand.undocommand();

class MainTemperature implements TempSubject {
  observers: TempObserver[] = [];
  temp: number;

  setTemperature(temp: number) {
    this.temp = temp;
    console.log(`temp is ${this.temp}`);
    this.notify();
  }

  registertempObserver(o: TempObserver): void {
    console.log("we are registering Observer:", o);
    this.observers.push(o);
  }

  removetempObserver(o: TempObserver): void {
    console.log("we are removing Observer:", o);
    this.observers.pop();
  }

  notify(): void {
    console.log("notify temo is", this.temp);

    for (const observer of this.observers) {
      observer.update(this.temp);
    }
  }
}

class setTemp implements TempObserver {
  public subject: TempSubject;

  constructor(subject: TempSubject) {
    this.subject = subject;
    this.subject.registertempObserver(this);
  }

  update(temp: number): number {
    console.log("temp is", temp);

    let viewtemp = document.getElementById("show-temperature") as any;
    viewtemp.innerHTML = temp;
    return temp;
  }
}
class setTemp2 implements TempObserver {
  public subject: TempSubject;

  constructor(subject: TempSubject) {
    this.subject = subject;
    this.subject.registertempObserver(this);
  }

  update(temp: number): number {
    console.log("temp is", temp);

    let viewtemp = document.getElementById("show-temperature2") as any;
    viewtemp.innerHTML = temp;
    return temp;
  }
}

const mtemp = new MainTemperature();
const stemp = new setTemp(mtemp);
const stemp2 = new setTemp2(mtemp);
mtemp.setTemperature(89);

// creating a stratergy design patterns to give diwali bonus bonuses to employee in the organizations

// we will take the existing salary of employees and then we will add bonus to it like 10% or 20% of the salary

class JuniorEngineer implements bonus {
  getbonus(): number {
    return 10;
  }
}

class Enginner implements bonus {
  getbonus(): number {
    return 20;
  }
}

class SeniorEnginner implements bonus {
  getbonus(): number {
    return 30;
  }
}

class Teamlead implements bonus {
  getbonus(): number {
    return 40;
  }
}

// lets create a context
abstract class Empbonus {
  protected strategy: bonus;

  public abstract setbonus(name: string, salary: number): string;
}

class EmployeeContext extends Empbonus {
  protected strategy: bonus;
  private value: number;
  private updatedSalary: number;

  constructor(strategy: bonus) {
    super();
    this.strategy = strategy;
  }

  public setbonus(name: string, salary: number): string {
    this.value = salary * (this.strategy.getbonus() / 100);
    console.log("salary is", salary);
    console.log("this.value (bonus value) is", this.value);
    this.updatedSalary = this.value + salary;
    return `So diwali bonus for ${name} is  ${this.updatedSalary}`;
  }
}

const EmployeeContext1 = new EmployeeContext(new JuniorEngineer());
const EmployeeContext2 = new EmployeeContext(new Enginner());
const EmployeeContext3 = new EmployeeContext(new SeniorEnginner());
const EmployeeContext4 = new EmployeeContext(new Teamlead());

console.log(EmployeeContext1.setbonus("faiz", 10000));
console.log(EmployeeContext2.setbonus("rohan", 20000));
console.log(EmployeeContext3.setbonus("ryan", 30000));
console.log(EmployeeContext4.setbonus("KK", 30000));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ios = exports.Windows = exports.Android = void 0;
console.log('Index.ts Design Patterns');
// SOLID PRINCIPLE
//1.  S- SINGLE RESPONSIBILITY PRINCIPLE
/*
    a component should have a single responsibility
    and there should be a high cohension within the components

    To state this principle more technically: Only one potential change (database logic, logging logic, and so on.)
*/
// this class his handling all the db logic for a user
class User {
    constructor(cname, cemail) {
        this.name = cname;
        this.email = cemail;
    }
    static adduser() {
        console.log('add User method callled');
    }
    edituser() {
        console.log('edit User method callled');
    }
    deleteuser() {
        console.log('delete User method callled');
    }
    updateuser() {
        console.log('update User method callled');
    }
}
const faiz = new User('faiz', 'faiz@mail.com');
// console.log(faiz.email);
// faiz.adduser()
User.adduser();
// this class his handling all the ui logic for a user
class displayuser {
    constructor(cname) {
        this.name = cname;
        // document.write('name is ', this.name)
    }
}
const n = new displayuser('faiz ahmed');
// console.log(n.name);
// 2. Open-Closed principle
/* classes should be open for extension and closed to modification.

Modification means changing the code of an existing class, and extension means adding new functionality. with the help of interfaces and abstract classes. */
class choclate {
    constructor(cprice, cdiscount) {
        this.price = cprice;
        this.discount = cdiscount;
        // console.log(thi/s.price, 'and', this.discount);
    }
    calculate() {
        let amount = this.price - this.discount;
        // console.log('total amnt for choclate is ', amount);
        return amount;
    }
}
class drink {
    constructor(cprice, cdiscount) {
        this.price = cprice;
        this.discount = cdiscount;
        // console.log(this.price, 'drink and', this.discount);
    }
    calculate() {
        let amnt = this.price - this.discount;
        // console.log('total amnt for red bull is ', amnt);
        return amnt;
    }
}
const kitkat = new choclate(10, 1);
// kitkat.calculate();
const redbull = new drink(100, 10);
// redbull.calculate()
// 3. Liskov Substitution Principle
// modifying one aspect of our system does not affect other elements negatively.
/*
    a subclass should override the parent class methods in a way that does not break functionality from a       client’s point of view.

    Objects of a superclass should be able to be replaced with objects of subclasses without causing the application to break. Rectangular Square problem. Every single place where you use Rectangle(parent class) should be replaced with Square(child class)
*/
class Rectangle {
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    getArea() {
        console.log('get area');
        return "get area " + this.width * this.height;
    }
}
class Square extends Rectangle {
    setWidth(width) {
        this.width = width;
        this.height = width;
    }
    setHeight(height) {
        this.width = height;
        this.height = height;
    }
}
// const rec = new Rectangle()
// rec.setWidth(99)
// rec.setHeight(1)
// console.log(rec.width);
// console.log(rec.height);
// console.log(rec.getArea())
// const sq = new Square()
// console.log('sq' , sq);
// sq.setWidth(100)
// console.log(sq.width);
// console.log(sq.height);
//  sq.setHeight(50)  // its  returning 2500 rather than returning 5000
// console.log(sq.width);
// console.log(sq.height);
// console.log(sq.getArea())
// to solve this create a instance so that if we are changing the functionality of a subclass it should not affect the superclass
class Rectangletwo {
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    getArea() {
        console.log('get area');
        return this.width * this.height;
    }
}
const rec2 = new Rectangletwo();
rec2.setWidth(10);
rec2.setHeight(10);
// console.log(rec2.getArea());
class Squaretwo {
    setWidth(width) {
        this.width = width;
        this.height = width;
    }
    // setHeight(height:number) {
    //     this.width = height;
    //     this.height = height;
    // }
    getArea() {
        return Math.pow(this.width, 2);
    }
}
const square2 = new Squaretwo();
square2.setWidth(10);
// console.log(square2.width);
// square2.setHeight(50)
// console.log(square2.width);
// console.log(square2.height);
// console.log(square2.getArea());
// 4. Interface Segeratitions
//  Interface Segregation Principle is about separating the interfaces.
class product {
    constructor(cpname, cpdesc, cpprice, cpaymnet) {
        this.pname = cpname,
            this.pdesc = cpdesc,
            this.pprice = cpprice;
        this.ppayment = cpaymnet;
    }
    productname() {
        // console.log(`the name of the product is`, this.pname)
    }
    productderipttion() {
        // console.log(`the desc of the product is`, this.pdesc)
    }
    productprice() {
        // console.log(`the price of the product is`, this.pprice)
    }
    // even though if we dont need that function from interface we have to define call that
    testfunc() {
    }
    productpayment() {
        // this.ppayment ? console.log(`payment done`) : console.log(`payment is pending`)
    }
}
const sneakers = new product('Air Jordan M1', 'product desc is air jordan', 12999, true);
// console.log(sneakers)
sneakers.productname();
sneakers.productderipttion();
sneakers.productprice();
sneakers.productpayment();
// 5. Dependency Inversion Principle
/* The Dependency Inversion principle states that our classes should depend upon interfaces or abstract classes instead of concrete classes and functions */
// abstract class example 
class student {
    constructor(cname, cemail, cstatus) {
        this.name = cname,
            this.email = cemail;
        this.status = cstatus;
    }
    studentdetails() {
        // console.log(`name of student is ${this.name} and email is ${this.email}`);
    }
}
//  we can cant directly instantiate
class rohan extends student {
    // name:string;
    // email:string
    constructor(cname, cemail, cstatus) {
        super(cname, cemail, cstatus);
    }
    feespaid(cstatus) {
        // cstatus ? console.log('fees paid') : console.log('fees is pending')
    }
}
const newrohan = new rohan('rohan', 'rohan12@gmail.com', false);
newrohan.feespaid(true);
// concrete class
/*
    Classes that are complete with fully implemented methods.
    can't be extended/subclassed by another class
    
    Every dependency in the design should be directed toward an abstract class or interface. No dependency should target a concrete class.
*/
// depend on interface
class Employee {
    create() {
        console.log('User is created');
    }
    update() {
        console.log('User is Updated');
    }
    delete() {
        console.log('user is deleted');
    }
}
// or depend on abstract class
class order {
    constructor(cid, cname, cprice) {
        this.orderid = cid,
            this.ordername = cname,
            this.orderprice = cprice;
    }
    showordername() {
        // console.log(`order name is `, this.ordername);
    }
}
class burger extends order {
    constructor(cid, cname, cprice) {
        super(cid, cname, cprice);
        this.orderid = cid,
            this.ordername = cname,
            this.orderprice = cprice;
    }
    letsplay() {
        // console.log('burger is good');
    }
}
const burgerOrder = new burger(1, 'Burger', 322);
// burgerOrder.showordername();
// burgerOrder.letsplay();
class pizza extends order {
    constructor(cid, cname, cprice) {
        super(cid, cname, cprice);
        this.orderid = cid,
            this.ordername = cname,
            this.orderprice = cprice;
    }
    letsplay() {
        // console.log('burger is good but pizza is better');
    }
}
const pizzaOrder = new pizza(2, 'Pizaa', 99);
// pizzaOrder.showordername();
// pizzaOrder.letsplay();
// Design Patterns
// Creational Patterns
//  1. Singleton
// it states that we can create a single instance of a class 
// not using new keyword
// The Singleton pattern disables all other means of creating objects of a class except for the special creation method.    
// it also protects that instance from being overwritten by other code.
// only one global access point to that object. 
class Name {
    // name: string;
    // email: string;
    // private constructor(cname: string, cemail: string) {
    //     this.name = cname,
    //         this.email = cemail
    // }
    constructor() {
        this.lal();
    }
    lal() {
        console.log('hello world');
    }
    // create a get method to get the objects using getInstance()
    static get Instance() {
        // this.instance == null ?  this.instance =  new Name() : console.log('Class instance Already Exists') :
        // return this.instance
        if (this.instance == null) {
            this.instance = new Name();
        }
        else {
            console.log('already Exists');
            return this.instance;
        }
        return this.instance;
    }
}
const news = Name.Instance;
// 2. Factory Method
// combination of single responsibilty and open/ closed 
// hide logic creation from users
// Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.
// Objects returned by a factory method are often referred to as products.
class Android {
    finalresult() {
        return 'It is a good Os';
    }
}
exports.Android = Android;
class Windows {
    finalresult() {
        // console.log('It is a good and not a open source Os')        
        return 'It is a good and not a open source Os';
    }
}
exports.Windows = Windows;
class Ios {
    finalresult() {
        return 'It is a good & secure Os';
    }
}
exports.Ios = Ios;
class mainFactory {
    // osname: string
    static factory(cosname) {
        // this.osname = cosname;
        if (cosname == 'window') {
            return new Windows();
        }
        else if (cosname == 'android') {
            return new Android();
        }
        else {
            return new Ios();
        }
    }
}
// const a = new mainFactory('windo)
let ab = mainFactory.factory('window');
console.log(ab.finalresult());
// Structural
// Structural design patterns explain how to assemble objects and classes into larger structures, while keeping these structures flexible and efficient.
// 1. Adapter
// interface modification or using the interface of other class for new code but existing should work the same
// Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.
// is a special object that converts the interface of one object so that another object can understand it.
// The Adapter acts as a wrapper between two objects. It catches calls for one object and transforms them to format and interface recognizable by the second object.
class ClassA {
    methodA() {
        console.log('method A');
    }
}
class ClassB {
    methodB() {
        console.log('method B');
    }
}
class CAdapter {
    constructor(ab) {
        this.ab = ab;
    }
    methodA() {
        console.log('ok so we are adding A to B');
        this.ab.methodB();
    }
}
let Bclass = new ClassB();
let newname = new CAdapter(Bclass);
// newname.methodA()
class ClassUser {
    data() {
        // throw new Error("Method not implemented.");
        console.log(`name is ${this.name} and email is ${this.email}`);
    }
    constructor(cname, cemail) {
        this.name = cname,
            this.email = cemail;
    }
}
class Classproduct {
    price() {
        console.log("price is $99");
    }
}
class UserProductAdapter {
    data() {
    }
    constructor(cshoes) {
        this.product = cshoes;
        console.log('adding user method to products');
        this.product.price();
    }
}
// const harsh = new ClassUser('harsh', 'harsh.com')
// console.log(harsh.email);
// harsh.data()
// const nike = new Classproduct()
// nike.price()
// const faizshoes = new UserProductAdapter(nike)
// console.log(faizshoes);
// 2. Decorator
// can extend an object’s behavior without making a new subclass.
// Decorator is a structural pattern that allows adding new behaviors to objects dynamically by placing them inside special wrapper objects, called decorators
class car {
    getdescription() {
        return this.description;
    }
}
class ModelS extends car {
    constructor() {
        super(...arguments);
        this.description = 'Model S';
    }
    getcost() {
        return 10;
    }
}
class Toyota extends car {
    constructor() {
        super(...arguments);
        this.description = 'Toyota fortuner';
    }
    getcost() {
        return 20;
    }
}
// a class which include all the options for models and toyota
class caroptions extends car {
}
// option 1 
class mirror extends caroptions {
    constructor(whatdecorated) {
        super();
        this.whatdecorated = whatdecorated;
    }
    getdescription() {
        return this.whatdecorated.getdescription() + ` added mirror functionality`;
    }
    getcost() {
        return this.whatdecorated.getcost() + 11;
    }
}
class Autopilot extends caroptions {
    constructor(whatdecorated) {
        super();
        this.whatdecorated = whatdecorated;
    }
    getdescription() {
        return this.whatdecorated.getdescription() + ` added autopilot options`;
    }
    getcost() {
        return this.whatdecorated.getcost() + 1;
    }
}
const m = new ModelS();
const opt = new Autopilot(m);
console.log(opt.getcost());
console.log(opt.getdescription());
// 3. Facade
// can hide lot of complexity behind a single method
// Facade is a structural design pattern that provides a simplified (but limited) interface to a complex system of classes, library or framework.
// While Facade decreases the overall complexity of the application, it also helps to move unwanted dependencies to one place
class cricket {
    sstart() {
        console.log('cricket match started');
    }
    send() {
        console.log('cricket ended');
    }
}
class football {
    sstart() {
        console.log('football match started');
    }
    send() {
        console.log('football ended');
    }
}
class wrestling {
    sstart() {
        console.log('wrestling match started');
    }
    send() {
        console.log('football ended');
    }
}
class Facadesports {
    constructor(crickets, footballs, wrestlings) {
        this.crickets = crickets;
        this.footballs = footballs;
        this.wrestlings = wrestlings;
    }
    facadestart() {
        this.crickets.sstart();
        this.footballs.sstart();
        this.wrestlings.sstart();
    }
    facadestop() {
        this.crickets.send();
        this.footballs.send();
        this.wrestlings.send();
    }
}
const crickets = new cricket();
const footballs = new football();
const wrestlings = new wrestling();
const facade = new Facadesports(crickets, footballs, wrestlings);
// facade.facadestart()
// 3. Behavioral design patterns
// Behavioral design patterns are concerned with  the assignment of responsibilities between objects.
// 1. Command
// Command is behavioral design pattern that converts requests or simple operations into objects.
// used to separate each request or command from the object on which those requests are performed
class calculator {
    constructor() {
        this.value = 100;
        this.history = [];
    }
    executecommand(arithmetic) {
        this.arithmeticfunc = arithmetic;
        this.value = this.arithmeticfunc.execute(this.value);
        this.history.push(arithmetic);
    }
    undo() {
        // this.arithmeticfunc = arithmetic
        // this.arithmeticfunc.undo(this.value)
        const cc = this.history.pop();
        this.value = cc.undo(this.value);
    }
}
class AddCommand {
    constructor(value) {
        this.value = value;
    }
    execute(val) {
        this.value = val + this.value;
        console.log(`return value is of addition execute is:`, this.value);
        return this.value;
    }
    undo(val) {
        console.log(val);
        console.log(this.value);
        // this.value = this.value - val
        console.log(`return value is of addition undo command is:`, val - this.value);
        return val - this.value;
    }
}
class SubCommand {
    constructor(value) {
        this.value = value;
    }
    execute(val) {
        this.value = val - this.value;
        console.log(`return value is of SubCommand execute is:`, this.value);
        return this.value;
    }
    undo(val) {
        this.value = val - this.value;
        console.log(`return value is of Sub undo Command  is:`, this.value);
        return this.value;
    }
}
// combine two commands
class AddThenSubtract {
    constructor(addvalue, multiplyvalue) {
        this.addvalue = new AddCommand(addvalue);
        this.multiplyvalue = new SubCommand(multiplyvalue);
    }
    execute(value) {
        const newvalue = this.addvalue.execute(value);
        return this.multiplyvalue.execute(newvalue);
    }
    undo(value) {
        const newvalue = this.multiplyvalue.undo(value);
        return this.addvalue.undo(newvalue);
    }
}
const can = new calculator();
can.executecommand(new AddThenSubtract(12, 3));
// can.executecommand(new AddCommand(10))
can.undo();
// 2. Observer
// when one part of code changes other gets notified
// like a subscription model 
class WeatherStation {
    constructor() {
        this.observers = [];
    }
    setTemperature(temp) {
        console.log('weather station new temperature is ', temp);
        this.temperature = temp;
        this.notify();
    }
    registerobserver(o) {
        console.log('it is registering', o);
        this.observers.push(o);
        // this.setTemperature(21)
    }
    removeobserver(o) {
        let index = this.observers.indexOf(o);
        console.log('it is removing', o);
        this.observers.slice(0, 1);
    }
    notify() {
        console.log('it is notifying');
        for (const observer of this.observers) {
            observer.update(this.temperature);
        }
    }
}
class DisplayTemperature {
    constructor(subject) {
        this.subject = subject;
        subject.registerobserver(this);
    }
    update(temperature) {
        // document.write(temperature)
        console.log('display one ', temperature);
        // if (temperature < 25) {
        //     console.log('well its less than 25C let me turn off the fan')
        // }
    }
}
class DisplayTemperature2 {
    constructor(subject) {
        this.subject = subject;
        subject.registerobserver(this);
    }
    update(temperature) {
        console.log('display two ', temperature);
        if (temperature > 25) {
            console.log('well its greater than 25C let me turn onn the fan');
        }
        else {
            console.log('well its less than 25C let me turn off the fan');
        }
    }
}
// const na = new WeatherStation()
// const dt = new DisplayTemperature(na)
// const dt2 = new DisplayTemperature2(na)
// console.log(dt);
// na.setTemperature(2)
// na.setTemperature(99) 
// 3. Strategy Pattern
// Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.
class context {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setstrategy(name, price) {
        console.log(price = price - this.strategy.getdiscount());
        return price = price - this.strategy.getdiscount();
    }
}
// this 3 classes are startegy classess
class Diwali {
    getdiscount() {
        return 30;
    }
}
class Newyear {
    getdiscount() {
        return 20;
    }
}
class eid {
    getdiscount() {
        return 10;
    }
}
const newn = new context(new Diwali());
newn.setstrategy('iphone', 100);

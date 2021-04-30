//const { createRestaurantAcct } = require('../restaurant_views/CreateRestaurant');
import React from 'react';
import CreateStudent from '../student_views/CreateStudent';
import renderer from 'react-test-renderer';
//for firebase database testing
//import firebaseAdmin from './firebase';
import { database } from '../Fire';
//const CreateStudent = require("./student_views/CreateStudent");


describe("Student create", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<CreateStudent />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
/*const testStudent = CreateStudent( 
    'studentemail@wisc.edu',
    'student address',
    'testStudent',
    '12345678',
    '12345678',
    '12345678',
    '',
    'Student',
    ''
); 

//can instantiate CreateStudent (or just student) object
test("Should be able to create a student object", () => {
    const student = new CreateStudent();
    expect(typeof(student).toBe("object"))

//check that student username is added to database
describe('Create Student', () => {
    it('it checks if new student username is in database', async ()=>{
        //assuming this binds
        //then student acc should be made, so we can check in database for it
        //check database for restaurant
        const currUserName = database
        .ref("Users")
        .child("Customers")
        .child(testStudent.username)
        .get()

        expect(currUserName).toBe("testStudent")
    })
})

//check that student email is added to database
describe('Create Student', () => {
    it('it checks if new student email is in database', async ()=>{
        //assuming this binds
        //then student acc should be made, so we can check in database for it
        //check database for restaurant
        const currEmail = database
        .ref("Users")
        .child("Customers")
        .child(testStudent.email)
        .get()

        expect(currEmail).toBe("testStudent@wisc.edu")
    })
})

//check that student address is added to database
describe('Create Student', () => {
    it('it checks if new student address is in database', async ()=>{
        //assuming this binds
        //then student acc should be made, so we can check in database for it
        //check database for restaurant
        const currAddress = database
        .ref("Users")
        .child("Customers")
        .child(testStudent.address)
        .get()

        expect(currAddress).toBe("student address")
    })
})

//check that student password is added to database
describe('Create Student', () => {
    it('it checks if new student password is in database', async ()=>{
        //assuming this binds
        //then student acc should be made, so we can check in database for it
        //check database for restaurant
        const currPassword= database
        .ref("Users")
        .child("Customers")
        .child(testStudent.password)
        .get()

        expect(currPassword).toBe("12345678")
    })
})

//check that student number is added to database
describe('Create Student', () => {
    it('it checks if new student number is in database', async ()=>{
        //assuming this binds
        //then student acc should be made, so we can check in database for it
        //check database for restaurant
        const currNumber= database
        .ref("Users")
        .child("Customers")
        .child(testStudent.number)
        .get()

        expect(currNumber).toBe("12345678")
    })
})

//check that student role is added to database
describe('Create Student', () => {
    it('it checks if new student role is in database', async ()=>{
        //assuming this binds
        //then student acc should be made, so we can check in database for it
        //check database for restaurant
        const currUserRole = database
        .ref("Users")
        .child("Customers")
        .child(testStudent.role)
        .get()

        expect(currUserRole).toBe("Student")
    })
 })
})*/
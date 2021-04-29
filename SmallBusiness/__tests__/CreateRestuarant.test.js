//const { createRestaurantAcct } = require('../restaurant_views/CreateRestaurant');
import React from 'react';
import CreateRestaurant from '../restaurant_views/CreateRestaurant';
import renderer from 'react-test-renderer';
//for firebase database testing
import firebaseAdmin from './firebase';
import { database } from '../Fire';
const CreateRestaurant = require("./restaurant_views/CreateRestaurant");

//restaurant constructor for testing
const testRestaurant = CreateRestaurant(
    'Restaurant Name',
    'testRestaurant@wisc.edu',
    'Restaurant Address',
    '1PM - 4PM',
    '12345678',
    '12345678',
    'Restaurat'
);

describe("Student create", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<CreateRestaurant />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

//can instantiate CreateRestaurant (or just restaurant) object
test("Should be able to create a restaurant", () => {
    const restaurant = new CreateRestaurant();
    expect(typeof(restaurant).toBe("object"))
});

//check that restaurant name is added to database
describe('Create Resaurant Name', () => {
    it('it checks if new restaurant name is in database', async ()=>{
        //assuming this binds
        //then restaurant acc should be made, so we can check in database for it
        //check database for restaurant
        const currName = database
        .ref("Users")
        .child("Restaurants")
        .child(testRestaurant.name)
        .get()

        expect(currName).toBe("Restaurant Name")
    })
})

//check that restaurant email is added to database
describe('Create Restaurant email', () => {
    it('it checks if new student email is in database', async ()=>{
        //assuming this binds
        //then restraunt acc should be made, so we can check in database for it
        //check database for restaurant
        const currEmail = database
        .ref("Users")
        .child("Restaurants")
        .child(testRestaurant.email)
        .get()

        expect(currEmail).toBe("testRestaurant@wisc.edu")
    })
})

//check that restaurant address is added to database
describe('Create Restaurant Address', () => {
    it('it checks if new restaurant address is in database', async ()=>{
        //assuming this binds
        //then restaurant acc should be made, so we can check in database for it
        //check database for restaurant
        const currAddress = database
        .ref("Users")
        .child("Restaurants")
        .child(testRestaurant.address)
        .get()

        expect(currAddress).toBe("restaurant address")
    })
})

//check that restaurant password is added to database
describe('Create Restaurant Password', () => {
    it('it checks if new restaurant password is in database', async ()=>{
        //assuming this binds
        //then restaurant acc should be made, so we can check in database for it
        //check database for restaurant
        const currPassword= database
        .ref("Users")
        .child("Restaurants")
        .child(testRestaurant.password)
        .get()

        expect(currPassword).toBe("12345678")
    })
})

//check that restaurant number is added to database
describe('Create Restaurant Number', () => {
    it('it checks if new restaurant number is in database', async ()=>{
        //assuming this binds
        //then restaurant acc should be made, so we can check in database for it
        //check database for restaurant
        const currNumber= database
        .ref("Users")
        .child("Restaurants")
        .child(testStudent.number)
        .get()

        expect(currNumber).toBe("12345678")
    })
})

//check that restaurant role is added to database
describe('Create Restaurant Role', () => {
    it('it checks if new restaurant role is in database', async ()=>{
        //assuming this binds
        //then restaurant acc should be made, so we can check in database for it
        //check database for restaurant
        const currUserRole = database
        .ref("Users")
        .child("Restaurants")
        .child(testRestaurant.role)
        .get()

        expect(currUserRole).toBe("Restaurant")
    })
})
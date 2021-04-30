//const { createRestaurantAcct } = require('../restaurant_views/CreateRestaurant');
import React from 'react';
import CreateRestaurant from '../restaurant_views/CreateRestaurant';
import renderer from 'react-test-renderer';


describe("Student create", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<CreateRestaurant />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
/*
//constructor for testing purposes
const testRestaurant = {
    email: "testEmail@gmail.com",
    password: "12345678",
    name: "testRestaurant",
    address: "testAddress",
    cfpassword: "12345678",
    role: "Restaurant",
}

test('Should successfully return account email',() =>{

    const testRestaurant = new CreateRestaurant;

    testRestaurant.createRestaurantAcct();
    
    expect(this.email).toBe('testEmail@gmail.com');

});

test('Should successfully return account password',() =>{
    const testRestaurant = new CreateRestaurant;

    testRestaurant.createRestaurantAcct();
    
    expect(this.password).toBe('12345678');

});

test('Should successfully return Restaurant name',() =>{
    const testRestaurant = new CreateRestaurant;

    testRestaurant.createRestaurantAcct();
    
    expect(this.name).toBe('testRestaurant');

});

test('Should successfully return Restaurant address',() =>{
    const testRestaurant = new CreateRestaurant;

    testRestaurant.createRestaurantAcct();
    
    expect(this.address).toBe('testAddress');

});

test('Should successfully return account cfpassword',() =>{
    const testRestaurant = new CreateRestaurant;

    testRestaurant.createRestaurantAcct();
  
    expect(this.cfpassword).toBe('12345678');
});

test('Should successfully return account role',() =>{
    const testRestaurant = new CreateRestaurant;

    testRestaurant.createRestaurantAcct();
    
    expect(this.role).toBe('Restaurant');

});
*/

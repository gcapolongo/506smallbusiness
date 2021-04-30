import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../LoginScreen';
import Router from "../Router";

//const { CreateStudent } = require('../LoginScreen');
//const { CreateRestaurant } = require('../restaurant_views/CreateRestaurant');
//const { CreateStudent } = require('../student_views/CreateStudent');

describe("Student create", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe("Router Component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Router />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe("Router Component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Router />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe("Router Component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Router />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
describe("Router Component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Router />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
describe("Router Component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Router />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

/*
test('Should successfully return Student Role',() =>{

    const testStudent = new CreateStudent;

    testStudent.CreateAccount();
    
    expect(this.role).toBe('Student');

});

test('Should successfully return Restaurant Role',() =>{

    const testStudent = new CreateRestaurant;

    testRestaurant.CreateRestaurant();
    
    expect(this.role).toBe('Restaurant');

});*/
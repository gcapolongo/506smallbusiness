import React from 'react';
import renderer from 'react-test-renderer';
import RestaurantUser from '../restaurant_views/RestaurantUser';
import AddDeal from '../restaurant_views/AddDeal';
import EditProfile from '../restaurant_views/EditProfile';

describe("Restaurant Home Page", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<RestaurantUser />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe("Add Deal Page", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<AddDeal />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe("Edit Profile Page", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<EditProfile />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

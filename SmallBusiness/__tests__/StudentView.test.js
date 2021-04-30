import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../student_views/HomeScreen';
import ProfileView from '../student_views/ProfileView';
import FavoriteList from '../student_views/FavoriteList';
import RestaurantCard from '../student_views/RestaurantCard';
import UpdateProfile from '../student_views/UpdateProfile';

describe("Student Home Page", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<HomeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

/*describe("Student Profile Page", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<ProfileView />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
*/
describe("Favorites Page", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<FavoriteList />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

/*describe("Restaurant Cards", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<RestaurantCard />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
*/
describe("Update Profile Page", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<UpdateProfile />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});

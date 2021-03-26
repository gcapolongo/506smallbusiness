import React from 'react';
import LoginScreen from './LoginScreen';
import HomeScreen from './student_views/HomeScreen';
import AppStack from './student_views/AppStack';
import CreateStudent from './student_views/CreateStudent';
import CreateRestaurant from './restaurant_views/CreateRestaurant';
import RestaurantUser from './restaurant_views/RestaurantUser';
import CustomerUser from './restaurant_views/CustomerUser';
import UpdateProfile from './student_views/UpdateProfile';
import EditProfile from './restaurant_views/EditProfile';


import {
    StyleSheet,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function LoginView({ navigation }) {
    return (
        <LoginScreen nav={navigation}/>
    )
}

function HomeView({navigation}) {
    return (
        <AppStack nav = {navigation}/>
    )
}

function RestaurantUserView({navigation}) {
    return (
        <RestaurantUser nav ={navigation} />
    )
}

function updateRestaurant(){
    return(
        <EditProfile />
    )
}

function updateCustomer({navigation}){
    return(
        <UpdateProfile nav = {navigation}/>
    )
}

function CustomerUserView() {
    return (
        <CustomerUser />
    )
}

function CreateStudentView({ navigation }) {
    return (
        <CreateStudent nav={navigation}/>
    )
}

function CreateRestaurantView({ navigation }) {
    return (
        <CreateRestaurant nav={navigation}/>
    )
}

export default class Router extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Login"
                        component={LoginView}
                    />
                    <Stack.Screen 
                        name="HomeScreen"
                        component={HomeView}
                    />
                    <Stack.Screen 
                        name="Create Student User"
                        component={CreateStudentView}
                    />
                    <Stack.Screen 
                        name="Update Customer"
                        component={updateCustomer}
                    />
                    <Stack.Screen 
                        name="Create Restaurant"
                        component={CreateRestaurantView}
                    />
                    <Stack.Screen 
                        name="Restaurant User"
                        component={RestaurantUserView}
                    />
                    <Stack.Screen 
                        name="Update Restaurant"
                        component={updateRestaurant}
                    />
                    <Stack.Screen 
                        name="Customer User"
                        component={CustomerUserView}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    };
}

const styles = StyleSheet.create({

})

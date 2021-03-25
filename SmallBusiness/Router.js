import React from 'react';
import LoginScreen from './LoginScreen';
import HomeScreen from './student_views/HomeScreen';
import CreateStudent from './student_views/CreateStudent';
import CreateRestaurant from './restaurant_views/CreateRestaurant';
import RestaurantUser from './restaurant_views/RestaurantUser';
import Map from './student_views/Map';
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

function HomeView() {
    // TODO: change back to <HomeScreen /> after map is done
    return (
        <HomeScreen />
    )
}

function RestaurantUserView() {
    return (
        <RestaurantUser />
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
                        name="Create Restaurant"
                        component={CreateRestaurantView}
                    />
                    <Stack.Screen 
                        name="Restaurant User"
                        component={RestaurantUserView}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    };
}

const styles = StyleSheet.create({

})

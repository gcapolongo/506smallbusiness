import React from 'react';
import HomeScreen from './HomeScreen'
import ProfileView from './ProfileView'
import Map from './Map'

import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    TouchableOpacity
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default class AppStack extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const AppTabs = createBottomTabNavigator();
        return (
            <AppTabs.Navigator
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>

                <AppTabs.Screen
                    name="Map"
                    options={{
                        tabBarLabel: 'Map',
                        tabBarOptions: {
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                        },
                        animationEnabled: true,
                    }}>

                    {(props) => <Map />}
                </AppTabs.Screen>

                <AppTabs.Screen
                    name="HomeScreen"
                    options={{
                        tabBarLabel: 'Restaurants',
                        tabBarOptions: {
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                        },
                        animationEnabled: true,
                    }}>

                    {(props) => <HomeScreen />}
                </AppTabs.Screen>

                <AppTabs.Screen
                    name="Profile"
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarOptions: {
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                        },
                        animationEnabled: true,
                    }}>

                    {(props) => <ProfileView />}
                </AppTabs.Screen>

            </AppTabs.Navigator>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 10,
    },
    scrollView: {
        marginHorizontal: 5,
    },
    text: {
        fontSize: 24,
        padding: 15,
    },
    cartArea: {
        marginBottom: 30,
        marginHorizontal: 15,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#000000",
        padding: 20,
        borderRadius: 10,
    },
    btnText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFFFFF"
    }
})
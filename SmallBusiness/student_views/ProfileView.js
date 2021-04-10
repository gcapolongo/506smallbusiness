import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';

import { Card, ListItem, Button, Icon } from 'react-native-elements'
import business from './smallBusinesses.json'
import userList from './users.json'

import FavoriteList from './FavoriteList'
import { auth } from "../Fire.js";
import { database } from "../Fire";

export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        let data = JSON.parse(JSON.stringify(business));

        // let userInfo = JSON.parse(JSON.stringify(userList));
        this.state = {
            businesses: data,
            userFavorites: [],
            filteredFavorites: []
        };

        this.registerRestaurant = this.registerRestaurant.bind(this);
        this.updateUser = this.updateUser.bind(this)
        this.getFavorites = this.getFavorites.bind(this)
        this.getRestaurants = this.getRestaurants.bind(this)
        this.filterFavorites = this.filterFavorites.bind(this)
    }

    componentDidMount(){
        this.filterFavorites()
    }

    async getFavorites() {

        console.log("GETTING FAVS")

        let value;
        await database
            .ref("Users")
            .child("Customers")
            .child(this.props.user)
            .get()
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    value = snapshot.val()
                }
            }
            )
        
        console.log(value.Favorites)
        this.setState({ userFavorites: value.Favorites })
    }

    async getRestaurants(){

        console.log("GETTING RESTAU")

        let restaurants = []
        let userValues;
       await database
       .ref("Users")
       .child("Restaurants")
       .get()
       .then(function (snapshot) {
         if (snapshot.exists()) {
           const value = snapshot.val()
           userValues = Object.values(value)
            // console.log("VALUE HOMESCREEN")
            // console.log(value)
            }
        }
        )

        userValues.map((item) => (
               restaurants.push(item)
        ))

        this.setState({businesses: restaurants})

    }


    
    registerRestaurant() {
        this.props.nav.navigate("Customer User");
    }

    updateUser() {
        this.props.nav.navigate("Update Customer");
    }

    async filterFavorites() {
        await this.getRestaurants()
        await this.getFavorites()
        let favorites = []

        this.state.businesses.map((item) =>
            {
                // console.log("ITEEM in profile")
                // console.log(item)
                if(this.state.userFavorites.includes(item.Name)){
                    favorites.push(item)
                }
            }
            )


        this.setState({filteredFavorites: favorites})
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Small Business Deals
                </Text>
                    <Text style={styles.subHeading}>
                        John Doe (jdoe)
                </Text>
                    <Text style={[styles.subtitle, { fontSize: 15, marginTop: 10, fontWeight: "100" }]}>Address: 123 W Johnson St, Madison, WI 53703</Text>
                    <Text style={[styles.subtitle, { fontSize: 15, marginTop: 10, fontWeight: "100" }]}>Contact: 123-456-7890</Text>
                    <TouchableOpacity style={[styles.btnStyle, { marginLeft: 30 }]} onPress={this.updateUser}>
                        <Text style={styles.btnText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <Text style={styles.subHeading}>
                        Favorites
                </Text>
                    <View style={styles.container}>
                        {/* {console.log("FILTERED FAVORITES")}
                        {console.log(this.state.filteredFavorites)} */}
                        {this.state.filteredFavorites.map((item, index) => (
                            <FavoriteList
                                key={index}
                                name={item.Name}
                                address={item.Address}
                                image={item.photo}
                                nav={this.props.nav}
                                filtered  = {this.state.filteredFavorites}
                            />
                        ))}
                    </View>
                </View >

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 0
    },
    subtitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 30,
        marginTop: 50,
        marginBottom: 5
    },

    subHeading: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
        marginBottom: 30
    },

    input: {
        borderColor: "#7e807f",
        borderWidth: 2,
        width: 200,
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 5,
        fontSize: 18
    },
    inputContainer: {
        alignItems: "center",
        marginTop: 20
    },
    btnContainer: {
        alignItems: "center",
        marginTop: 15
    },
    btnStyle: {
        backgroundColor: "black",
        width: 100,
        borderRadius: 5,
        marginTop: 20,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 0
    },
    cardText: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 0
    }
})
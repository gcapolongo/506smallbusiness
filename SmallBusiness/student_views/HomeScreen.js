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

import RestaurantCard from './RestaurantCard'
import business from './smallBusinesses.json'

import { auth } from "../Fire.js";
import { database } from "../Fire";
import { cos } from 'react-native-reanimated';


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        // let data = JSON.parse(JSON.stringify(business));
        this.state = {
            businesses: []
        };

        this.getRestaurantData = this.getRestaurantData.bind(this)
    }

    componentDidMount() {
        this.getRestaurantData()
    }

    async getRestaurantData() {

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
                    console.log("VALUE HOMESCREEN")
                    console.log(value)
                }
            }
            )
            .catch(error => { console.log(error) })
            .finally(ret => {
                userValues.map((item) => (
                    restaurants.push(item)
                ))

                console.log("RESTAURANTS ARRAY")
                console.log(restaurants)

                this.setState({ businesses: restaurants })

            })

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Small Business Deals
                </Text>
                <Text style={styles.subtitle}>
                    Restaurants
                </Text>
                <ScrollView>
                    {console.log("STATE ARRAy")}
                    {console.log(this.state.businesses)}
                    <View style={styles.container}>
                        {console.log(this.state.businesses)}
                        {this.state.businesses.map((item, index) => (

                            <RestaurantCard
                                key={index}
                                name={item.Name}
                                address={item.Address}
                                image={item.photo}
                                nav={this.props.nav}
                                user={this.props.user}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
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
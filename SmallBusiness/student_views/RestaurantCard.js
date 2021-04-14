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

import { Card } from 'react-native-elements'
import business from './smallBusinesses.json'
import { auth } from "../Fire.js";
import { database } from "../Fire";
import { withSafeAreaInsets } from 'react-native-safe-area-context';


export default class RestaurantCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Favorites: [],
            favLabel: "Favorite"
        }

        this.registerRestaurant = this.registerRestaurant.bind(this);
        this.getUserFavorties = this.getUserFavorites.bind(this)
        this.addFavorite = this.addFavorite.bind(this)
        this.updateLabel = this.updateLabel.bind(this)

    }

    componentDidMount() {
        this.updateLabel()
        // console.log("IN MOUNTING")
        // console.log(this.state.Favorites)
        // console.log(this.props.name)
    }

    async updateLabel() {
        await this.getUserFavorites()
        if (this.state.Favorites.includes(this.props.name)) {
            this.setState({ favLabel: "In favorites" })
        }
    }
  
    async getUserFavorites() {

        // console.log("HERE IN CARD")

        let user = auth.currentUser
        // console.log("CUREENT USERR")
        // console.log(user)
        let restaurants = []
        let value;
        await database
            .ref("Users")
            .child("Customers")
            .child(user.uid)
            .get()
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    value = snapshot.val()
                }
            }
            )
            .catch(error => { console.log(error) })
            .finally(ret => {
                this.setState({ Favorites: value.Favorites })
            })
    }

    registerRestaurant() {
        this.props.nav.navigate("Customer User");
    }

    async addFavorite() {
        let user = auth.currentUser
        this.updateLabel()
        let favList = this.state.Favorites
        if (favList.includes(this.props.name) == false) {
            favList.push(this.props.name)
            await database.ref("Users")
                .child("Customers")
                .child(user.uid).update({ Favorites: favList })

            console.log("Favorited")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <Card.Title style={styles.cardTitle}>{this.props.name}</Card.Title>
                    <Card.Divider />
                    <Image
                        resizeMode="cover"
                        source={{ uri: this.props.image }}
                    />
                    <Text style={styles.cardText}>Address: {this.props.address}</Text>
                    <Text style={styles.cardText}>Rating: </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnStyle} onPress={this.registerRestaurant}>
                            <Text style={styles.btnText}>View Deals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, { marginLeft: 20 }]} onPress={this.addFavorite}>
                            <Text style={styles.btnText}>{this.state.favLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
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
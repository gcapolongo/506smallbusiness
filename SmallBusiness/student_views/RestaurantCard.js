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
import { auth } from "../Fire.js";
import { database } from "../Fire";
import { withSafeAreaInsets } from 'react-native-safe-area-context';

import CustomerUser from '../restaurant_views/CustomerUser';


export default class RestaurantCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Favorites: [],
            favLabel: "Favorite",
            pressed: false

        }

        this.registerRestaurant = this.registerRestaurant.bind(this);
        this.getUserFavorties = this.getUserFavorites.bind(this)
        this.addFavorite = this.addFavorite.bind(this)
        this.updateLabel = this.updateLabel.bind(this)
        this.displayHelp = this.displayHelp.bind(this)
        this.updatePressed = this.updatePressed.bind(this)
        this.updateChosen = this.updateChosen.bind(this)

    }

    componentDidMount() {
        this._navListener = this.props.nav.addListener('focus', () => {
            this.updateLabel()
        })
        // console.log("IN MOUNTING")
        // console.log(this.state.Favorites)
        // console.log(this.props.name)
    }

    async updateLabel() {
        console.log("Label")
        await this.getUserFavorites()
        // console.log("WHat are favorites")
        // console.log(this.state.Favorites)
        if (this.state.Favorites.length > 0 && this.state.Favorites.includes(this.props.name)) {
            this.setState({ favLabel: "In favorites" })
        }
    }

    async getUserFavorites() {
        let user = auth.currentUser
        // console.log("CUREENT USERR")
        console.log(user)
        let favs = []
        let holder = []
        let value;
        await database
            .ref("Users")
            .child("Customers")
            .child(user.uid)
            .child("Favorites")
            .get()
            .then(function (snapshot) {
                console.log("SNAPSHOT " + snapshot )
                snapshot.forEach((childSnapshot) => {
                if (childSnapshot.exists()) {
                    value = childSnapshot.val()
                    console.log("CHILDSNAPSHOT " + value)
                    holder.push(value)
                }
            }
            )
        }
            )
            .catch(error => { console.log(error) })
            .finally(ret => {
                holder.map((item) => (
                    favs.push(item.Name)
                ))
                // console.log("Favorites" + value.Favorites)
                this.setState({ Favorites: favs })
            })
    }

    registerRestaurant() {

        this.updatePressed()
        this.updateChosen()
        // console.log("HERE")

    }

    updatePressed() {
        if(this.props.isPressed == true){
            this.props.pressedFunc(false)
        }
        else{
            this.props.pressedFunc(true)
        }
    }

    updateChosen(){
        this.props.pressedFunc(this.props.name)

    }
    // this.props.nav.navigate("Customer User");
    // return (
    //     <CustomerUser
    //     name={this.props.name}
    //     address={this.props.address}
    //     image={this.props.image}
    //     nav={this.props.nav}
    //     />
    // )


    async addFavorite() {
        let user = auth.currentUser
        this.updateLabel()
        let favList = this.state.Favorites
        console.log("Before " + favList)
        if (favList.length == 0) {
            var favRef = database.ref("Users/Customers/" + user.uid).ref.child("Favorites");
            favRef.push().set({
                Name: this.props.name
            });
        }
        else if (favList.length > 0 && favList.includes(this.props.name) == false) {
            favList.push(this.props.name)
            console.log("After " + favList)
            await database.ref("Users")
                .child("Customers")
                .child(user.uid).update({ Favorites: favList })

            console.log("Favorited")
        }
    }

    displayHelp() {
        if (!this.state.pressed) {
            return (
                <Card>
                    <Card.Title style={styles.cardTitle}>{this.props.name}</Card.Title>
                    <Card.Divider />
                    <Image
                        resizeMode="cover"
                        source={{ uri: this.props.image }}
                    />
                    <Text style={styles.cardText}>Address: {this.props.address}</Text>
                    <Text style={styles.cardText}>Business Hours: {this.props.hours} </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnStyle} onPress={() => this.registerRestaurant()}>
                            <Text style={styles.btnText}>View Deals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, { marginLeft: 20 }]} onPress={this.addFavorite}>
                            <Text style={styles.btnText}>{this.state.favLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            )
        }
        else {
            return (
                <CustomerUser
                    name={this.props.name}
                    address={this.props.address}
                    image={this.props.image}
                    nav={this.props.nav}
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Card>
                    {console.log("IN THE IF STATEMENT")}
                    <Card.Title style={styles.cardTitle}>{this.props.name}</Card.Title>
                    <Card.Divider />
                    <Image
                        resizeMode="cover"
                        source={{ uri: this.props.image }}
                    />
                    <Text style={styles.cardText}>Address: {this.props.address}</Text>
                    <Text style={styles.cardText}>Business Hours: {this.props.hours} </Text>
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
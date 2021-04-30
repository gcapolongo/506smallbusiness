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
import CustomerUser from '../restaurant_views/CustomerUser';

import { auth } from "../Fire.js";
import { database } from "../Fire";
import { cos } from 'react-native-reanimated';


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        // let data = JSON.parse(JSON.stringify(business));
        this.state = {
            businesses: [],
            pressed: false,
            selected:"",
            chosenBusiness:[],
            favorites:[]
        };

        this.getRestaurantData = this.getRestaurantData.bind(this)
        this.displayHelp = this.displayHelp.bind(this)
        this.findBusiness = this.findBusiness.bind(this)
    }

    componentDidMount() {
        this.getRestaurantData()
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
            .child("Favorites")
            .get()
            .then(function (snapshot) {
                snapshot.forEach((childSnapshot) => {
                if (childSnapshot.exists()) {
                    value = childSnapshot.val()
                }
            }
            )
        }
            )
            .catch(error => { console.log(error) })
            .finally(ret => {
                console.log("Favorites" + value.Favorites)
                this.setState({ favorites: value.Favorites })
            })
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
                    // console.log("VALUE HOMESCREEN")
                    // console.log(value)
                }
            }
            )
            .catch(error => { console.log(error) })
            .finally(ret => {
                userValues.map((item) => (
                    restaurants.push(item)
                ))

                // console.log("RESTAURANTS ARRAY")
                // console.log(restaurants)

                this.setState({ businesses: restaurants })

            })
    }

    getStatus(val){
        this.setState({pressed: val})
    }

    getChosen(chosen){
        console.log("CHOSEN IS " +chosen)
        this.setState({selected: chosen})
    }

    backHomeHelper =() =>{
        this.setState({pressed:false})
    }

    findBusiness(){
        console.log("Finding business")
        console.log("Status is " + this.state.pressed)

        console.log("Selected is " + this.state.selected)
        let holder = []
        
        this.state.businesses.map((item) => {
            if (item.Name == this.state.selected){
                holder.push(item)
            }
        })

        console.log("HOLDER IS " + holder[0].Name)

        return (
            
            
            <ScrollView>
                <TouchableOpacity style={[styles.btnStyle, { marginLeft: 20 }]} onPress={this.backHomeHelper}>
                    <Text style={styles.btnText}>Back to Home</Text>
                </TouchableOpacity>
                {holder.map((item, index) => (
                    // console.log("IN THE MAP FUNC")
                    <CustomerUser
                        key={index}
                        name={item.Name}
                        address={item.Address} 
                        image={item.Photo}
                        hours = {item.Hours}
                        nav={this.props.nav}
                        user={this.props.user}
                    />
                ))}
            </ScrollView>
        )
    }

    displayHelp() {
        if (!this.state.pressed) {
            return (
                <View style={styles.container}>
                <Text style={styles.title}>
                    Small Business Deals
                </Text>
                <Text style={styles.subtitle}>
                    Restaurants
                </Text>
                <ScrollView>
                    {/* {console.log("STATE ARRAy")}
                    {console.log(this.state.businesses)} */}
                    <View style={styles.container}>
                        {/* {console.log(this.state.businesses)} */}
                        {this.state.businesses.map((item, index) => (

                            <RestaurantCard
                                key={index}
                                name={item.Name}
                                address={item.Address}
                                image={item.Photo}
                                hours = {item.Hours}
                                nav={this.props.nav}
                                user={this.props.user}
                                isPressed = {this.state.pressed}
                                pressedFunc = {this.getStatus.bind(this)}
                                chosenFunc = {this.getChosen.bind(this)}
                            />
                        ))}
                    </View>
                </ScrollView>
                </View>
            )
        }
        else {
            // console.log("MET CONDITION FOR CUSTOMER")
            return ( 
                this.findBusiness()    
            )
        }
    }

    render() {
        return (
            this.displayHelp()
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
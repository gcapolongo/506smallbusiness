import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import sample_deals from '../sample_deals.json'

import { auth } from "../Fire";
import { database } from "../Fire"

export default class RestaurantUser extends React.Component {

    constructor(props) {
        super(props);

        //TODO: remove this when firebase is connected
        let data = JSON.parse(JSON.stringify(sample_deals))
        this.state = {
            uid: "",
            name: "-",
            location: "-",
            rating: "-",
            businesshours: "-",
            deals: data,
        }

        this.handleEdit = this.handleEdit.bind(this);
    }

     async componentDidMount(){
        //TODO: fetch data from firebase here
        //let uid = route.params.uid
        //console.log("UID : " + uid)
        this.getInfo();
        
     } 

    // event handler for add deal button
    addDeal = () => {
        console.log("added new deal")
        this.props.nav.navigate("Add Deal")
    }


    //handles profile edit
    handleEdit = () => {
        this.props.nav.navigate("Update Restaurant");
    }

    /**
     * Gets the restaurant's name and address
     */
     getInfo = async() => {
        var user = auth.currentUser;
        let data = "";
        let location = "";
        let name = "";
        let userValues = "";

        if (user) {
            // User is signed in.
            console.log("Current signed in user's UID: " + user.uid);
              
            await database
              .ref("Users")
              .child("Restaurants")
              .child(user.uid)
              .get()
              .then(function (snapshot) {
                if (snapshot.exists()) {
                  data = snapshot.val();
            
                  userValues = Object.values(data);

                  //prints restaurant data
                  console.log(userValues)

                  location = userValues[0];
                  name = userValues[2];
                
                }
              })
              .catch(function (error) {
                console.error(error);
              });
              //updates state variables 
              this.setState({location: location})
              this.setState({name: location})
              console.log("Restaurant address: " + this.state.location)
              console.log("Restaurant name: " + this.state.name)

          } else {
            // No user is signed in.
            alert("Not signed in");
          }
    }

    

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.title, { fontSize: 32, marginLeft: 0 }]}>Small Business Deals</Text>
                    <Text style={styles.title}>Mirch Masala</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeaders}>Address: 449 State St, Madison, WI 53703</Text>
                        <Text style={styles.inputHeaders}>Business Hours: 10 am - 10 pm </Text>
                        <Text style={styles.inputHeaders}>Rating: 3.5</Text>
                        <TouchableOpacity style={[styles.btnStyle, { width: 150, height: 50 }]}
                            onPress={this.handleEdit}>
                            <Text style={styles.btnText}>Edit Profile</Text>
                        </TouchableOpacity>

                        <Text style={styles.title}>Deals </Text>
                        
                            {this.state.deals.Deals.map((deal, index) =>(
                                <Card>
                                    <Card.Title style={[styles.cardTitle, {flexDirection: "row"}]}>
                                        <Text style={{}}>{deal.title}</Text>
                                        <TouchableOpacity style={[styles.btnStyle, { width: 100, height: 30 }] }>
                                            <Text style={[styles.btnText,{ fontSize: 12}]}>Delete</Text>
                                        </TouchableOpacity>
                                    </Card.Title>
                                    <Card.Divider />
                                    <Image
                                        resizeMode="cover"
                                        source={{ uri: this.props.image }}
                                    />
                                    <Text style={styles.cardText}>{deal.description}</Text>
                                    
                                </Card>
                            ))}
                        <ScrollView>

                        </ScrollView>
                        <TouchableOpacity style={[styles.btnStyle, { width: 150, height: 50 }]}
                            onPress={this.addDeal}>
                            <Text style={styles.btnText}>Add Deal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50
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
    inputHeaders: {
        fontSize: 18,
        textAlign: "left",
        marginTop: 20,
        fontWeight: "500"
    },
    btnStyle: {
        backgroundColor: "black",
        width: 250,
        borderRadius: 5,
        marginTop: 20,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    btnStyle: {
        backgroundColor: "black",
        width: 125,
        borderRadius: 5,
        marginTop: 10,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },
    btnContainer: {
        alignItems: "center",
        marginTop: 15
    }
})

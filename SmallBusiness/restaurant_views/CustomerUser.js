import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlightBase } from "react-native";

import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { auth } from "../Fire";
import { database } from "../Fire";

export default class CustomerUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      name: "-",
      location: "-",
      rating: "-",
      businesshours: "-",
      dealArray: [],
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.getDealData = this.getDealData.bind(this);
  }

  //Fetching data from firebase via getDealData
  async componentDidMount() {
    this.getInfo();

    //returns an array of deal objects
    this.getDealData();
  
  }

  // event handler for add deal button
  addDeal = () => {
    console.log("added new deal");
    this.props.nav.navigate("Add Deal");
  };

  //handles profile edit
  handleEdit = () => {
    this.props.nav.navigate("Update Restaurant");
  };

  /**
   * Gets the restaurant's name and address
   */
  getInfo = async () => {
    let user = auth.currentUser;
    let data = "";
    let location = "";
    let name = "";
    let hours = "";

    //only gets the data once at the moment, needs to listen for changes
    if (user) {
      await database
        .ref("Users")
        .child("Restaurants")
        .child(user.uid)
        .get()
        .then(function (snapshot) {
          if (snapshot.exists()) {
            data = snapshot.val();

            //prints restaurant data
            console.log("RESTAURANT DATA");
            console.log(data);

            location = data.Address;
            name = data.Name;
            hours = data.Hours;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
      //updates state variables
      this.setState({ location: location });
      this.setState({ name: name });
      this.setState({ businesshours: hours });
      console.log("Restaurant address: " + this.state.location);
      console.log("Restaurant name: " + this.state.name);
    } else {
      // No user is signed in.
      alert("Not signed in");
    }
  };

  /**
   * 
   */
  /* getDealDataa = async () => {
    var user = auth.currentUser;
    let data = "";
    let dealArray = [];
    await database
      .ref("Users")
      .child("Restaurants")
      .child(user.uid)
      .child("Deals")
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          data = snapshot.val();
          console.log(data);
        }
      })
      .catch(function (error) {
        // console.error(error);
      });
  }; */

  /**
   * Grabs deal information from database (Title, Description)
   */
  getDealData = async () => {
    let user = auth.currentUser;
    let returnArr = [];

    await database
      .ref("Users")
      .child("Restaurants")
      .child(user.uid)
      .child("Deals")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let childKey = childSnapshot.key;
          //child key prints the key of each deal object

          let childData = childSnapshot.val();

          returnArr.push(childData);
        });
      });

    this.setState({ dealArray: returnArr });
    
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.title, { fontSize: 32, marginLeft: 0 }]}>
            Small Business Deals
          </Text>
          <Text style={styles.title}>{this.state.name}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaders}>
              Address: {this.state.location}
            </Text>
            <Text style={styles.inputHeaders}>
              Business Hours: {this.state.businesshours}
            </Text>
            <Text style={styles.inputHeaders}>Rating: 3.5</Text>

            <Text style={styles.title}>Deals </Text>
            {this.state.dealArray.map((deal, index) => (
              <Card key={index}>
                <Card.Title
                  style={[styles.cardTitle, { flexDirection: "row" }]}
                >
                  <Text style={{}}>{deal.Title}</Text>
                </Card.Title>
                <Card.Divider />
                <Image resizeMode="cover" source={{ uri: this.props.image }} />
                <Text style={styles.cardText}>{deal.Description}</Text>
              </Card>
            ))}
            <ScrollView></ScrollView>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  input: {
    borderColor: "#7e807f",
    borderWidth: 2,
    width: 200,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 5,
    fontSize: 18,
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  inputHeaders: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 20,
    fontWeight: "500",
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
    fontSize: 20,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 15,
  },
});
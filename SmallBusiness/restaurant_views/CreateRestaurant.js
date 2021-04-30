import React from "react";
import {
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

//import auth from firebase
import { auth } from "../Fire";
import { database } from "../Fire";

export default class CreateRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      hours: "",
      password: "",
      cfpassword: "",
      role: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.createRestaurantAcct = this.createRestaurantAcct.bind(this);
    this.writeUserData = this.writeUserData.bind(this);
  }

  /**
   * Once user clicks "Create Business", if they provide the valid
   * info to sign up they are directed to the restaurant profile page.
   */
  handleClick() {
    //creates user account and stores info in database
    this.createRestaurantAcct();
  }

  /**
   * If a restaurant user clicks "Register Restaurant", it lets user
   * sign up and writes their data in realtime database under
   * Users/Restaurants.
   */
  createRestaurantAcct() {
    //Checks if passwords match
    if (this.state.password !== this.state.cfpassword) {
      alert("Passwords do not match");
    } else {
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;

          alert("Account created");

          //their information will then be stored in the database
          this.writeUserData(user.uid);
          this.props.nav.navigate("Restaurant User");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          //prints error messages if the user credentials aren't right
          alert(errorMessage);
        });
    }
  }

  /**
   * This method will add the user's name, email, password, and unique key that corresponds
   * with their information location in the database. Their id is where their info is stored
   * in the database.
   */
  writeUserData(uid) {
    var myRef = database.ref("Users/Restaurants").child(uid);

    //This is how the data will be stored
    var newData = {
      Name: this.state.name,
      Address: this.state.address,
      Hours: this.state.hours,
      Email: this.state.email,
      Password: this.state.password,
      Role: "Restaurant",
    };
    //actually sets the data in the database
    myRef.set(newData);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Business Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeaders}>Business Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            autoCapitalize="none"
            onChangeText={(name) => this.setState({ name: name })}
            value={this.state.name}
          />
          <Text style={styles.inputHeaders}>Business Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            autoCapitalize="none"
            onChangeText={(address) => this.setState({ address: address })}
            value={this.state.address}
          />
          <Text style={styles.inputHeaders}>Business Hours:</Text>
          <TextInput
            style={styles.input}
            placeholder="Business Hours"
            autoCapitalize="none"
            onChangeText={(hours) => this.setState({ hours: hours })}
            value={this.state.hours}
          />
          <Text style={styles.inputHeaders}>Email Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email: email })}
            value={this.state.email}
          />
          <Text style={styles.inputHeaders}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(password) => this.setState({ password: password })}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Text style={styles.inputHeaders}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            autoCapitalize="none"
            onChangeText={(cfpassword) =>
              this.setState({ cfpassword: cfpassword })
            }
            value={this.state.cfpassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={this.handleClick}>
            <Text style={styles.btnText}>Create Business</Text>
          </TouchableOpacity>
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
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { auth } from "./Fire.js";
import { database } from "./Fire";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      key: "",
      uid: "",
      role: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.registerRestaurant = this.registerRestaurant.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.checkCustomerRole = this.checkCustomerRole.bind(this);
  }

  /**
   * Works for both customers and restaurant users
   */
  handleLogin() {
    
    this.authenticate();
  }

  /**
   * navigates to the create student user screen if "create account" is pressed
   */
  createAccount() {
    this.props.nav.navigate("Create Student User");
  }

  authenticate() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async() => {

        //checks role of customer
        this.state.role = await this.checkCustomerRole();

        console.log("Role of user: " + this.state.role);

        if (this.state.role === "Student") {
          //if role is user go to homescreen
          this.props.nav.navigate("HomeScreen");
          alert("Logged in as a student");
        } else {
          //if user is a restaurant owner go to restaurant screen
          this.props.nav.navigate("Restaurant User");
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        //This is the error message displayed if the user name and pw isn't found
        var errorMessage = "Invalid email address and/or password";
        if (errorCode) {
          alert(errorMessage);
        }
      });
  }

  checkCustomerRole = async() => {
    var user = auth.currentUser;
    let data = "";
    let userValues = "";
    let role = "";

    if (user) {
      // User is signed in.
      console.log("Current signed in user's UID: " + user.uid);

      await database
        .ref("Users")
        .child("Customers")
        .child(user.uid)
        .get()
        .then(function (snapshot) {
          if (snapshot.exists()) {
            data = snapshot.val();  
            
            userValues = Object.values(data);

            //prints an array of the customer's info
            console.log(userValues)

            for(let i = 0; i < userValues.length; i++){
                if(userValues[i] = "Student"){
                  role = userValues[i];
                }
            }
            //role = userValues[3];
            console.log("Role of the current user logging in: " + role);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
        
      await database
        .ref("Users")
        .child("Restaurants")
        .child(user.uid)
        .get()
        .then(function (snapshot) {
          if (snapshot.exists()) {
            data = snapshot.val();
      
            userValues = Object.values(data);
            console.log(userValues)
            for(let i = 0; i < userValues.length; i++){
              if(userValues[i] = "Restaurant"){
                role = userValues[i];
              }
          }
            //role = userValues[4];
            console.log("Role of the current user logging in: " + role);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
        return role;
    } else {
      // No user is signed in.
      alert("Not signed in");
    }

  }

  registerRestaurant() {
    this.props.nav.navigate("Create Restaurant");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Small Business Deals for College Students
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email: email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(password) => this.setState({ password: password })}
            value={this.state.password}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={this.handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={this.createAccount}
          >
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={this.registerRestaurant}
          >
            <Text style={styles.btnText}>Register Restaurant</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
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
  btnContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  btnStyle: {
    backgroundColor: "black",
    width: 180,
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
});

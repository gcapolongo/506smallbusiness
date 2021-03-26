import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

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
    }

    handleLogin() {
        this.authenticate();
    }

    createAccount() {
        this.props.nav.navigate("Create Student User")
    }

    registerRestaurant() {
        this.props.nav.navigate("Create Restaurant");
    }
    
    authenticate = async () => {
  
        await this.checkCustomerRole()    
      
        auth
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          //we want to check the database for their uid and read their role info
          .then(
              //this.checkCustomerRole()
            )
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            //This is the error message displayed if the user name and pw isn't found
            var errorMessage = "Invalid email address and/or password";
            if (errorCode) {
              alert(errorMessage);
            }
          })
          .finally((user) => {
            //checks role of customer
    
            //hardcoded for now because i'm very confused with state variables
            //this.state.role = "Student";
            if (this.state.role === "Student") {
              //if role is user go to homescreen
              this.props.nav.navigate("HomeScreen");
              alert("Logged in as a student");
            } else if(this.state.role ==="Restaurant") {
              //if user is a restaurant owner go to restaurant screen
              this.props.nav.navigate("Restaurant User");
            }
            console.log(2.2)
          })
      }
    
      checkCustomerRole = async() => {
        var user = auth.currentUser;
        let data = "";
        let userValues = "";
        let role = "";
        console.log("1.1")
        
          // User is signed in.
          //console.log("Current signed in user's UID: " + user.uid);
        if(user){
          //we want to check the database for their uid and read their role info
          database.ref("Users").child("Customers").child(user.uid).get()
            .then( (snapshot) => {
              if (snapshot.exists()) {
                //this.setState({role: "Student"})
                console.log("1.2.1")
                return "Student"
              } else{
                return "Restaurant"
              }
            })
            .then((role) => {this.setState({role: role})})
            .then(console.log(this.state))
            .catch(function (error) {
              console.error(error);
            });
        }
               
        //this.setState({role: "Student"});
        //console.log("1.3 ")
      }

    render() {
        return(
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
                    />
                    <TextInput 
                        style={styles.input}    
                        placeholder="Password"
                        onChangeText={(password) => this.setState({ password: password })}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={this.handleLogin}>
                        
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={this.createAccount}>

                        <Text style={styles.btnText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={this.registerRestaurant}>

                        <Text style={styles.btnText}>Register Restaurant</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 100
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
    }
})
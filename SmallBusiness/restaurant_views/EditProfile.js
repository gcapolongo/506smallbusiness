import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';

import firebase from "firebase/app";
import { auth } from "../Fire";
import { database } from "../Fire"


class UpdateProfile extends React.Component {

  /**
   * 
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      address: ""

    }
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.saveProfile = this.saveProfile.bind(this);

  }

  /**
   * Calling the update methods here changes the customer's 
   * profile details
   */
  saveProfile() {

    if (this.state.email != "") {
      this.updateEmail();
    }

    if (this.state.password != "") {
      this.updatePassword();
    }

    if (this.state.username != "") {
      this.updateUsername();
    }

    if (this.state.address != "") {
      this.updateAddress();
    }

    alert("Changes Saved.")

  }


  /**
   * This updates the email in the firebase authentication dashboard
   * and as well in the database.
   */
  updateEmail() {

    var user = auth.currentUser;
    let email = this.state.email;
    let key = 0;

    //update charly's info in the database
    if (user.email === "charly206@gmail.com") {
      key = 0;

      //update tom's info in the database
    } else if (user.email === "tom608@gmail.com") {
      key = 1;
    }

    //update the email field in database
    database.ref("users/" + key).update({ Email: email })

    //update email in firebase authentication
    user.updateEmail(this.state.email).then(function () {

      this.setState({
        email: user.email
      })

    }).catch(function (error) {
      //error
    });
    console.log(user.email)


  }

  /**
  * Updates the specified user's username field in the database.
  */
  updateUsername() {
    var username = this.state.username;
    var user = auth.currentUser;
    let key = 0;

    //update charly's info in the database
    if (user.email === "charly206@gmail.com") {
      key = 0;

      //update tom's info in the database
    } else if (user.email === "tom608@gmail.com") {
      key = 1;
    }

    database.ref("users/" + key).update({ Username: username })

  }

  /**
   * Updates the password in Firebase Authentication and in the specified user's 
   * password field in the database. Not sure if it works with updateEmail() at the
   * same time
   */
  updatePassword() {
    var user = auth.currentUser;
    var newPassword = this.state.password;
    let key = 0;

    //update charly's info in the database
    if (user.email === "charly206@gmail.com") {
      key = 0;

      //update tom's info in the database
    } else if (user.email === "tom608@gmail.com") {
      key = 1;
    }

    //update the password field in database
    database.ref("users/" + key).update({ Password: newPassword })

    user.updatePassword(newPassword).then(function () {


    }).catch(function (error) {
      // error
    });
  }

  /**
   * Updates the specified user's address field in the database
   */
  updateAddress() {
    var address = this.state.address;

    var user = auth.currentUser;
    let key = 0;

    //update charly's info in the database
    if (user.email === "charly206@gmail.com") {
      key = 0;

      //update tom's info in the database
    } else if (user.email === "tom608@gmail.com") {
      key = 1;
    }

    //update the Addresses field in database
    database.ref("users/" + key).update({ Addresses: address })

  }

  backToLogin() {
    this.props.revokeAccessToken();
  }

  /**
   * Displays and collects the profile information.
   * 
   */
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Small Business Deals</Text>
          <Text style={styles.subtitle}>Profile</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaders}>Name</Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#EE8B90"
              onChangeText={(email) => this.setState({ email: email })}
              value={this.state.email}
              autoCapitalize="none" />
            <Text style={styles.inputHeaders}>Password</Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#EE8B90"
              onChangeText={(password) => this.setState({ password: password })}
              value={this.state.password}
              autoCapitalize="none" />
            <Text style={styles.inputHeaders}>Business Hours</Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Username"
              placeholderTextColor="#EE8B90"
              onChangeText={(username) => this.setState({ username: username })}
              value={this.state.username}
              autoCapitalize="none" />
            <Text style={styles.inputHeaders}>Address</Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Address"
              placeholderTextColor="#EE8B90"
              onChangeText={(address) => this.setState({ address: address })}
              value={this.state.address + ""}
              autoCapitalize="none" />
            <Text style={styles.inputHeaders}>Password</Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#EE8B90"
              onChangeText={(password) => this.setState({ password: password })}
              value={this.state.password}
              autoCapitalize="none" />
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnStyle} onPress={() => this.saveProfile()}>
                <Text style={styles.btnText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
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
    marginTop: 0
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30
  },
  inputHeaders: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 20,
    fontWeight: "500"
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
  btnContainer: {
    alignItems: "center",
    marginTop: 15
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
});

export default UpdateProfile;
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Dimensions } from "react-native";

import firebase from "firebase/app";
import { auth } from "../Fire";
import { database } from "../Fire";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //email: "",
      address: "",
      businessHours: "",
      businessName: "",
      password: "",
    };

    //this.updateEmail = this.updateEmail.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.updateHours = this.updateHours.bind(this);
  }

  /**
   * Calling the update methods here changes the customer's
   * profile details
   */
  saveProfile() {
    if (this.state.businessName != "") {
      this.updateName();
    }

    if (this.state.password != "") { 
      this.updatePassword();
    }

    if (this.state.address != "") {
      this.updateAddress();
    }
    if (this.state.businessHours != "") {
      this.updateHours();
    }

    /* if (this.state.email != "") {
      this.updateEmail();
    } */
    alert("Changes Saved.");
  }

  /**
   * Updates the email in the firebase authentication dashboard
   * and as well in the database.
   */
  updateEmail() {
    let user = auth.currentUser;
    let email = this.state.email;

    //TODO: finish method
    //updates the email field in database
    //database.ref("users/" + key).update({ Email: email })
  }

  /**
   * Updates the Name field in the database.
   */
  updateName() {
    let name = this.state.businessName;
    let user = auth.currentUser;

    database
      .ref("Users")
      .child("Restaurants")
      .child(user.uid)
      .update({ Name: name });
  }

  /**
   * Updates the password in Firebase Authentication and in the specified user's
   * password field in the database.
   */
  updatePassword() {
    let user = auth.currentUser;
    let newPassword = this.state.password;

    database
      .ref("Users")
      .child("Restaurants")
      .child(user.uid)
      .update({ Password: newPassword});

    //update the password in firebase authentication
    user
      .updatePassword(password)
      .then(function () {})
      .catch(function (error) {
        // error
      });
  }

  /**
   * Updates the specified user's address field in the database
   */
  updateAddress() {
    let address = this.state.address;
    let user = auth.currentUser;

    database
      .ref("Users")
      .child("Restaurants")
      .child(user.uid)
      .update({ Address: address });
  }

  updateHours() {
    let hours = this.state.businessHours;
    let user = auth.currentUser;

    database
      .ref("Users")
      .child("Restaurants")
      .child(user.uid)
      .update({ Hours: hours });
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
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Business Name"
              placeholderTextColor="#EE8B90"
              onChangeText={(businessName) =>
                this.setState({ businessName: businessName })
              }
              value={this.state.businessName}
              autoCapitalize="none"
            />
            <Text style={styles.inputHeaders}>Password</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#EE8B90"
              onChangeText={(password) => this.setState({ password: password })}
              value={this.state.password}
              autoCapitalize="none"
            />
            <Text style={styles.inputHeaders}>Address</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Address"
              placeholderTextColor="#EE8B90"
              onChangeText={(address) => this.setState({ address: address })}
              value={this.state.address}
              autoCapitalize="none"
            />
            <Text style={styles.inputHeaders}>Business Hours</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Business Hours"
              placeholderTextColor="#EE8B90"
              onChangeText={(businessHours) =>
                this.setState({ businessHours: businessHours })
              }
              value={this.state.businessHours}
              autoCapitalize="none"
            />

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => this.saveProfile()}
              >
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
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  inputHeaders: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 20,
    fontWeight: "500",
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
    marginTop: 15,
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
});

export default EditProfile;
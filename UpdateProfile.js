import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';

import firebase from "firebase/app";
import { auth } from "./Fire";
import { database } from "./Fire"


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
  saveProfile(){
  
   if (this.state.email != ""){
      this.updateEmail();
   }

   if (this.state.password != ""){
      this.updatePassword();
   }

   if (this.state.username != ""){
      this.updateUsername();
   }

   if (this.state.address != ""){
      this.updateAddress();
   }

   alert("Changes Saved.")
    
  }

  
  /**
   * This updates the email in the firebase authentication dashboard
   * and as well in the database.
   */
  updateEmail(){

    var user = auth.currentUser;
    let email = this.state.email;
    let key = 0;

    //update charly's info in the database
    if (user.email === "charly206@gmail.com"){
        key = 0;

    //update tom's info in the database
    } else if(user.email === "tom608@gmail.com"){
        key = 1;
    }

    //update the email field in database
    database.ref("users/" + key).update({ Email: email })
  
    //update email in firebase authentication
    user.updateEmail(this.state.email).then(function() { 

      this.setState({
        email: user.email
      })
      
    }).catch(function(error) {
      //error
    });
    console.log(user.email)
    
    
  }

  /**
  * Updates the specified user's username field in the database.
  */
  updateUsername(){
    var username = this.state.username;
    var user = auth.currentUser;
    let key = 0;

    //update charly's info in the database
    if (user.email === "charly206@gmail.com"){
        key = 0;

    //update tom's info in the database
    } else if(user.email === "tom608@gmail.com"){
        key = 1;
    }

    database.ref("users/" + key).update({ Username: username })
  
  }

  /**
   * Updates the password in Firebase Authentication and in the specified user's 
   * password field in the database. Not sure if it works with updateEmail() at the
   * same time
   */
  updatePassword(){
    var user = auth.currentUser;
    var newPassword = this.state.password;
    let key = 0;

    //update charly's info in the database
    if (user.email === "charly206@gmail.com"){
        key = 0;

    //update tom's info in the database
    } else if(user.email === "tom608@gmail.com"){
        key = 1;
    }

    //update the password field in database
    database.ref("users/" + key).update({ Password: newPassword })

    user.updatePassword(newPassword).then(function() {
    

    }).catch(function(error) {
    // error
    });
  }

  /**
   * Updates the specified user's address field in the database
   */
  updateAddress(){
    var address = this.state.address;

    var user = auth.currentUser;
    let key = 0;

    //update charly's info in the database
    if (user.email === "charly206@gmail.com"){
        key = 0;

    //update tom's info in the database
    } else if(user.email === "tom608@gmail.com"){
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
      <SafeAreaView style={styles.subcontainer}>
        <ScrollView>
        <Text style={styles.header}>Badger Bytes</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.bigText}>Profile</Text>
        </View>
        <View style={styles.space} />

        <View>
          <Text style={styles.smallText}>Email Address</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#EE8B90"
          onChangeText={(email) => this.setState({email: email })}
          value={this.state.email}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={styles.smallText}>Username</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="#EE8B90"
          onChangeText={(username) => this.setState({username: username})}
          value={this.state.username}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={styles.smallText}>Password</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#EE8B90"
          onChangeText={(password) => this.setState({password: password })}
          value={this.state.password}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={styles.smallText}>Contact Number</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Number"
          placeholderTextColor="#EE8B90"
          onChangeText={(number) => this.setState({ number: number})}
          value={this.state.number + ""}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={styles.smallText}>Address</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Address"
          placeholderTextColor="#EE8B90"
          onChangeText={(address) => this.setState({ address: address })}
          value={this.state.address + ""}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={styles.smallText}>Payment Method</Text>
        </View>
        <View style={styles.space} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <TouchableOpacity style={styles.actionButton} onPress={() => this.saveProfile()}>
          <Text style={{color:"#000000"}}>Save Changes</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.space} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height
  },
  subcontainer: {
    flex: 1,
    backgroundColor: 'lavender',
    alignItems: 'center'
  },
  mainContainer: {
    flex: 1
  },
  scrollViewContainer: {},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: "bold",
    fontSize: 50,
    color: "black",
    marginBottom: 40,
    alignItems: 'center'
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
    color: "black",
    marginBottom: 5,
    marginLeft: 110
  },
  smallText:{
    fontSize: 20,
    fontWeight: "100",
    color: "black",
    marginBottom: 5
  },
  spaceSmall: {
    width: 20,
    height: 10,
  },
  space: {
    width: 20,
    height: 20,
  },
  spaceHorizontal: {
    display: "flex",
    width: 20
  },
  actionButton: {
    width: 100,
    height: 40,
    alignItems: 'center',
    backgroundColor: 'orange',
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10
},
  input: {
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: 'black',
    color: "black",
    borderWidth: 1
  }
  // },
  // inputInline: {
  //   flexDirection: "row",
  //   display: "flex",
  //   width: 200,
  //   padding: 10,
  //   margin: 5,
  //   height: 40,
  //   borderColor: '#c9392c',
  //   borderWidth: 1
  // }
});

export default ProfileView;
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

//import auth and database from firebase
import { auth } from "../Fire";
import { database } from "../Fire";

export default class CreateStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      address: "",
      username: "",
      password: "",
      cfpassword: "",
      uid: "",
      role: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.CreateAccount = this.CreateAccount.bind(this);
    this.writeUserData = this.writeUserData.bind(this);
  }

  /**
   * Creates user account and stores info in database
   */
  handleClick() {
    this.CreateAccount();
  }

  /**
   * Creates an account for a student user and stores
   * their email, password, username, and role in the
   * database.
   */
  CreateAccount() {
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

          this.props.nav.navigate("HomeScreen");
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
   * This method will add the user's username, email, password, and unique key that corresponds
   * with the location of their information in the database.
   */
  writeUserData(uid) {
    var myRef = database.ref("Users/Customers").child(uid);

    //This is how the data will be stored in the database
    var newData = {
      Address: this.state.address,
      Email: this.state.email,
      Username: this.state.username,
      Password: this.state.password,
      Role: "Student",
    };
    myRef.set(newData);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Account Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeaders}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(username) => this.setState({ username: username })}
            value={this.state.username}
          />
          <Text style={styles.inputHeaders}>Email Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email: email })}
            value={this.state.email}
          />
          <Text style={styles.inputHeaders}>Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            autoCapitalize="none"
            onChangeText={(address) => this.setState({ address: address })}
            value={this.state.address}
          />
          <Text style={styles.inputHeaders}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(password) => this.setState({ password: password })}
            value={this.state.password}
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
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={this.handleClick}>
            <Text style={styles.btnText}>Create Account</Text>
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

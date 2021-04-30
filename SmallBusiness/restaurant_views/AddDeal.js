import React from 'react';
import { View,
        Text,
        TextInput,
        StyleSheet,
        TouchableOpacity } from 'react-native';

//import auth and database from firebase
import { auth } from "../Fire";
import { database } from "../Fire";

export default class AddDeal extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
        }

    }

    //saves new deal
    addNewDeal = () =>{
        //writes deal data to database
        this.writeDealData();
    }

    /**Should write deal data to database */
    writeDealData(){
        let currUser = auth.currentUser;
        console.log ("Current user UID: " + currUser.uid)
        
        //makes sure the user can't leave both fields blank
        if(this.state.description == "" || this.state.title == ""){
            alert("Please fill out both fields.");
        }else{
        //path to the specified restaurant's information
        let dealsRef = database.ref("Users/Restaurants/"+currUser.uid).ref.child("Deals");

        //this pushes the deal's title and description under the Deals
        //section of the specified restaurant 
        //it also automatically creates a deals object if there isn't one
        dealsRef.push().set({
            Title: this.state.title,
            Description: this.state.description,
            });

        alert("New Deal Added!");

        //testing
        console.log("TITLE: " + this.state.title);
        console.log("DESCRIPTION: " + this.state.description);
        }
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add Title</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Title"
                    autoCapitalize="none"
                    onChangeText={(title) => this.setState({ title: title })}
                    value={this.state.title}
                ></TextInput>
                <Text style={styles.title} >Add Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    autoCapitalize="none"
                    onChangeText={(description) => this.setState({ description: description })}
                    value={this.state.description}
                ></TextInput>

                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={this.addNewDeal}
                >
                    <Text style={styles.btnText}>Save Deal</Text>
                </TouchableOpacity>
            </View>
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

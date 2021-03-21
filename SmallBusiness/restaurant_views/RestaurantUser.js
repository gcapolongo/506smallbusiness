import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default class RestaurantUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Place",
            location: "Holders",
            rating: "-"
        }
    }

    // event handler for add deal button
    addDeal() {
        console.log("added new deal")
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Restaurant Profile</Text>
                <View style={styles.inputContainer}>
                <Text style={styles.inputHeaders}>Name: {this.state.name}</Text>
                <Text style={styles.inputHeaders}>Location: {this.state.location}</Text>
                <Text style={styles.inputHeaders}>Rating: {this.state.rating}</Text>
            
                <Text style={styles.title}>Deals </Text>
                <TouchableOpacity style={styles.btnStyle}
                                    onPress={this.addDeal}>
                    <Text style={styles.btnText}>Add Deal</Text>
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
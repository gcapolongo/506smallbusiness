import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';

import { Card } from 'react-native-elements'
import business from './smallBusinesses.json'


export default class RestaurantCard extends React.Component {

    constructor(props) {
        super(props);
        this.registerRestaurant = this.registerRestaurant.bind(this);
    }

    registerRestaurant() {
        this.props.nav.navigate("Customer User");
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <Card.Title style={styles.cardTitle}>{this.props.name}</Card.Title>
                    <Card.Divider />
                    <Image
                        resizeMode="cover"
                        source={{ uri: this.props.image }}
                    />
                    <Text style={styles.cardText}>Address: {this.props.address}</Text>
                    <Text style={styles.cardText}>Rating: </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnStyle} onPress={this.registerRestaurant}>
                            <Text style={styles.btnText}>View Deals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, {marginLeft: 20}]}>
                            <Text style={styles.btnText}>Favorite</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
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
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 0
    },
    cardText: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 0
    }
})
import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';


export default class CustomerUser extends React.Component {

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
                    <Text style={styles.inputHeaders}>Name: Mirch Masala</Text>
                    <Text style={styles.inputHeaders}>Location: 449 State St, Madison, WI 53703</Text>
                    <Text style={styles.inputHeaders}>Rating: 3.5</Text>

                    <Text style={styles.title}>Deals</Text>
                    <ScrollView>
                        <Card>
                            <Card.Title style={styles.cardTitle}>25% off entire order</Card.Title>
                            <Card.Divider />
                            <Image
                                resizeMode="cover"
                                source={{ uri: this.props.image }}
                            />
                            <Text style={styles.cardText}>Description: 25% of any order over 10$</Text>
                            <Text style={styles.cardText}>Valid until: 3/31 </Text>
                        </Card>
                        <Card>
                            <Card.Title style={styles.cardTitle}>Any 2 items for 7$ each</Card.Title>
                            <Card.Divider />
                            <Image
                                resizeMode="cover"
                                source={{ uri: this.props.image }}
                            />
                            <Text style={styles.cardText}>Description: Get any two items from select menu options for 7$ each</Text>
                            <Text style={styles.cardText}>Valid until: 3/31 </Text>
                        </Card>
                        <Card>
                            <Card.Title style={styles.cardTitle}>Free side</Card.Title>
                            <Card.Divider />
                            <Image
                                resizeMode="cover"
                                source={{ uri: this.props.image }}
                            />
                            <Text style={styles.cardText}>Description: Get a free side over any order of 25$ or more</Text>
                            <Text style={styles.cardText}>Valid until: 3/31 </Text>
                        </Card>
                    </ScrollView>
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
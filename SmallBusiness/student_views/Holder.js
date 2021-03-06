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

import { Card, ListItem, Button, Icon } from 'react-native-elements'
import business from './smallBusinesses.json'


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        let data = JSON.parse(JSON.stringify(business));
        this.state = {
            businesses: data
        };

        this.registerRestaurant = this.registerRestaurant.bind(this);
    }

    registerRestaurant() {
        this.props.nav.navigate("Restaurant User");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Small Business Deals
                </Text>
                <Text style={styles.subtitle}>
                    Restaurants
                </Text>
                <ScrollView>
                <View style={styles.container}>
                        {this.state.businesses.SmallBusinesses.Businesses.map((item, index) => (
                            <RestaurantCard 
                                key={index} 
                                name={item.Name} 
                                address={item.Address}
                                image={item.photo}
                            />
                        ))}
                </View>
                    {/* <Card>
                        <Card.Title style={styles.cardTitle}>Badger Bytes</Card.Title>
                        <Card.Divider />
                        <Image
                            resizeMode="cover"
                            source={{ uri: 'https://www.google.com/search?q=restaurant+front&sxsrf=ALeKk02554udpLQMcw-Kh0CVt3Qea-enug:1616564571642&tbm=isch&source=iu&ictx=1&fir=lYPtJOtXLsq8OM%252C2ppjzqbkIHU-xM%252C_&vet=1&usg=AI4_-kRMbjQFF1TbeMuD55zdKfdx8ZoHGA&sa=X&ved=2ahUKEwiW87GonMjvAhWBB80KHdZcDsMQ9QF6BAgDEAE&biw=1422&bih=678#imgrc=lYPtJOtXLsq8OM' }}
                        />
                        <Text style={styles.cardText}>Rating</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.btnStyle} onPress={this.registerRestaurant}>
                                <Text style={styles.btnText}>View Deals</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnStyle, {marginLeft: 20}]}>
                                <Text style={styles.btnText}>Favorite</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Card>
                        <Card.Title style={styles.cardTitle}>Little Eats</Card.Title>
                        <Card.Divider />
                        <Image
                            resizeMode="cover"
                            source={{ uri: 'https://www.google.com/search?q=restaurant+front&sxsrf=ALeKk02554udpLQMcw-Kh0CVt3Qea-enug:1616564571642&tbm=isch&source=iu&ictx=1&fir=lYPtJOtXLsq8OM%252C2ppjzqbkIHU-xM%252C_&vet=1&usg=AI4_-kRMbjQFF1TbeMuD55zdKfdx8ZoHGA&sa=X&ved=2ahUKEwiW87GonMjvAhWBB80KHdZcDsMQ9QF6BAgDEAE&biw=1422&bih=678#imgrc=lYPtJOtXLsq8OM' }}
                        />
                        <Text style={styles.cardText}>Rating</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.btnStyle}>
                                <Text style={styles.btnText}>View Deals</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnStyle, {marginLeft: 20}]}>
                                <Text style={styles.btnText}>Favorite</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Card>
                        <Card.Title style={styles.cardTitle}>Eatmor</Card.Title>
                        <Card.Divider />
                        <Image
                            resizeMode="cover"
                            source={{ uri: 'https://www.google.com/search?q=restaurant+front&sxsrf=ALeKk02554udpLQMcw-Kh0CVt3Qea-enug:1616564571642&tbm=isch&source=iu&ictx=1&fir=lYPtJOtXLsq8OM%252C2ppjzqbkIHU-xM%252C_&vet=1&usg=AI4_-kRMbjQFF1TbeMuD55zdKfdx8ZoHGA&sa=X&ved=2ahUKEwiW87GonMjvAhWBB80KHdZcDsMQ9QF6BAgDEAE&biw=1422&bih=678#imgrc=lYPtJOtXLsq8OM' }}
                        />
                        <Text style={styles.cardText}>Rating</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.btnStyle}>
                                <Text style={styles.btnText}>View Deals</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnStyle}>
                                <Text style={styles.btnText}>Favorite</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Card>
                        <Card.Title style={styles.cardTitle}>Snack time</Card.Title>
                        <Card.Divider />
                        <Image
                            resizeMode="cover"
                            source={{ uri: 'https://www.google.com/search?q=restaurant+front&sxsrf=ALeKk02554udpLQMcw-Kh0CVt3Qea-enug:1616564571642&tbm=isch&source=iu&ictx=1&fir=lYPtJOtXLsq8OM%252C2ppjzqbkIHU-xM%252C_&vet=1&usg=AI4_-kRMbjQFF1TbeMuD55zdKfdx8ZoHGA&sa=X&ved=2ahUKEwiW87GonMjvAhWBB80KHdZcDsMQ9QF6BAgDEAE&biw=1422&bih=678#imgrc=lYPtJOtXLsq8OM' }}
                        />
                        <Text style={styles.cardText}>Rating</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.btnStyle}>
                                <Text style={styles.btnText}>View Deals</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnStyle}>
                                <Text style={styles.btnText}>Favorite</Text>
                            </TouchableOpacity>
                        </View>
                    </Card> */}

                </ScrollView>
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
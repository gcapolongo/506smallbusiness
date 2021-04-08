import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';

import {
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    View,
    Dimensions,
    Alert
} from 'react-native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAme_A3WZ1uHIq9SAZFg93AyNzTW84KNVU';
const origin = {
    latitude: 43.073051,
    longitude: -89.401230,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
}
const departure = {
    latitude: 43.073051,
    longitude: -89.401230,
}
const arrival = {
    latitude: 43.075809,
    longitude: -89.400131,
}

const coordinates = [
    {
        latitude: 43.072670,
        longitude: -89.395530,
    },
    {
        latitude: 43.074680,
        longitude: -89.393930,
    },
    {
        latitude: 43.061540,
        longitude: -89.400420
    }
]

export default class Map extends React.Component {

    constructor(props) {
        super(props);
    }

    onPress = () => {
        Alert.alert("Information", "You just clicked a map marker!");
    }

    render() {
        return ( 
            <MapView
            style={styles.mapContainer}
            initialRegion = {origin}
            showsUserLocation = {true}
            >
                {coordinates.map((item, index) => 
                    <MapView.Marker key={index} onPress={this.onPress} coordinate={item} />)}
                <MapViewDirections 
                    origin={departure}
                    destination={arrival}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="red"
                />
            </MapView> 
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
    },
    mapContainer: {
        flex: 1
    }
})
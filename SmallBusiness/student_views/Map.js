import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { database } from '../Fire';

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

        this.state = {
            coordinates: [],
            businessNames: [],
            currentLat: 0,
            currentLong: 0
        }
        this.getLocationData = this.getLocationData.bind(this);
        this.getNewLocation = this.getNewLocation.bind(this);
    }

    /**
     * calls the asynchronous function to grab our initial data from firebase
     * to render the markers. Also gets the initial current location of the user
     * and updates the state
     */
    componentDidMount() {
        this.getLocationData();
        navigator.geolocation.getCurrentPosition(position => {
            // set the current location state every time it changes
            this.setState({
                currentLat: position.coords.latitude,
                currentLong: position.coords.longitude
            })
            console.log("Initial location");
            console.log(this.state.currentLat);
            console.log(this.state.currentLong);
        })
    }

    /**
     * Gets the new location every time the user moves the map
     * or changes location and updates the state
     */
    getNewLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            // set the current location state every time it changes
            this.setState({
                currentLat: position.coords.latitude,
                currentLong: position.coords.longitude
            })
            console.log("New location");
            console.log(this.state.currentLat);
            console.log(this.state.currentLong);
        })
    }

    /**
     * gets the location data of each restaurant from firebase and
     * stores the objects in a state variable for future use
     */
    async getLocationData() {
        console.log("LOCATION DATA");
        let locations = [];
        let name = [];

        var query = database.ref("Users").child("Restaurants").orderByKey();
        query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.val();
                locations.push(key.location);
                name.push(key.Name);
            })
        }).catch(error => { console.log(error) })
        .finally( ret => {
            this.setState({coordinates: locations});
            this.setState({businessNames: name});
            console.log(this.state.businessNames);
            console.log(this.state.coordinates);
        } )
    }

    getDirectionRoute(index) {
        console.log("getDirections called");
    }

    render() {
        return ( 
            <MapView
            style={styles.mapContainer}
            initialRegion = {origin}
            showsUserLocation = {true}
            onRegionChange={this.getNewLocation}
            >
                {this.state.coordinates.map((item, index) => 
                    <MapView.Marker 
                        key={index} 
                        onPress={() => this.getDirectionRoute(index)} 
                        coordinate={item} 
                        title={this.state.businessNames[index]}
                        />)}
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
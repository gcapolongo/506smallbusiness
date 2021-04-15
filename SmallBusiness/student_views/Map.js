import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { database } from '../Fire';

import {
    StyleSheet,
    Alert
} from 'react-native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAme_A3WZ1uHIq9SAZFg93AyNzTW84KNVU';

// initial map view location of Madison
const origin = {
    latitude: 43.073051,
    longitude: -89.401230,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
}

export default class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            coordinates: [],
            businessNames: [],
            currentLat: 0,
            currentLong: 0,
            directions: 0,
            businessLoc: 0
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

    /**
     * Alerts the user of a new route, sets the state of two variables
     * which tell us if we need to find a route and what business the route
     * should go to
     * 
     * @param {*} index - index of the business we are trying to find a route to 
     */
    getDirectionRoute(index) {
        Alert.alert("Getting Directions!", "Finding route to " + 
            this.state.businessNames[index]);
        this.setState({ directions: 1 });
        this.setState({ businessLoc: index });
    }

    render() {

        // holds a directions component for the directions a user
        // wants to retrieve
        let currDirection = <MapViewDirections 
            origin={{ latitude: this.state.currentLat, longitude: this.state.currentLong }}
            destination={this.state.coordinates[this.state.businessLoc]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="red"
        />
        // null component if no directions are to be retrieved
        let noDirection = (null);

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
                {this.state.directions == 1 ? currDirection : noDirection}
            </MapView> 
        )
    }
}

// styles for the Map component
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
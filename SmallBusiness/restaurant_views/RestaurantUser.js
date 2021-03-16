import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class RestaurantUser extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is the restaurant profile screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
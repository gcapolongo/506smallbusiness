import React from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is the homescreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

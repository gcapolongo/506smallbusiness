import React from 'react';
import {
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';

export default class CreateRestaurant extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.nav.navigate("Restaurant User");
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Business Details</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputHeaders}>Business Name:</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder="Name"
                        autoCapitalize="none"
                    />
                    <Text style={styles.inputHeaders}>Address:</Text>
                    <TextInput 
                        style={styles.input}    
                        placeholder="Password"
                        autoCapitalize="none"
                    />
                    <Text style={styles.inputHeaders}>Password:</Text>
                    <TextInput 
                        style={styles.input}    
                        placeholder="Password"
                        autoCapitalize="none"
                    />
                    <Text style={styles.inputHeaders}>Confirm Password:</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={this.handleClick}>
                            
                        <Text style={styles.btnText}>Create Business</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
import React from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

export default class CreateStudent extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.nav.navigate("Login");
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={[styles.title, {fontSize: 32, marginLeft:0}]}>Small Business Deals</Text>
                <Text style={styles.title}>Account Details</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputHeaders}>Username:</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder="Username"
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
                            
                        <Text style={styles.btnText}>Create Account</Text>
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

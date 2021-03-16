import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

export default class LoginScreen extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.registerRestaurant = this.registerRestaurant.bind(this);
    }

    handleLogin() {
        this.props.nav.navigate("HomeScreen");
    }

    createAccount() {
        this.props.nav.navigate("Create Student User")
    }

    registerRestaurant() {
        this.props.nav.navigate("Create Restaurant");
    }
    
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Small Business Deals for College Students
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input} 
                        placeholder="Username"
                        autoCapitalize="none"
                    />
                    <TextInput 
                        style={styles.input}    
                        placeholder="Password"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={this.handleLogin}>
                        
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={this.createAccount}>

                        <Text style={styles.btnText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={this.registerRestaurant}>

                        <Text style={styles.btnText}>Register Restaurant</Text>
                    </TouchableOpacity>
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
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 100
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
        width: 180,
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
    }
})
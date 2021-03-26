import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

export default class EditProfile extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: "Place",
            location: "Holders",
            rating: "-"
        }
    }

    //methoid to handle profile save
    handleSave() {
        //TODO
    }
    
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Edit Profile
                </Text>
                <View style={styles.inputContainer}>

                    <Text style={styles.title}>Name</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder={this.state.name}
                        autoCapitalize="none"
                    />
                    <Text style={styles.title}>Location</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder={this.state.location}
                        autoCapitalize="none"
                    />
                    
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={this.handleSave()}>
                        
                        <Text style={styles.btnText}>Save Changes</Text>
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
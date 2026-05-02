import { 
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";
import { useState } from "react";
import { api } from "../convex/_generated/api";

import { useMutation } from "convex/react";

import Ionicons from "@react-native-vector-icons/ionicons"

export default function SignupScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')

    const register = useMutation(api.users.register)

    const submit = async () => {
        if (!email || !password || !fullName) {
            Alert.alert("Error", "Please fill in all fields!")
            return
        }
        try {
            const result = await register({
                username: email,
                password,
                fullName
            })
        }
        catch (error) {
            Alert.alert("Error", "Unexpected error happen. Please try again!")
            console.log(error)
        }
    }

        
    return (
        <View style={styles.container}>
            {/** 1. Header Section */}
            <View style={styles.header}>
                <Image source={require("../assets/images/Signup.webp")} style={styles.image} />
            </View>

            {/** 2. Form Section */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} placeholder="John Doe" onChangeText={setFullName} />

                <Text style={styles.label}>Email Address</Text>
                <TextInput style={styles.input} placeholder="john@gmail.com" onChangeText={setEmail}/>

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="********" onChangeText={setPassword} />
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>Or</Text>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialIcon}>
                        <Ionicons name="logo-google" size={30} color="#DB4437" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.socialIcon}>
                        <Ionicons name="logo-apple" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIcon}>
                        <Ionicons name="logo-facebook" size={30} color="#4267B2" />
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={submit}>
                        <Text style={styles.linkText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
//copied the signup screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7D7AFF",
        paddingTop: 40,
    },
    header: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "80%",
        height: "70%",
    },
    formContainer: {
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        padding: 30,
    },
    label: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
        marginTop: 15
    },
    input: {
        backgroundColor: "#F0F0F0",
        padding: 15,
        borderRadius: 15,
        fontSize: 16
    },
    loginButton:{
        backgroundColor: "#FFCC00",
        padding: 18,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 30
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    orText: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 18,
        fontWeight: "bold"
    },
    socialRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        backgroundColor: "#F0F0F0",
        padding: 15,
        borderRadius: 15
    },
    socialIcon: {
        backgroundColor: "#F0F0F0",
        padding: 15,
        borderRadius: 15
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        bottom: 30
    },
    linkText: {
        color: "#FFCC00",
        fontWeight: "bold"
    }

});
import React from "react";
import {View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate("Home");
                console.log("Login successful");
            })
            .catch((error) => {
                Alert.alert("Lütfen bilgilerinizi kontrol ediniz");
            });
    };

    return (
        <ScrollView style={{flex:1, backgroundColor:'#000'}}>
            <View >
                <Text style={styles.title}>Giriş Yap</Text>
            </View>
            <View style={{marginTop: 10, alignSelf: 'center'}}>
                <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor={'#363636'} placeholder={"E-mail"}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                ></TextInput>
                <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor={'#363636'} placeholder={"Şifre"}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                ></TextInput>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.buttonitem}
                >
                    <Text style={[styles.buttonText, {marginStart: 0}]}>Giriş Yap</Text>
                </TouchableOpacity>
            </View>
            <View   style={{flexDirection: "row", alignSelf: "center", marginVertical:20}}>
                <Text style={{color: "#F9F5E6", alignSelf: 'center',fontSize:16}}>Hesabınız yok mu?  </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={{fontSize:16, color:'#F9F5E6',fontWeight:'700'}}>Üye Ol </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#f2f2f2",
        alignSelf: "center",
        marginTop: 190,
    },

    inputStyle: {
        width: 300,
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 50,
        marginTop: 20,
        paddingLeft: 20,
    },

    buttonitem: {
        width: 300,
        height: 50,
        backgroundColor: "#363636",
        borderRadius: 50,
        marginTop:30,
        justifyContent: "center",
    },

    buttonText: {
        textAlign: "center",
        color: "#f2f2f2",
        fontWeight: "400",
        fontSize: 18,
    },

});
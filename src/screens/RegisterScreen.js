import * as React from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase-config";
import {useNavigation} from "@react-navigation/native";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import "firebase/firestore";
import {AuthContext} from "../utils";

export default function RegisterScreen() {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                console.log("Kayıt Başarılı!");
                const user = userCredential.user;
                console.log(user);
                const data = {
                    name: name,
                    surname: surname,
                    email: email,
                };
                await setDoc(doc(db, "userInformations", user.uid), data);
                navigation.navigate("Home");
            })
            .catch((error) => {
                alert(error);
            });
    };
    register=( email, password) => {
        console.log("registering user");
    };

    return (
        <ScrollView style={{flex: 1, backgroundColor: "#000"}}>
            <View>
                <Text style={styles.title}>Kayıt Ol</Text>
            </View>
            <View style={{marginTop: 10, alignSelf: "center"}}>
                <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor={"#363636"}
                    placeholder={"Adınız"}
                    value={name}
                    onChangeText={(text) => setName(text)}
                ></TextInput>
                <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor={"#363636"}
                    placeholder={"Soyadınız"}
                    value={surname}
                    onChangeText={(text) => setSurname(text)}
                ></TextInput>
                <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor={"#363636"}
                    placeholder={"E-mail"}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                ></TextInput>
                <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor={"#363636"}
                    placeholder={"Şifre"}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                ></TextInput>
            </View>
            <View style={{alignSelf: "center"}}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {handleCreateAccount(); register({ email, password })  }}
                >
                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>
            </View>
            <View   style={{flexDirection: "row", alignSelf: "center", marginVertical:20}}>
                <Text style={{color: "#F2F2F2", alignSelf: 'center',fontSize:16}}>Hesabınız var mı?  </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{fontSize:16, color:'#F2F2F2',fontWeight:'700'}}>Giriş Yap </Text>
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
        marginTop: 120,
    },

    inputStyle: {
        width: 300,
        height: 50,
        backgroundColor: '#F2F2F2',
        borderRadius: 50,
        marginTop: 20,
        paddingLeft: 20,
    },

    buttonStyle: {
        width: 300,
        height: 50,
        backgroundColor: "#181818",
        borderRadius: 50,
        marginTop:20,
        justifyContent: "center",
    },

    buttonText: {
        textAlign: "center",
        color: "#F2F2F2",
        fontWeight: "400",
        fontSize: 18,
    },
});
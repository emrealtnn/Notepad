import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";



export default function HomeScreen({ navigation }) {
    return (
        <View>
        <Text>Home Screen</Text>
        <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
        />
        <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
        />
        </View>
    );
}
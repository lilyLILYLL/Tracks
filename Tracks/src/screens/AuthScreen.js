import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useContext } from "react";
import { Context } from "../contexts/AuthContext";
import { Spacer } from "../components/Spacer";
import { StatusBar } from "expo-status-bar";
import fonts from "../constants/fonts";
import colors from "../constants/colors";

export const AuthScreen = ({ navigation }) => {
    const { tryLocalSignin } = useContext(Context);

    // useEffect(() => {
    //     tryLocalSignin();
    // }, []);
    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.header}>Tracks</Text>

            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Do you have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                    <Text style={styles.signin}>Login </Text>
                </TouchableOpacity>
                <Text style={styles.text}>or</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.signin}> Sign up</Text>
                </TouchableOpacity>
                <Text>.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        borderRadius: 10,
        marginBottom: 30,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginBottom: 200,
        marginLeft: 15,
    },
    header: {
        fontSize: 80,
        fontWeight: "bold",
        marginBottom: 30,
        fontFamily: fonts.fontFamily,
        color: colors.dark_blue,
    },
    textContainer: {
        flexDirection: "row",
    },
    signin: {
        fontStyle: "italic",
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: colors.icon_color,
        fontFamily: fonts.fontFamily,
        fontSize: 20,
    },
    text: {
        fontFamily: fonts.fontFamily,
        fontSize: 20,
        color: colors.dark_blue,
    },
});

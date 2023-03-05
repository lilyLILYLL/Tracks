import React, { useContext } from "react";
import { TouchableOpacity, SafeAreaView, StyleSheet, Text } from "react-native";
import { Context } from "../contexts/AuthContext";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
export const AccountScreen = () => {
    const { state, signout } = useContext(Context);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={signout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        backgroundColor: colors.dark_blue,
        alignItems: "center",
        padding: 20,
        marginTop: 40,
    },
    buttonText: {
        fontSize: 26,
        color: "white",
        fontFamily: fonts.fontFamily,
    },
    container: {
        flex: 1,
        marginBottom: 150,
        justifyContent: "center",
        alignItems: "center",
    },
});

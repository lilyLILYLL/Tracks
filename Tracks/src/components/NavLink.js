import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../constants/colors";
import fonts from "../constants/fonts";

export const NavLink = ({ navigation, text, nextScreen }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate(nextScreen)}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: colors.dark_blue,
        marginLeft: 5,
        marginTop: 20,
        fontSize: 20,
        fontFamily: fonts.fontFamily,
    },
});

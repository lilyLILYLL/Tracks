import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

export const TrackItem = ({ name, onPress }) => {
    return (
        <View style={styles.box}>
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <Text style={styles.text}>{name}</Text>
                <Ionicons
                    name="arrow-forward-circle-outline"
                    size={30}
                    color={colors.icon_color}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        padding: 10,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 26,
        color: colors.dark_blue,
        fontFamily: "Cochin",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

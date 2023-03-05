import {
    SafeAreaView,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { TrackContext } from "../contexts/TrackContext";
import { TrackItem } from "../components/TrackItem";
import { useIsFocused } from "@react-navigation/native";
import colors from "../constants/colors";

export const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchTracks();
    }, [isFocused]);

    return (
        <SafeAreaView>
            <Text style={styles.header}>Track List</Text>
            <ScrollView style={styles.container}>
                {state.map((item) => {
                    return (
                        <TrackItem
                            key={item._id}
                            name={item.name}
                            onPress={() => {
                                navigation.navigate("Detail", {
                                    track: item,
                                });
                            }}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    header: {
        fontSize: 60,
        fontWeight: "bold",
        marginVertical: 5,
        marginLeft: 20,
        color: colors.dark_blue,
        fontFamily: "Cochin",
    },
    container: {
        marginBottom: 90,
        backgroundColor: colors.input_backgroundColor,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});

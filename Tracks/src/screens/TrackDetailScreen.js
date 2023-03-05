import { SafeAreaView, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import fonts from "../constants/fonts";
import colors from "../constants/colors";

export const TrackDetailScreen = ({ navigation, route }) => {
    const track = route.params.track;
    const initialRegion = track.locations[0].coords;
    const destination = track.locations[track.locations.length - 1].coords;
    return (
        <SafeAreaView>
            <Text style={styles.trackName}>{track.name}</Text>
            <MapView
                initialRegion={{
                    ...initialRegion,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                region={{
                    ...initialRegion,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                style={styles.map}
            >
                <Polyline
                    coordinates={track.locations.map((loc) => loc.coords)}
                />
                <Marker coordinate={initialRegion} pinColor="black" />
                <Marker coordinate={destination} pinColor="red" />
            </MapView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    trackName: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: 10,
        marginHorizontal: 10,
        fontFamily: fonts.fontFamily,
        color: colors.dark_blue,
        alignSelf: "center",
    },
    map: {
        height: 700,
    },
});

import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import MapView, { Polyline, Circle, Marker } from "react-native-maps";
import { LocationContext } from "../contexts/LocationContext";
import { TrackContext } from "../contexts/TrackContext";

export const Map = () => {
    const {
        state: { currentLocation, locations },
    } = useContext(LocationContext);

    if (!currentLocation) {
        return <ActivityIndicator size={20} style={{ marginTop: 200 }} />;
    }

    return (
        <View>
            <MapView
                style={styles.map}
                initialRegion={{
                    ...currentLocation.coords,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
                region={{
                    ...currentLocation.coords,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                <Circle
                    center={{ ...currentLocation.coords }}
                    radius={2}
                    strokeColor="rgba(0,158,255,1.0)"
                    fillColor="rgba(158,158,255,0.7)"
                />
                <Marker coordinate={currentLocation.coords} pinColor="red" />
                <Polyline
                    coordinates={locations.map((loc) => loc.coords)}
                    strokeWidth={1}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 600,
        borderRadius: 10,
    },
});

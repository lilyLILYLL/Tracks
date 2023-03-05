import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import { useSaveTrack } from "../hooks/useSaveTrack";
import colors from "../constants/colors";
import { Entypo } from "@expo/vector-icons";

export const TrackForm = () => {
    const { state, startRecording, stopRecording, changeName } =
        useContext(LocationContext);
    const [saveTrack] = useSaveTrack();
    return (
        <View>
            <View style={styles.trackName}>
                <Text style={styles.label}>TRACK NAME</Text>
                <View style={styles.inputView}>
                    <Entypo name="pencil" size={30} color={colors.icon_color} />
                    <TextInput
                        placeholder="Enter a name track "
                        style={styles.inputText}
                        value={state.name}
                        onChangeText={changeName}
                        autoCorrect="none"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                {state.recording ? (
                    <Text style={styles.buttonText} onPress={stopRecording}>
                        Stop Recording
                    </Text>
                ) : (
                    <Text style={styles.buttonText} onPress={startRecording}>
                        Record
                    </Text>
                )}
            </TouchableOpacity>

            {!state.recording && state.locations.length != 0 ? (
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={saveTrack}>
                        Save
                    </Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    trackName: {
        height: 90,
        width: 370,
        alignSelf: "center",
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 5,
        padding: 10,
        backgroundColor: colors.input_backgroundColor,
    },
    label: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.label_color,
        fontFamily: "Cochin",
    },
    inputView: {
        marginTop: 5,
        flexDirection: "row",
    },
    inputText: {
        color: colors.dark_blue,
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 20,
        fontFamily: "Cochin",
    },
    button: {
        marginBottom: 10,
        backgroundColor: colors.dark_blue,

        marginHorizontal: 20,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: colors.light_blue,
        fontSize: 26,
        fontFamily: "Cochin",
    },
});

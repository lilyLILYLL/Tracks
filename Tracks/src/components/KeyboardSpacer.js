import { View, Text, Keyboard, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export const KeyboardSpacer = ({ onToggle, extraSpace }) => {
    const [keyboardSpace, setKeyboardSpace] = useState(0);
    useEffect(() => {
        const screenHeightWithKeyboardHide = Dimensions.get("window").height;
        try {
            const showListener = Keyboard.addListener(
                "keyboardDidShow",
                (event) => {
                    const screenHeightWithKeyboardShown =
                        event.endCoordinates.screenY;

                    setKeyboardSpace(
                        screenHeightWithKeyboardHide -
                            screenHeightWithKeyboardShown +
                            extraSpace
                    );
                    onToggle(true);
                }
            );
            const hideListener = Keyboard.addListener(
                "keyboardDidHide",
                (event) => {
                    setKeyboardSpace(0);
                    onToggle(false);
                }
            );
            return () => {
                showListener.remove();
                hideListener.remove();
            };
        } catch (err) {
            throw new Error("Something went wrong", err);
        }
    }, []);
    return <View style={[styles.container, { height: keyboardSpace }]}></View>;
};
const styles = StyleSheet.create({
    container: {
        bottom: 0,
        left: 0,
        right: 0,
    },
});

//import "../_mockLocation";
import React, { useContext, useCallback, useState, useRef } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

import { Map } from "../components/Map";
import { LocationContext } from "../contexts/LocationContext";
import { useLocation } from "../hooks/useLocation";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { TrackForm } from "../components/TrackForm";
export const TrackCreateScreen = () => {
    const isFocused = useIsFocused();
    const {
        state: { recording },
        addCurrentLocation,
    } = useContext(LocationContext);

    const callback = useCallback(
        (location) => {
            addCurrentLocation(location, recording);
        },
        [recording]
    );

    const [err] = useLocation(isFocused || recording, callback);
    const [keyboardEnabled, setKeyboardEnabled] = useState(false);
    const screen_ref = useRef(null);
    const handleChangeView = () => {
        screen_ref.current.scrollToEnd({ animated: true });
    };

    return (
        <ScrollView ref={screen_ref} onContentSizeChange={handleChangeView}>
            <Map />
            {err ? <Text>{err.message}</Text> : null}
            <TrackForm />
            <KeyboardSpacer
                onToggle={(keyboardEnabled) =>
                    setKeyboardEnabled(keyboardEnabled)
                }
                extraSpace={0}
            />
        </ScrollView>
    );
};

import { View, Text } from "react-native";
import React, { createContext, useReducer } from "react";

export const LocationContext = createContext();

// dispatch({type:"add_current_location", payload:location})
const reducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return {
                ...state,
                name: "",
                locations: [],
            };
        case "change_name":
            return { ...state, name: action.payload };
        case "add_location":
            return {
                ...state,
                locations: [...state.locations, action.payload],
            };
        case "start_recording":
            return { ...state, recording: true };
        case "stop_recording":
            return { ...state, recording: false };
        case "add_current_location":
            return {
                ...state,
                currentLocation: action.payload,
            };
        default:
            return;
    }
};

export const LocationContextProvider = ({ children }) => {
    // state = {currentLocation:{}, locations:[], reocording: false};
    const [state, dispatch] = useReducer(reducer, {
        currentLocation: null,
        locations: [],
        recording: false,
        name: "",
    });

    const addCurrentLocation = (location, recording) => {
        dispatch({ type: "add_current_location", payload: location });

        if (recording) {
            addLocation(location);
        }
    };
    const startRecording = () => {
        dispatch({ type: "start_recording" });
    };
    const stopRecording = () => {
        dispatch({ type: "stop_recording" });
    };
    const addLocation = (location) => {
        dispatch({ type: "add_location", payload: location });
    };
    const changeName = (name) => {
        dispatch({ type: "change_name", payload: name });
    };
    const reset = () => {
        dispatch({ type: "reset" });
    };

    const locationContextValue = {
        addCurrentLocation,
        stopRecording,
        startRecording,
        changeName,
        reset,
        state,
    };
    return (
        <LocationContext.Provider value={locationContextValue}>
            {children}
        </LocationContext.Provider>
    );
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SpeedDial } from "@rneui/base";
import React, { createContext, useReducer } from "react";
import api from "../data/api";

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch_tracks":
            return action.payload;
        default:
            return state;
    }
};
export const TrackContext = createContext();
export const TrackContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    const fetchTracks = async () => {
        const res = await api.get("/tracks");
        dispatch({ type: "fetch_tracks", payload: res.data });
    };
    const createTrack = async (name, locations) => {
        await api.post("/tracks", { name, locations });
    };

    const TrackContextValue = { state, fetchTracks, createTrack };
    return (
        <TrackContext.Provider value={TrackContextValue}>
            {children}
        </TrackContext.Provider>
    );
};

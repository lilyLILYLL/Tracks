import React, { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import { TrackContext } from "../contexts/TrackContext";
import * as RootNavigation from "../RootNavigation";

export const useSaveTrack = () => {
    const {
        state: { name, locations },
        reset,
    } = useContext(LocationContext);
    const { createTrack } = useContext(TrackContext);

    const saveTrack = () => {
        createTrack(name, locations);
        reset();
        RootNavigation.navigate("Tracks");
    };
    return [saveTrack];
};

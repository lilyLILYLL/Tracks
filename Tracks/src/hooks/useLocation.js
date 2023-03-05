import React, { useState, useEffect, useContext } from "react";
import {
    requestForegroundPermissionsAsync,
    watchPositionAsync,
    Accuracy,
} from "expo-location";
export const useLocation = (shouldTrack, callback) => {
    const [err, setError] = useState(null);

    useEffect(() => {
        let subcriber;
        const startWatching = async () => {
            try {
                const granted = await requestForegroundPermissionsAsync();
                subcriber = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation,
                        // update once every second
                        timeInterval: 1000,
                        // update once every 10 meters
                        distanceInterval: 10,
                    },
                    callback
                );
                console.log(subcriber);
                if (granted.status !== "granted") {
                    throw new Error("Permission is denied!", err);
                }
            } catch (err) {
                setError(err);
            }
        };

        if (shouldTrack) {
            startWatching();
        } else {
            subcriber?.remove();
            subcriber = null;
        }
        // clean up the subcriber
        return () => {
            if (subcriber) {
                subcriber.remove();
            }
        };
    }, [shouldTrack, callback]); // depent on recording

    return [err];
};

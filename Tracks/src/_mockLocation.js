import * as Location from "expo-location";

const tenMeterWithDegrees = 0.000005;

const getLocation = (increment) => {
    return {
        timestamp: 1000000,
        coords: {
            speed: 0,
            heading: 5,
            accuracy: 5,
            altitudeAcuraucy: 5,
            altitude: 5,
            longitude: 150.8939754 + increment * tenMeterWithDegrees,
            latitude: -34.4114007 + increment * tenMeterWithDegrees,
        },
    };
};

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit("Expo.locationChanged", {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter),
    });
    counter++;
}, 2000);

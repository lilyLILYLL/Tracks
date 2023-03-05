import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SignupScreen } from "../screens/SignupScreen";
import { SigninScreen } from "../screens/SigninScreen";
import { TrackDetailScreen } from "../screens/TrackDetailScreen";
import { TrackCreateScreen } from "../screens/TrackCreateScreen";
import { TrackListScreen } from "../screens/TrackListScreen";
import { AccountScreen } from "../screens/AccountScreen";
import { ContextProvider } from "../contexts/AuthContext";
import { navigationRef } from "../RootNavigation";
import { AuthScreen } from "../screens/AuthScreen";
import { LocationContextProvider } from "../contexts/LocationContext";
import { TrackContextProvider } from "../contexts/TrackContext";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
// Track List Stack
const TrackStack = createNativeStackNavigator();
const Tracks = () => {
    return (
        <TrackStack.Navigator initialRouteName="TrackList">
            <TrackStack.Screen
                name="TrackList"
                component={TrackListScreen}
                options={{ headerShown: false }}
            />
            <TrackStack.Screen
                name="Detail"
                component={TrackDetailScreen}
                options={{ headerShown: false }}
            />
        </TrackStack.Navigator>
    );
};

// Main Flow
const Tab = createBottomTabNavigator();
const MainFlow = () => {
    return (
        <Tab.Navigator
            initialRouteName="Create"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Tracks") {
                        iconName = "list";
                    } else if (route.name === "Create") {
                        iconName = "circle-with-plus";
                    } else {
                        iconName = "log-out";
                    }
                    return <Entypo name={iconName} size={40} color={color} />;
                },
                tabBarActiveTintColor: colors.icon_color,
                tabBarInactiveTintColor: "black",
                tabBarStyle: {
                    height: 90,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            })}
        >
            <Tab.Screen
                name="Tracks"
                component={Tracks}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Create"
                component={TrackCreateScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

// login, signup & mainflow
const Stack = createNativeStackNavigator();
export const Navigation = () => {
    return (
        <TrackContextProvider>
            <LocationContextProvider>
                <ContextProvider>
                    <NavigationContainer ref={navigationRef}>
                        <Stack.Navigator initialRouteName="Auth">
                            <Stack.Screen
                                name="Auth"
                                component={AuthScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Signup"
                                component={SignupScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Signin"
                                component={SigninScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="MainFlow"
                                component={MainFlow}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ContextProvider>
            </LocationContextProvider>
        </TrackContextProvider>
    );
};

import React, { createContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { AsyncStorage } from "@react-native-async-storage/async-storage";
import api from "../data/api";
import * as RootNavigation from "../RootNavigation";

export const Context = createContext();

const reducer = (state, action) => {
    // action: {type:"sign_up"||"sign_in", payload:{email, password} }
    switch (action.type) {
        case "alert":
            return { ...state, errorMessage: "Email and Password required!" };
        case "invalid_password":
            return { ...state, errorMessage: "Invalid Password!" };
        case "invalid_email":
            return { ...state, errorMessage: "Invalid Email!" };
        case "message_changes":
            return { ...state, errorMessage: "" };
        case "sign_out":
            return { token: null, errorMessage: "" };
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "sign_up":
            return { token: action.payload, errorMessage: "" };
        default:
            return state;
    }
};
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
const validatePassword = (password) => {
    // password has at lease 6 characters
    return password.length >= 6;
};

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        token: null,
        errorMessage: "",
    });
    console.log(state);

    const signup = async ({ email, password }) => {
        if (email === "" || password === "") {
            dispatch({ type: "alert" });
        } else if (!validateEmail(email)) {
            dispatch({ type: "invalid_email" });
        } else if (!validatePassword(password)) {
            dispatch({ type: "invalid_password" });
        } else {
            try {
                // make request from API Express
                //take a JWT token and store it into the device
                // store it into state object

                const res = await api.post("/signup", { email, password });
                await AsyncStorage.setItem("token", res.data.token);
                dispatch({ type: "sign_up", payload: res.data.token });

                // navigate to "Main Flow Screen" // this is navigation from outside of React => we use n
                RootNavigation.navigate("MainFlow");
            } catch (err) {
                console.log(err);
                dispatch({
                    type: "add_error",
                    payload: "Duplicate Email! Please try again!",
                });
            }
        }
    };
    const signin = async ({ email, password }) => {
        if (email === "" || password === "") {
            dispatch({ type: "alert" });
        } else {
            try {
                const res = await api.post("/signin", { email, password });
                await AsyncStorage.setItem("token", res.data.token);
                dispatch({ type: "sign_up", payload: res.data.token });

                RootNavigation.navigate("MainFlow");
            } catch (err) {
                console.log(err);
                dispatch({
                    type: "add_error",
                    payload: "Email or Password is not correct!",
                });
            }
        }
    };

    const signout = async () => {
        try {
            await AsyncStorage.removeItem("token"); // remove using key
            dispatch({ type: "sign_out" });
            RootNavigation.navigate("Signin");
        } catch (err) {
            console.log(err);
            dispatch({ type: "add_error", payload: "Something went wrong!" });
        }
    };

    const message_changes = () => {
        dispatch({ type: "message_changes" });
    };

    const tryLocalSignin = async () => {
        // check if there is any token stored
        // if yes => managing the state  => navigate to "Main Flow" Screen
        // if no => navigate to "Sign Up" Screen
        const token = await AsyncStorage.getItem("token");
        if (token) {
            dispatch({ type: "sign_up", payload: token });
            RootNavigation.navigate("MainFlow");
        } else {
            RootNavigation.navigate("Signup");
        }
    };

    const contextValue = {
        signup,
        signin,
        state,
        signout,
        message_changes,
        tryLocalSignin,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

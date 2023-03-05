import React, { useContext, useEffect } from "react";
import { AuthForm } from "../components/AuthForm";
import { Context } from "../contexts/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export const SignupScreen = ({ navigation }) => {
    const { signup, message_changes } = useContext(Context);
    const isFocused = useIsFocused();
    useEffect(() => {
        message_changes();
    }, [isFocused]);
    return (
        <AuthForm
            navigation={navigation}
            title="Sign up to continue"
            buttonText="Sign Up"
            navLinkText="Already have an account? Sign In instead."
            nextScreen="Signin"
            onSubmit={signup}
        />
    );
};

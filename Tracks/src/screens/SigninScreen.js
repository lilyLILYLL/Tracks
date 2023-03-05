import React, { useContext, useEffect } from "react";
import { AuthForm } from "../components/AuthForm";
import { Context } from "../contexts/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export const SigninScreen = ({ navigation }) => {
    const { signin, message_changes } = useContext(Context);
    const isFocused = useIsFocused();
    // reset err_messages of state when navigate to other screen
    useEffect(() => {
        message_changes();
    }, [isFocused]);
    return (
        <AuthForm
            navigation={navigation}
            title="Sign in to continue"
            buttonText="Sign In"
            navLinkText="Don't have an account? Go back to sign up."
            nextScreen="Signup"
            onSubmit={signin}
        />
    );
};

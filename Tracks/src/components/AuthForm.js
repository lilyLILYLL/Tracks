import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import { Context as AuthContext } from "../contexts/AuthContext";

import { NavLink } from "./NavLink";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import { KeyboardSpacer } from "./KeyboardSpacer";
import fonts from "../constants/fonts";
export const AuthForm = ({
    navigation,
    title,
    buttonText,
    navLinkText,
    nextScreen,
    onSubmit,
}) => {
    const [keyboardEnabled, setKeyboardEnabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureText, setSecureText] = useState(true);
    const {
        state: { errorMessage },
    } = useContext(AuthContext);

    const password_ref = useRef();
    const scrollViewRef = useRef(null);
    const handleChangeView = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };
    return (
        <ScrollView
            style={styles.container}
            ref={scrollViewRef}
            onContentSizeChange={handleChangeView}
        >
            <View style={styles.content}>
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.header}>Welcome</Text>
                <Text style={styles.title}>{title}</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>EMAIL</Text>
                    <View style={styles.input}>
                        <MaterialIcons name="email" size={30} color="#dc6440" />
                        <TextInput
                            placeholder="email@gmail.com"
                            placeholderTextColor={colors.dark_blue}
                            style={styles.inputText}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => {
                                password_ref.current.focus();
                            }}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>PASSWORD</Text>
                    <View style={styles.input}>
                        <Feather name="unlock" size={30} color="#dc6440" />
                        <TextInput
                            ref={password_ref}
                            placeholder="********"
                            placeholderTextColor={colors.dark_blue}
                            style={styles.inputText}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={secureText}
                        />
                        {secureText ? (
                            <Entypo
                                name="eye"
                                size={25}
                                onPress={() => setSecureText(!secureText)}
                                color={colors.icon_color}
                            />
                        ) : (
                            <Entypo
                                name="eye-with-line"
                                size={25}
                                onPress={() => setSecureText(!secureText)}
                                color={colors.icon_color}
                            />
                        )}
                    </View>
                </View>
                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSubmit({ email, password })}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
                <NavLink
                    navigation={navigation}
                    text={navLinkText}
                    nextScreen={nextScreen}
                />
            </View>
            <KeyboardSpacer
                onToggle={(keyboardEnabled) =>
                    setKeyboardEnabled(keyboardEnabled)
                }
                extraSpace={150}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        //backgroundColor: colors.backgoundColor,
        flex: 1,
        marginTop: 40,
    },
    content: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    logo: {
        width: "30%",
        height: "18%",
        borderRadius: 4,
        marginVertical: 20,
    },
    header: {
        fontSize: 70,
        fontWeight: "bold",
        color: colors.dark_blue,
        marginTop: 40,
        fontFamily: fonts.fontFamily,
    },
    title: {
        color: colors.dark_blue,
        marginBottom: 10,
        fontFamily: fonts.fontFamily,
        fontSize: 20,
    },
    inputContainer: {
        padding: 10,
        borderRadius: 15,
        marginTop: 20,
        backgroundColor: colors.input_backgroundColor,
        flexDirection: "column",
        paddingHorizontal: 25,
    },
    label: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.label_color,
        marginBottom: 3,
        fontFamily: fonts.fontFamily,
    },
    input: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },

    inputText: {
        marginLeft: 15,
        fontSize: 22,
        flex: 1,
        color: colors.dark_blue,
        fontWeight: "bold",
        fontFamily: fonts.fontFamily,
    },
    button: {
        borderRadius: 10,
        backgroundColor: colors.dark_blue,
        alignItems: "center",
        padding: 20,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 26,
        color: "white",
        fontFamily: fonts.fontFamily,
    },
    errorMessage: {
        color: "red",
        marginTop: 20,
        fontFamily: fonts.fontFamily,
        fontSize: 18,
        marginLeft: 5,
    },
});

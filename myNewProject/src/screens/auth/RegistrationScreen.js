import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import db from "../../firebase/config";
import * as ImagePicker from "expo-image-picker";
const add = require("../../assets/add.png");
const remove = require("../../assets/remove.png");

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { nanoid } from "@reduxjs/toolkit";

const bgImage = require("../../assets/Photo-BG.jpg");

const initialState = {
  login: "",
  email: "",
  password: "",
};
export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusedUser, setFocusedUser] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  console.log("avatar", avatar);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const submitKeyboard = async () => {
    const avatarImg = await uploadAvatar();
    dispatch(authSignUpUser(state, avatarImg));
    setState(initialState);
    KeyboardHide();
    setShowPassword(false);
  };
  const handleSubmit = async () => {
    const avatarImg = await uploadAvatar();
    dispatch(authSignUpUser(state, avatarImg));
    setState(initialState);
    setShowPassword(false);
  };

  const uploadAvatar = async () => {
    try {
      console.log("avatar", avatar);
      if (avatar) {
        const avatarURL = avatar;
        const response = await fetch(avatarURL);
        const file = await response.blob();
        console.log("file", file);
        const avatarId = nanoid();
        await db.storage().ref(`avatarImage/${avatarId}`).put(file);
        const processedAvatar = await db
          .storage()
          .ref("avatarImage")
          .child(avatarId)
          .getDownloadURL();
        return processedAvatar;
      } else {
        const processedAvatar = await db
          .storage()
          .ref("avatarImage")
          .child("businessman-character-avatar-isolated_24877-60111.webp")
          .getDownloadURL();
        return processedAvatar;
      }
    } catch (error) {
      console.log("error.message", error.message);
      console.log("error.code", error.code);
    }
  };

  const addAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });
    console.log("result", result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={{ ...styles.bgimage, marginBottom: isShowKeyboard ? -250 : 0 }}
        source={bgImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View
              style={{
                ...styles.registrationContainer,
                flex: isShowKeyboard ? 0.8 : 0.73,
                marginBottom: isShowKeyboard ? 250 : 0,
              }}
              onSubmitEditing={submitKeyboard}
            >
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                  {avatar && (
                    <Image source={{ uri: avatar }} style={styles.avatarImg} />
                  )}
                  {!avatar ? (
                    <TouchableOpacity
                      onPress={addAvatar}
                      style={styles.avatarBtn}
                    >
                      <Image source={add} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setAvatar(null);
                      }}
                      style={styles.avatarBtn}
                    >
                      <Image source={remove} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Регистрация</Text>
              </View>
              <TextInput
                value={state.name}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
                placeholder="Логин"
                style={focusedUser ? styles.inputFocused : styles.input}
                onFocus={() => {
                  setFocusedUser(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setFocusedUser(false);
                }}
              />
              <TextInput
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                placeholder="Адрес электронной почты"
                placeholderTextColor={"#BDBDBD"}
                keyboardType={"email-address"}
                style={focusedEmail ? styles.inputFocused : styles.input}
                onFocus={() => {
                  setFocusedEmail(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setFocusedEmail(false);
                }}
              />
              <View style={styles.passwordInput}>
                <TextInput
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  placeholder="Пароль"
                  secureTextEntry={showPassword}
                  style={focusedPassword ? styles.inputFocused : styles.input}
                  onFocus={() => {
                    setFocusedPassword(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setFocusedPassword(false);
                  }}
                />
                {state.password && (
                  <Text
                    style={styles.passwordBtn}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? "Показать" : "Спрятать"}
                  </Text>
                )}
              </View>
              {!isShowKeyboard && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.registrationButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.registrationText}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              )}
              <View style={styles.containerForInput}>
                {!isShowKeyboard && (
                  <Pressable
                    style={styles.signInBtn}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.signInText}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "flex-end",
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  inputFocused: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bgimage: {
    flex: 1,
  },
  registrationContainer: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  registrationButton: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
    alignItems: "center",
    borderRadius: 100,
    marginTop: 45,
  },
  registrationText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    marginBottom: 33,
    marginTop: 30,
  },
  signInBtn: {
    marginTop: 16,
    marginBottom: 40,
  },
  signInText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
  },
  passwordBtn: {
    position: "absolute",
    top: "30%",
    right: 35,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  passwordInput: { position: "relative" },
  avatarWrapper: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    position: "relative",
    marginTop: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarImg: {
    position: "absolute",
    top: 0,
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatarBtn: { position: "absolute", bottom: 10, right: -11.5 },
});

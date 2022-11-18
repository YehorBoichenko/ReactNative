import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const bgImage = require("../assets/Photo-BG.jpg");

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [borderInput, setBorderInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setBorderInput(null);
  };

  const handleSubmit = () => {
    console.log("state", state);
    setstate(initialState);
    setShowPassword(false);
  };

  const keyboardSubmit = () => {
    console.log("state", state);
    setstate(initialState);
    keyboardHide();
    setShowPassword(false);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={{ ...styles.image, marginBottom: isShowKeyboard ? -250 : 0 }}
          source={bgImage}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 250 : 0,
            }}
            onSubmitEditing={keyboardSubmit}
          >
            {/* <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            > */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Войти</Text>
            </View>
            <View>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    borderInput === "Адреса електронної пошти"
                      ? "#FF6C00"
                      : "#E8E8E8",
                }}
                placeholder={"Адрес электронной почты"}
                secureTextEntry={true}
                placeholderTextColor={"#BDBDBD"}
                keyboardType={"email-address"}
                value={state.email}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("Адреса електронної пошти");
                }}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={styles.passwordInput}>
              <TextInput
                placeholder={"Пароль"}
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={!showPassword}
                style={{
                  ...styles.input,
                  borderColor: borderInput === "Пароль" ? "#FF6C00" : "#E8E8E8",
                }}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("Пароль");
                }}
                value={state.password}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
              />
              {state.password && (
                <Text
                  style={styles.passwordBtn}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? "Спрятать" : "Показать"}
                </Text>
              )}
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.underBtnText}>
                  Нет аккаунта? Зарегестрироваться
                </Text>
              </View>
            </View>
            {/* </KeyboardAvoidingView> */}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
  },
  image: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#f0f8ff",
    marginHorizontal: 16,
    padding: 16,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "left",
    color: "#212121",
  },
  form: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  passwordInput: {
    position: "relative",
    marginTop: 20,
    marginBottom: 32,
  },
  passwordBtn: {
    position: "absolute",
    top: "35%",
    right: 35,
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    marginTop: 11,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    padding: 16,
    fontSize: 16,
    lineHeight: 19,
  },
  btnTitle: {
    color: "#f0f8ff",
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    marginBottom: 33,
    marginTop: 32,
  },
  headerTitle: {
    // fontFamily: "Roboto-BoldItalic",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  underBtnText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 144,
  },
});

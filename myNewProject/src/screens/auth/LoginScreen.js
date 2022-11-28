import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

const bgImage = require("../../assets/Photo-BG.jpg");
export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const submitKeyboard = () => {
    dispatch(authSignInUser(state));
    setstate(initialState);
    keyboardHide();
    setShowPassword(false);
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
                ...styles.containerForRegistration,
                flex: isShowKeyboard ? 0.5 : 0.56,
                marginBottom: isShowKeyboard ? 250 : 0,
              }}
              onSubmitEditing={submitKeyboard}
            >
              <View style={styles.containerForInput}>
                <Text style={styles.text}>Войти</Text>
              </View>
              <TextInput
                value={state.email}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
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
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                  placeholder="Пароль"
                  placeholderTextColor={"#BDBDBD"}
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
                  style={styles.LogBTN}
                  onPress={submitKeyboard}
                >
                  <Text style={styles.LogText}>Вход</Text>
                </TouchableOpacity>
              )}
              <View style={styles.containerForInput}>
                {!isShowKeyboard && (
                  <Pressable
                    style={styles.loginBtn}
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.loginText}>
                      Нет акаунта? Зарегистрироваться
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
  containerForInput: {
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
  containerForRegistration: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  LogBTN: {
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
  LogText: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    color: "#FFFFFF",
  },
  text: {
    fontSize: 30,
    marginBottom: 33,
    marginTop: 30,
    fontFamily: "Roboto_500Medium",
  },
  loginBtn: {
    marginTop: 16,
    marginBottom: 40,
  },
  loginText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  passwordBtn: {
    position: "absolute",
    top: "30%",
    right: 35,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto_400Regular",
    color: "#1B4371",
  },
  passwordInput: { position: "relative" },
});

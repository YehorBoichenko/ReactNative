import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import AppLoading from "expo-app-loading";
import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });
  const routing = useRoute(true);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}

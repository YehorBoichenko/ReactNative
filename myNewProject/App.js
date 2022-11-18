import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import LoginScreen from "./components/LoginScreen";
import RegistrationScreen from "./components/RegistrationScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <RegistrationScreen />
    </>
  );
}

import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

const HomePage = createStackNavigator();

const PostsScreen = () => {
  return (
    <HomePage.Navigator>
      <HomePage.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomePage.Screen
        name="Comment"
        component={CommentsScreen}
        options={{
          headerShown: false,
        }}
      />

      <HomePage.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomePage.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;

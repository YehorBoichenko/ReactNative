import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import IconButton from "../../components/buttonIcons";
import db from "../../firebase/config";

const HomeScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  console.log("posts", posts);
  const [allComments, setAllComments] = useState([]);
  console.log("allComments", allComments);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("user-posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const getAllComments = async () => {
    await db
      .firestore()
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
    getAllComments();
  }, []);

  const findId = (id) =>
    allComments.filter(({ postId }) => id === postId).length;

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerPost}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.containerButton}>
              <View style={{ flexDirection: "row" }}>
                <IconButton type="comment" />
                <TouchableOpacity
                  style={styles.btnComents}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <Text style={styles.text}>{findId(item.id)}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton type="map" />
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                >
                  <Text
                    style={{ ...styles.text, textDecorationLine: "underline" }}
                  >
                    {item.locationName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    justifyContent: "flex-start",
    marginTop: 5,
  },
  containerPost: {
    marginBottom: 10,
    marginHorizontal: 16,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 3,
    color: "#212121",
  },
});

export default HomeScreen;

import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

  useEffect(() => {
    getBlogPosts(); // This calls the function when app is reloaded or restarted

    const listener = navigation.addListener("didFocus", () => { // This calls the function whenever we return to IndexScreen.
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };

  }, [])

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Show", { id: item.id })}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <EvilIcons name="trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <EvilIcons name="plus" size={38} color="white" />
      </TouchableOpacity>
    ),
  };
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 100,
    height: 40,
    backgroundColor: "dodgerblue",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  row: {
    backgroundColor: "#339966",
    opacity: 0.9,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "grey",
  },
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    color: "white",
    fontSize: 34,
  },
});

export default IndexScreen;

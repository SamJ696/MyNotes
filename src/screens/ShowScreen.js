import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  // console.log(navigation.getParam("id"))
  const { state } = useContext(Context);

  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam("id")
  );

  return (
    <View>
      <Text style={styles.text}>Title</Text>
      <View style={styles.heading}>
        <Text style={styles.display}>{blogPost.title}</Text>
      </View>
      <Text style={styles.text}>Content</Text>
      <View style={styles.heading}>
        <Text style={styles.display}>{blogPost.content}</Text>
      </View>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <EvilIcons
          name="pencil"
          size={30}
          color="white"
          style={{ marginRight: 7 }}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  heading: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 3,
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 10,
  },
  display: {
    marginLeft: 5,
    fontSize: 17,
  }
});

export default ShowScreen;

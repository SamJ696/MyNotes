import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const BlogPostForm = ({ initialValues, onSubmit }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Enter Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content</Text>
      <TextInput
        multiline
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSubmit(title, content)}
      >
        <Text style={styles.text}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: "",
        content: ""
    }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 18,
    padding: 5,
    margin: 5,
  },

  label: {
    fontSize: 22,
    marginBottom: 10,
    marginLeft: 5,
    marginTop: 5,
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    width: 110,
    height: 50,
    backgroundColor: "gainsboro",
  },
  text: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15,
    margin: 2,
  },
});

export default BlogPostForm;

import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload; // Not adding new but replacing the whole list to display.

    case "edit_blogpost":
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          return action.payload;
        } else {
          return blogPost;
        }
      });

    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts"); // Anything inserted here will be concat with the baseURL.
    // response.data = // // 
    dispatch({ type: "get_blogposts", payload: response.data });
  }
}

const addBlogPost = (dispatch) => {
  // Without API adding blogpost
  // return (title, content, callback) => {
  //   dispatch({ type: "add_blogpost", payload: { title, content } });
  //   if (callback) callback(); //To avoid error if callback function is not provided.
  // };

  // With API adding blogpost
  return async (title,content, callback) => {
    await jsonServer.post("/blogposts", { title, content });
    if (callback) callback();
  }
};

const editBlogPost = (dispatch) => {
  // return (id, title, content, callback) => {
  //   dispatch({ type: "edit_blogpost", payload: { id, title, content } });
  //   if (callback) callback(); // To avoid error.
  // };

  // With API Code.
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callback) callback();
  }
};

const deleteBlogPost = (dispatch) => {
  // return (id) => {
  //   // dispatch({ type: "delete_blogpost", payload: id });
  // };

  // With API Code.
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  }
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);

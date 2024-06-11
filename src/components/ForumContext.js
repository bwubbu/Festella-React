import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        if (Array.isArray(response.data)) {
          const groupedPosts = groupPostsByCategory(response.data);
          setPosts(groupedPosts);
        } else {
          console.error("Error: Data fetched is not an array");
        }
      } catch (error) {
        console.error("Error fetching forum posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (post) => {
    try {
      const response = await axios.post("http://localhost:5000/posts/create", post);
      const newPost = response.data;
      const timeCategory = getCategory(newPost.category);
      setPosts((prevPosts) => {
        const newPosts = { ...prevPosts };
        if (!newPosts[timeCategory]) {
          newPosts[timeCategory] = [];
        }
        newPosts[timeCategory].push(newPost);
        return newPosts;
      });
    } catch (error) {
      console.error("Error adding forum post", error);
    }
  };

  return (
    <ForumContext.Provider value={{ posts, addPost, loading }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForumPosts = () => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForumPosts must be used within a ForumProvider');
  }
  return context;
};

const groupPostsByCategory = (posts) => {
  const grouped = {};
  posts.forEach(post => {
    const category = getCategory(post.category);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(post);
  });
  return grouped;
};

const getCategory = (category) => {
  switch (category) {
    case 'option1':
      return "Past";
    case 'option2':
      return "Ongoing";
    case 'option3':
      return "Future";
    case 'option4':
      return "General";
    default:
      return "General";
  }
};

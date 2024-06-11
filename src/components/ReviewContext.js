import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5000/reviews/${eventId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const addReview = async (reviewData) => {
    try {
      const response = await axios.post("http://localhost:5000/reviews/add", reviewData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setReviews([...reviews, response.data]);
    } catch (error) {
      console.error("Error adding review", error);
    }
  };

  return (
    <ReviewContext.Provider value={{ reviews, fetchReviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewContext);

// src/components/ReviewList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ReviewList.css';

const ReviewList = ({ eventId }) => {
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState('most-recent');

  useEffect(() => {
    fetchReviews();
  }, [eventId]);

  useEffect(() => {
    sortReviews(sortOption);
  }, [sortOption, reviews]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/${eventId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const sortReviews = (option) => {
    let sortedReviews = [...reviews];
    if (option === 'lowest-rated') {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    } else if (option === 'highest-rated') {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else {
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setReviews(sortedReviews);
  };

  return (
    <div className="container-event-review">
      <section id="review-list">
        <div id="review-sort">
          <label htmlFor="sort-review">
            <p>Sort By:</p>
          </label>
          <br />
          <select
            id="sort-review"
            name="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option id="sort-review-lowest" value="lowest-rated">
              Lowest Rated
            </option>
            <option id="sort-review-recent" value="most-recent">
              Most Recent
            </option>
            <option id="sort-review-highest" value="highest-rated">
              Highest Rated
            </option>
          </select>
        </div>
        <div id="reviews" className="reviews-container">
          {reviews.map((review) => (
            <div className="review" key={review._id}>
              <div className="username">{review.username}</div>
              <div className="rating" data-rating={review.rating}>
                Rating: {review.rating}/5
              </div>
              <div className="media">
                {review.images.map((image, index) => (
                  <img src={image} alt={`Image ${index + 1}`} key={index} />
                ))}
                {review.videos.map((video, index) => (
                  <video controls key={index}>
                    <source src={video} type="video/mp4" />
                  </video>
                ))}
              </div>
              <div className="comments">{review.comments.join('<br>')}</div>
              <div className="date">Date: {review.date}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewList;

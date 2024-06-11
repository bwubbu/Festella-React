import React, { useEffect, useState } from 'react';
import { useReviews } from '../components/ReviewContext';
import '../styles/ReviewList.css';

const ReviewList = ({ eventId }) => {
  const { reviews, fetchReviews } = useReviews();
  const [sortOption, setSortOption] = useState('lowest-rated');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchReviews(eventId);
  }, [eventId, fetchReviews]);

  const sortedReviews = () => {
    switch (sortOption) {
      case 'lowest-rated':
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case 'highest-rated':
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case 'most-recent':
        return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return reviews;
    }
  };

  const reviewsToDisplay = sortedReviews().slice(0, showMore ? reviews.length : 3);

  return (
    <div className="page-content">
      <div className="header-container">
        <h2 className="review-header">Event Reviews</h2>
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
            {reviewsToDisplay.map((review) => (
              <div className="review" key={review._id}>
                <div className="username">@{review.username}</div>
                <div className="rating">
                  Rating: {review.rating}/5 <span role="img" aria-label="star">⭐</span>
                </div>
                <div className="media">
                  {review.images.map((image, index) => (
                    <img src={`data:image/png;base64,${image}`} alt={`Media ${index + 1}`} key={index} />
                  ))}
                </div>
                <div className="comments">
                  <span className="comment-label">Comment:</span> {review.comment}
                </div>
                <div className="date">Date: {new Date(review.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
          {reviews.length > 3 && (
            <button className="show-more-button" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default ReviewList;

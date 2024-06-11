import React, { useState, useContext } from 'react';
import '../styles/ReviewForm.css';
import { useReviews } from '../components/ReviewContext';
import { AuthContext } from '../components/AuthContext';

const ReviewForm = ({ eventId }) => {
  const { addReview } = useReviews();
  const { user } = useContext(AuthContext);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const handleImage = (e) => {
    setReviewForm({ ...reviewForm, images: e.target.files });
  };

  const handleRatingClick = (rating) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('eventId', eventId);
    formData.append('username', user.username);
    formData.append('rating', reviewForm.rating);
    formData.append('comment', reviewForm.comment);
    for (const image of reviewForm.images) {
      formData.append('images', image);
    }
    try {
      await addReview(formData);
      alert('Review submitted successfully!');
      console.log('Review submitted successfully!');
      setReviewForm({ rating: 0, comment: '', images: [] });
    } catch (error) {
      alert('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    }
  };

  return (
    <section id="review-form">
      <h4>Share your experiences here</h4>
      <br />
      <form id="submit-review-form" onSubmit={handleSubmit}>
        <label htmlFor="star-rating">
          <p>Rating:</p>
        </label>
        <div className="rating-container">
          <h1>{reviewForm.rating}</h1>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleRatingClick(index + 1)}
                onMouseEnter={() => setReviewForm({ ...reviewForm, hoveredRating: index + 1 })}
                onMouseLeave={() => setReviewForm({ ...reviewForm, hoveredRating: 0 })}
                className={`fa fa-star ${reviewForm.rating > index || reviewForm.hoveredRating > index ? 'checked' : ''}`}
              ></span>
            ))}
          </div>
        </div>
        <br />
        <label htmlFor="comment">
          <p>Review:</p>
        </label>
        <textarea
          id="review-text"
          name="comment"
          rows="4"
          required
          value={reviewForm.comment}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="images" className="label">
          <p>Upload Images:</p>
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImage}
        />
        <br />
        <br />
        <button type="submit" className="submit">
          <p>Submit Review</p>
        </button>
      </form>
    </section>
  );
};

export default ReviewForm;

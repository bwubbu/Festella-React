import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReviewForm.css';

const ReviewForm = ({ eventId }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleMouseEnter = (index) => {
    setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrls = await Promise.all(images.map(image => uploadFile(image)));
    const videoUrls = await Promise.all(videos.map(video => uploadFile(video)));

    const newReview = {
      eventId,
      username: 'New User', // Replace with actual username from auth system
      rating,
      images: imageUrls,
      videos: videoUrls,
      comments: [reviewText],
      date: new Date().toISOString().split('T')[0],
    };

    try {
      await axios.post('/api/reviews', newReview);
      // Handle successful submission
    } catch (error) {
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
          <h1>{rating}</h1>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleRatingClick(index + 1)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`fa fa-star ${rating > index || hoveredRating > index ? 'checked' : ''}`}
              ></span>
            ))}
          </div>
        </div>
        <br />
        <label htmlFor="review">
          <p>Review:</p>
        </label>
        <textarea
          id="review-text"
          name="review"
          rows="4"
          required
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
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
          onChange={(e) => setImages([...e.target.files])} // Updated
        />
        <br />
        <br />
        <label htmlFor="videos" className="label">
          <p>Upload Videos:</p>
        </label>
        <input
          type="file"
          id="videos"
          name="videos"
          accept="video/*"
          multiple
          onChange={(e) => setVideos([...e.target.files])} // Updated
        />
        <br />
        <br />
        <button type="submit" className="submit">
          Submit Review
        </button>
      </form>
    </section>
  );
};

export default ReviewForm;

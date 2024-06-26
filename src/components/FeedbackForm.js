import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ user }) => {
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/feedback/submit', { category, rating, comments }, {
        headers: { Authorization: `Bearer ${user.tokenId}` }
      });
      alert('Feedback submitted');
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Product Features">Product Features</option>
        <option value="Product Pricing">Product Pricing</option>
        <option value="Product Usability">Product Usability</option>
      </select>
      <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
      <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;

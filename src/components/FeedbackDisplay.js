import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackDisplay = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/feedback/aggregate');
      setFeedback(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {feedback.map(item => (
        <div key={item._id}>
          <h3>{item._id}</h3>
          <p>Average Rating: {item.avgRating}</p>
          <p>Number of Feedbacks: {item.count}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackDisplay;

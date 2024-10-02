import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './CSS/Feedback.css'; 

const AddFeedback = ({ id }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const cusid = localStorage.getItem('cusid'); // or sessionStorage.getItem('cusid')

    useEffect(() => {
        fetchFeedbacks();
    }, [id]);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/getmessage?itemId=${id}`);
            if (response.data.success) {
                setFeedbacks(response.data.feedbacks);
            } else {
                console.error('Failed to fetch feedbacks:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const submitFeedback = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/createmessage', {
                cusid: cusid,  // Use the cusid retrieved from localStorage or sessionStorage
                id: id,
                comment
            });

            if (response.status === 200) {
                const newFeedback = {
                    _id: response.data.response._id,
                    comment,
                    email: response.data.response.email 
                };
                setFeedbacks([...feedbacks, newFeedback]);
                setComment('');
                setSuccessMessage('Feedback submitted successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        }
    };

    return (
        <div id="feedback-section">
            <h3>Feedback</h3>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div id="feedback-list">
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <div key={feedback._id}>
                            <strong>{feedback.email}</strong>: {feedback.comment}
                        </div>
                    ))
                ) : (
                    <p>No feedback available.</p>
                )}
            </div>
            <form id="feedback-form" onSubmit={submitFeedback}>
                <textarea
                    id="feedback-comment"
                    placeholder="Leave your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default AddFeedback;

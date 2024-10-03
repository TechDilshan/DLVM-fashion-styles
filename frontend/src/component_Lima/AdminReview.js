import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/AdminReview.css';

const AdminReview = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filteredFeedbacks = feedbacks.filter(feedback => feedback.id !== null && feedback.id !== undefined);

    // Then process or display only the filtered feedback
    filteredFeedbacks.forEach(feedback => {
        console.log(`Customer ID: ${feedback.cusid}, Item ID: ${feedback.id}, Comment: ${feedback.comment}`);
    });


    // Fetch feedbacks when component mounts
    useEffect(() => {
        axios
            .get('http://localhost:3001/api/getallfeedback')
            .then(response => {
                console.log('API Response:', response.data); // Check the structure of response
                if (Array.isArray(response.data)) {
                    setFeedbacks(response.data); // Ensure it's an array before setting state
                } else {
                    console.error('Unexpected data format:', response.data);
                    setError('Unexpected data format from the API.');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the feedbacks:', error);
                setError('Failed to fetch feedback data.');
                setLoading(false);
            });
    }, []);

    // Handle loading and error states
    if (loading) {
        return <div>Loading feedbacks...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="admin-review-container">
            <h1>User Feedbacks</h1>
            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Item ID</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.length > 0 ? (
                        feedbacks.map((feedback) => (
                            <tr key={feedback._id}>
                                <td>{feedback.cusid || 'N/A'}</td>
                                <td>{feedback.id || 'N/A'}</td>
                                <td>{feedback.rating || 'N/A'}</td>
                                <td>{feedback.comment || 'No comment'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No feedback available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReview;

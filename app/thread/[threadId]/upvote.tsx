'use client'
import React, { useState } from 'react';
interface UpvoteProps {
    initialUpvotes: number
}
const UpvoteButton: React.FC<UpvoteProps> = ({ initialUpvotes }) => {
    const [upvoteCount, setUpvoteCount] = useState(initialUpvotes);

    const handleUpvote = () => {
        setUpvoteCount(upvoteCount + 1);
        // Add API call logic here if needed
    };

    return (
        <button
            onClick={handleUpvote}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M5 15l7-7 7 7"></path>
            </svg>
            <span>Upvote ({upvoteCount})</span>
        </button>
    );
};

export default UpvoteButton;
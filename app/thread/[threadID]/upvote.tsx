'use client'
import React, { useState } from 'react';
import {errorToast} from "@/app/login/components";
interface UpvoteProps {
    initialUpvotes: number
    threadId: string
}
const UpvoteButton: React.FC<UpvoteProps> = ({ initialUpvotes,threadId }) => {
    const [upvoteCount, setUpvoteCount] = useState(initialUpvotes);
    const [isVoted, setIsVoted] = useState(false);
    const handleUpvote = async () => {
        if (!isVoted) {
            try {
                const res = await fetch(`/api/thread/${threadId}/upvote`, {
                    method: "POST",
                });
                console.log(res);
                const json = await res.json();
                if (json.message) {
                    errorToast(json.message);
                    return;
                }
                setUpvoteCount(upvoteCount + 1);
                setIsVoted(true);
                return;

            } catch (e) {
                if (e instanceof Error) {
                    throw Error(e.message);
                }
            }

        } else {
            errorToast("You have already voted.")
        }
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
"use client";
import React, { useState } from "react";
import { errorToast } from "@/app/login/components";

interface UpvoteProps {
  initialUpvotes: number;
  threadId: string;
}

const UpvoteButton: React.FC<UpvoteProps> = ({ initialUpvotes, threadId }) => {
  const [upvoteCount, setUpvoteCount] = useState(initialUpvotes);
  const [isVoted, setIsVoted] = useState(false);
  const handleUpvote = async () => {
    if (!isVoted) {
      try {
        const res = await fetch(`/api/thread/${threadId}/upvote`, {
          method: "POST",
        });
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
      errorToast("You have already voted.");
    }
    // Add API call logic here if needed
  };

  return (
    <button
      onClick={handleUpvote}
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <path d="M5 15l7-7 7 7"></path>
      <span>Upvote ({upvoteCount})</span>
    </button>
  );
};

export default UpvoteButton;

"use client";

import React, { useState } from "react";

export default function PostModal({ post, onClose }) {
  const [upvotes, setUpvotes] = useState(post?.upvotes || 0);
  const [voted, setVoted] = useState(post?.voted || false);
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleUpvote = () => {
    if (!voted) {
      setUpvotes((prev) => prev + 1);
      setVoted(true);
    } else {
      setUpvotes((prev) => prev - 1);
      setVoted(false);
    }
  };

  const handlePostComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: Date.now(),
      text: newComment,
    };

    setComments((prevComments) => [...prevComments, newCommentData]);
    setNewComment("");
  };

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-5xl p-8 shadow-2xl relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Upvote Section (Fixed Header) */}
        <div className="top-0 bg-white z-10 border-b border-gray-300 pb-4 mb-4">
          <div className="flex gap-8">
            <div className="flex items-center">
              <div
                onClick={handleUpvote}
                className={`flex flex-col items-center text-black text-sm gap-1 border p-4 rounded-lg px-5 cursor-pointer
                ${voted ? "bg-gray-100 border-blue-700" : "bg-white border-gray-200"}
                hover:bg-gray-50 transition`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="w-5 h-5"
                >
                  <path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path>
                </svg>
                <label className="text-lg">{upvotes}</label>
              </div>
            </div>

            {/* Title and Description */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold">{post.title}</h2>
              <p className="text-gray-500 text-lg">{post.description}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div>
          {/* Additional Information Section */}
          <ul className="space-y-3">
            {post.articles?.map((article, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-3"
              >
                <span>{article.title}</span>
                <button className="text-blue-500 hover:underline">
                  Copy link
                </button>
              </li>
            ))}
          </ul>

          {/* Post Details Section */}
          <div className="mt-8">
            <p>
              <strong>Status:</strong>
              <span className="ml-2 border border-blue-500 text-blue-700 px-3 py-1 rounded">
                {post.status}
              </span>
            </p>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-3 mt-3">
              {post.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="border border-blue-500 text-blue-700 px-3 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-10 border-t border-gray-300 pt-6">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-100 p-4 rounded-md mb-4"
              >
                <p className="text-gray-700">💬 {comment.text}</p>
              </div>
            ))}

            {/* Post a Comment Section */}
            <div className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <button
                onClick={handlePostComment}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

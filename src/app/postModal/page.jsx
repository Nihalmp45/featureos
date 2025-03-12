"use client"
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import usePostStore from "../api/store/store";
import { X } from "lucide-react"; // For the close icon

export default function PostModal({ post, onClose }) {
  const { upvotePost, posts } = usePostStore(); // Fetching upvote functionality and posts from the store
  const [localPost, setLocalPost] = useState(null); // State to store the post details
  const [comments, setComments] = useState([]); // State to store comments for the post
  const [newComment, setNewComment] = useState(""); // State for new comment input
  const [user, setUser] = useState(null); // State to store the user details

  // Load comments and user data when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser); // Set user from localStorage

    // Find the post from the list of posts by matching the ID
    const updatedPost = posts.find((p) => p.id === post?.id);
    if (updatedPost) {
      setLocalPost(updatedPost);
      
      // Load comments from localStorage or initialize an empty array if none found
      const storedComments = JSON.parse(localStorage.getItem(`comments-${post?.id}`)) || [];
      setComments(storedComments);
    }
  }, [posts, post?.id]); // Re-run when posts or post id changes

  // Function to save comments to localStorage
  const saveCommentsToLocalStorage = (comments) => {
    localStorage.setItem(`comments-${post?.id}`, JSON.stringify(comments)); // Save updated comments to localStorage
  };

  // Function to handle posting a new comment
  const handlePostComment = () => {
    if (newComment.trim() === "") return; // Do not post empty comment

    // Create new comment object
    const newCommentData = {
      id: `user-${Date.now()}-${Math.random()}`, // Unique ID using Date.now() and Math.random()
      text: newComment,
      profilePic: user
        ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}` // Use user's email for avatar
        : "/default-avatar.png", // Default avatar if user is not available
    };

    const updatedComments = [...comments, newCommentData]; // Add new comment to the existing ones
    setComments(updatedComments); // Update the local state with the new comment
    setNewComment(""); // Clear the new comment input

    // Save updated comments in localStorage
    saveCommentsToLocalStorage(updatedComments);
  };

  // Function to handle upvoting the post
  const handleUpvote = () => {
    if (!localPost) return; // Do nothing if the post is not found

    if (localPost.voted) {
      toast.error("You can only vote once for this post!"); // Show error if already voted
      return;
    }

    upvotePost(localPost.id); // Call the upvote function from the store
    toast.success("Voted successfully!"); // Show success toast on successful vote
  };

  // Return empty div if no post is found
  if (!localPost) {
    return <div></div>;
  }

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal if clicked outside
    >
      <div
        className="bg-white rounded-lg w-full max-w-5xl p-8 shadow-2xl relative max-h-[80vh] overflow-y-auto mx-4 sm:mx-0"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing if clicked inside
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="top-0 bg-white z-10 border-b border-gray-300 pb-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div className="flex items-center justify-center sm:justify-start">
              <div
                onClick={handleUpvote} // Trigger upvote on click
                className={`flex flex-col items-center cursor-pointer text-black text-sm gap-1 border p-4 rounded-lg px-5
                ${localPost.voted ? "bg-gray-100 border-blue-700" : "bg-white border-gray-200"}`}
              >
                {/* Upvote Icon */}
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
                <label className="text-lg">{localPost.upvotes}</label> {/* Show the number of upvotes */}
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold">{localPost.title}</h2>
              <p className="text-gray-500 text-lg mt-2">{localPost.description}</p>

              {/* Tags Section */}
              {localPost.tags && localPost.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {localPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-4">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-100 p-4 rounded-md mb-4 flex items-start gap-3"
              >
                {/* Profile image for the comment */}
                {comment.profilePic && (
                  <img
                    src={comment.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                )}
                <p className="text-gray-700 flex-1">💬 {comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}

          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            <button
              onClick={handlePostComment} // Post the comment when clicked
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

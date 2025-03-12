import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import usePostStore from "../api/store/store";
import { X } from "lucide-react"; // For the close icon

export default function PostModal({ post, onClose }) {
  const { upvotePost, posts } = usePostStore();
  const [localPost, setLocalPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null); // Added user state

  // Load comments when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const updatedPost = posts.find((p) => p.id === post?.id);
    if (updatedPost) {
      setLocalPost(updatedPost);
      
      // Load comments from localStorage, or set an empty array if not found
      const storedComments = JSON.parse(localStorage.getItem(`comments-${post?.id}`)) || [];
      setComments(storedComments);
    }
  }, [posts, post?.id]);

  // Function to save comments to localStorage
  const saveCommentsToLocalStorage = (comments) => {
    localStorage.setItem(`comments-${post?.id}`, JSON.stringify(comments));
  };

  const handlePostComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: `user-${Date.now()}-${Math.random()}`, // Ensure uniqueness by combining Date.now and Math.random
      text: newComment,
      profilePic: user
        ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`
        : "/default-avatar.png",
    };

    const updatedComments = [...comments, newCommentData];
    setComments(updatedComments);
    setNewComment("");

    // Save the updated comments to localStorage
    saveCommentsToLocalStorage(updatedComments);
  };

  const handleUpvote = () => {
    if (!localPost) return;

    if (localPost.voted) {
      toast.error("You can only vote once for this post!");
      return;
    }

    upvotePost(localPost.id);
    toast.success("Voted successfully!");
  };

  if (!localPost) {
    return <div></div>;
  }

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-5xl p-8 shadow-2xl relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="top-0 bg-white z-10 border-b border-gray-300 pb-4 mb-4">
          <div className="flex gap-8">
            <div className="flex items-center">
              <div
                onClick={handleUpvote}
                className={`flex flex-col items-center cursor-pointer text-black text-sm gap-1 border p-4 rounded-lg px-5
                ${localPost.voted ? "bg-gray-100 border-blue-700" : "bg-white border-gray-200"}`}
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
                <label className="text-lg">{localPost.upvotes}</label>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-4xl font-bold">{localPost.title}</h2>
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
                {/* Only show profile image for comments added in this session */}
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
              onClick={handlePostComment}
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

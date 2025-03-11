import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import PostModal from "../postModal/page"; // Import the PostModal component

const fetchPosts = async () => {
  const response = await fetch("/api/data");
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch posts");
  return data;
};

export default function Roadmap() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const [localPosts, setLocalPosts] = useState([]);
  const [votedPosts, setVotedPosts] = useState(new Set());
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (data) setLocalPosts(data);
  }, [data]);

  const handleUpvote = (id) => {
    if (votedPosts.has(id)) {
      toast.error("You can only vote once for this post!");
      return;
    }

    setLocalPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, upvotes: post.upvotes + 1, voted: true }
          : post
      )
    );

    setVotedPosts((prev) => new Set(prev).add(id));
    toast.success("Voted successfully!");
  };

  const handlePostClick = (post) => {
    console.log("Post clicked:", post);  // Check if this logs correctly
    setSelectedPost(post);
  };
  

  const renderLane = (laneName, status, color, icon) => (
    <div
      key={laneName}
      className="border-[1px] bg-gray-100 border-gray-100 rounded-lg p-4 shadow-md"
    >
      <h2
        className={`font-bold text-lg mb-4 ${color} border-b-4 border-gray-100 pb-1 flex items-center gap-2 w-full`}
      >
        {icon && (
          <div
            style={{
              background: icon.color,
              mask: `url(${icon.url}) no-repeat center / contain`,
              WebkitMask: `url(${icon.url}) no-repeat center / contain`,
              height: "14px",
              width: "14px",
            }}
          ></div>
        )}
        {laneName}
      </h2>
      {localPosts?.filter((item) => item.status === status).length > 0 ? (
        localPosts
          .filter((item) => item.status === status)
          .map((post) => (
            <div
              key={post.id}
              className="bg-white p-3 rounded-md mb-3 border border-gray-200 shadow-sm flex items-center gap-4 sm:gap-6 cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              {/* Upvote Section */}
              <div
                className={`flex flex-col items-center text-black text-sm gap-1 border p-2 rounded-lg px-3 cursor-pointer 
          ${
            post.voted
              ? "bg-gray-100 border-blue-700"
              : "bg-white border-gray-200"
          }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpvote(post.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="w-3 h-3 shrink-0"
                >
                  <path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path>
                </svg>
                <label>{post.upvotes}</label>
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] md:text-[18px] font-normal">
                    {post.title}
                  </h3>
                </div>
                <div className="mt-1">
                  <span className="bg-white border-gray-300 border text-gray-600 text-xs px-2 py-1 rounded-full">
                    {post.lane}
                  </span>
                </div>
              </div>
            </div>
          ))
      ) : (
        <p className="text-gray-400">No items available</p>
      )}
    </div>
  );

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-4 
        p-6 
        min-h-screen
      "
    >
      <Toaster position="bottom-right" /> {/* Toast for notifications */}
      {renderLane("Planned", "Planned", "text-pink-500", {
        url: "https://assets.production.skcript.com/featureos/app-assets/icons/bold/crosshair-bold.svg",
        color: "#EC4899",
      })}
      {renderLane("In Progress", "In Progress", "text-yellow-500", {
        url: "https://assets.production.skcript.com/featureos/app-assets/icons/bold/cooking-pot-bold.svg",
        color: "#FFAA00",
      })}
      {renderLane("Completed", "Completed", "text-green-500", {
        url: "https://assets.production.skcript.com/featureos/app-assets/icons/bold/flag-checkered-bold.svg",
        color: "#059669",
      })}
      {/* Integrated PostModal Component */}
      <PostModal
        key={selectedPost?.id}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}

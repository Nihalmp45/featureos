"use client"
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import PostModal from "../postModal/page"; // Modal for displaying post details
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import usePostStore from "../api/store/store"; // Zustand store for managing posts

// Function to fetch posts from the API
const fetchPosts = async () => {
  const response = await fetch("/api/data");
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch posts");
  return data;
};

// Sortable post item component for each post in the roadmap
function SortablePostItem({ post, onUpvote, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: post.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef} // Assigning the ref for DnD
      style={style}
      {...attributes} // Drag event listeners
      {...listeners} // Sortable event listeners
      className="bg-white p-3 rounded-md mb-3 border border-gray-200 shadow-sm flex items-center gap-4 sm:gap-6 cursor-grab touch-manipulation"
      onClick={(e) => {
        if (!transform) onClick(post); // Open post modal on click
      }}
    >
      {/* Upvote button */}
      <div
        className={`flex flex-col items-center text-black text-sm gap-1 border p-2 rounded-lg px-3 cursor-pointer ${
          post.voted ? "bg-gray-100 border-blue-700" : "bg-white border-gray-200"
        }`}
        onClick={(e) => {
          e.stopPropagation(); // Preventing event from bubbling
          onUpvote(post.id); // Call upvote function
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="w-3 h-3 shrink-0">
          <path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path>
        </svg>
        <label>{post.upvotes}</label>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] sm:text-[18px] font-normal">{post.title}</h3> {/* Post title */}
        </div>
        <div className="mt-1">
          {/* Post status label */}
          <span className="bg-white border-gray-300 border text-gray-600 text-xs px-2 py-1 rounded-full">{post.lane}</span>
        </div>
      </div>
    </div>
  );
}

// Droppable lane component for each status category (Planned, In Progress, Completed)
function DroppableLane({ laneName, status, color, icon, posts, onUpvote, onPostClick }) {
  return (
    <div className="border-[1px] bg-gray-100 border-gray-100 rounded-lg p-4 shadow-md min-h-[200px]">
      <h2 className={`font-bold text-lg mb-4 ${color} border-b-[2px] border-gray-200 pb-1 flex items-center gap-2 w-full`}>
        {/* Lane icon */}
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
      {/* Display posts in the lane */}
      {posts.length > 0 ? (
        <SortableContext items={posts.map((post) => post.id)} strategy={verticalListSortingStrategy}>
          {posts.map((post) => (
            <SortablePostItem key={post.id} post={post} onUpvote={onUpvote} onClick={onPostClick} />
          ))}
        </SortableContext>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 border border-gray-200 rounded-lg bg-gray-50">
          <div className="text-gray-400 text-3xl mb-2">☰</div>
          <p className="text-gray-400">No posts found</p>
        </div>
      )}
    </div>
  );
}

export default function Roadmap({ selectedTag }) {
  // Fetch posts using react-query
  const { data, error, isLoading } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  const { posts: localPosts, setPosts, updatePostStatus, upvotePost } = usePostStore(); // Using Zustand for state management
  const [votedPosts, setVotedPosts] = useState(new Set()); // Track posts that have been upvoted
  const [selectedPost, setSelectedPost] = useState(null); // Track the selected post for modal display
  const [activeId, setActiveId] = useState(null); // Track the active (dragged) post ID

  // DnD sensors configuration
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), // Pointer sensor with distance constraint
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }) // Keyboard sensor for accessibility
  );

  useEffect(() => {
    // Filter posts based on selected tag
    if (data) {
      const filteredPosts = selectedTag ? data.filter((post) => post.tags.includes(selectedTag)) : data;
      setPosts(filteredPosts); // Update Zustand store with filtered posts
    }
  }, [data, selectedTag, setPosts]);

  // Function to handle upvote for a post
  const handleUpvote = (id) => {
    const post = localPosts.find((post) => post.id === id);
    if (post.voted) {
      toast.error("You can only vote once for this post!");
      return;
    }
    upvotePost(id); // Call the Zustand action to upvote the post
    toast.success("Voted successfully!");
  };

  // Function to handle post click for opening the modal
  const handlePostClick = (post) => setSelectedPost(post);

  // Define lanes (status categories)
  const lanes = [
    { id: "Planned", name: "Planned", color: "text-pink-500", icon: { url: "icon-url", color: "#EC4899" } },
    { id: "In Progress", name: "In Progress", color: "text-yellow-500", icon: { url: "icon-url", color: "#FFAA00" } },
    { id: "Completed", name: "Completed", color: "text-green-500", icon: { url: "icon-url", color: "#059669" } },
  ];

  // Function to find the lane for a given post
  const findContainerLane = (id) => {
    const post = localPosts.find((post) => post.id === id);
    return post ? post.status : null;
  };

  // Handle drag start event
  const handleDragStart = (event) => setActiveId(event.active.id);

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }
    const activeContainer = findContainerLane(active.id);
    const overLane = lanes.find((lane) => localPosts.some((post) => post.status === lane.id && post.id === over.id));
    const overContainer = overLane ? overLane.id : findContainerLane(over.id);

    if (activeContainer !== overContainer) {
      updatePostStatus(active.id, overContainer); // Update the post's status based on its new lane
      const post = localPosts.find((p) => p.id === active.id);
      toast.success(`Moved "${post.title}" to ${overContainer}`); // Show success message
    }

    setActiveId(null); // Reset active ID after drag
  };

  const activePost = activeId ? localPosts.find((post) => post.id === activeId) : null;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 min-h-screen">
        <Toaster position="bottom-right" /> {/* Toast notifications */}
        {/* Render the lanes and their posts */}
        {lanes.map((lane) => (
          <DroppableLane
            key={lane.id}
            laneName={lane.name}
            status={lane.id}
            color={lane.color}
            icon={lane.icon}
            posts={localPosts.filter((post) => post.status === lane.id)}
            onUpvote={handleUpvote}
            onPostClick={handlePostClick}
          />
        ))}
        <DragOverlay>
          {/* Display dragged post as overlay */}
          {activeId && activePost && (
            <div className="bg-white p-3 rounded-md border border-blue-400 shadow-lg flex items-center gap-4 sm:gap-6 max-w-md opacity-90">
              <div className="flex flex-col items-center text-black text-sm gap-1 border p-2 rounded-lg px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="w-3 h-3 shrink-0">
                  <path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path>
                </svg>
                <label>{activePost.upvotes}</label>
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] sm:text-[18px] font-normal">{activePost.title}</h3>
                <div className="mt-1">
                  <span className="bg-white border-gray-300 border text-gray-600 text-xs px-2 py-1 rounded-full">{activePost.lane}</span>
                </div>
              </div>
            </div>
          )}
        </DragOverlay>

        <PostModal key={selectedPost?.id} post={selectedPost} onClose={() => setSelectedPost(null)} /> {/* Post modal */}
      </div>
    </DndContext>
  );
}

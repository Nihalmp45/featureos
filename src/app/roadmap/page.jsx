import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import PostModal from "../postModal/page";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import usePostStore  from "../api/store/store"

const fetchPosts = async () => {
  const response = await fetch("/api/data");
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch posts");
  return data;
};

// Sortable Post Item Component
function SortablePostItem({ post, onUpvote, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-md mb-3 border border-gray-200 shadow-sm flex items-center gap-4 sm:gap-6 cursor-pointer touch-manipulation"
      onClick={(e) => {
        // Only trigger click if not dragging
        if (!transform) {
          onClick(post);
        }
      }}
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
          onUpvote(post.id);
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
  );
}

// Container for each lane
function DroppableLane({ laneName, status, color, icon, posts, onUpvote, onPostClick }) {
  return (
    <div
      className="border-[1px] bg-gray-100 border-gray-100 rounded-lg p-4 shadow-md min-h-[200px]"
    >
      <h2
  className={`font-bold text-lg mb-4 ${color} border-b-[2px] border-gray-200 pb-1 flex items-center gap-2 w-full`}
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
      
      {posts.length > 0 ? (
        <SortableContext items={posts.map(post => post.id)} strategy={verticalListSortingStrategy}>
          {posts.map((post) => (
            <SortablePostItem 
              key={post.id} 
              post={post} 
              onUpvote={onUpvote} 
              onClick={onPostClick} 
            />
          ))}
        </SortableContext>
      ) : (
        <p className="text-gray-400">No items available</p>
      )}
    </div>
  );
}

export default function Roadmap() {
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { posts: localPosts, setPosts, updatePostStatus, upvotePost } = usePostStore();
  const [votedPosts, setVotedPosts] = useState(new Set());
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeId, setActiveId] = useState(null);

  // Configure the sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (data) setPosts(data);
}, [data, setPosts]);

const handleUpvote = (id) => {
  const post = localPosts.find(post => post.id === id);

  if (post.voted) {
    toast.error("You can only vote once for this post!");
    return;
  }

  upvotePost(id);
  toast.success("Voted successfully!");
};

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // Lane configuration
  const lanes = [
    {
      id: "Planned",
      name: "Planned",
      color: "text-pink-500",
      icon: {
        url: "https://assets.production.skcript.com/featureos/app-assets/icons/bold/crosshair-bold.svg",
        color: "#EC4899",
      },
    },
    {
      id: "In Progress",
      name: "In Progress",
      color: "text-yellow-500",
      icon: {
        url: "https://assets.production.skcript.com/featureos/app-assets/icons/bold/cooking-pot-bold.svg",
        color: "#FFAA00",
      },
    },
    {
      id: "Completed",
      name: "Completed",
      color: "text-green-500",
      icon: {
        url: "https://assets.production.skcript.com/featureos/app-assets/icons/bold/flag-checkered-bold.svg",
        color: "#059669",
      },
    },
  ];

  // Find which lane contains a post
  const findContainerLane = (id) => {
    const post = localPosts.find(post => post.id === id);
    return post ? post.status : null;
  };

  // Handle drag start
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    // Find the containers for the source and destination
    const activeContainer = findContainerLane(active.id);
    // Find the destination lane
    const overLane = lanes.find(lane => {
      return localPosts.filter(post => post.status === lane.id)
                      .some(post => post.id === over.id);
    });
    
    const overContainer = overLane ? overLane.id : findContainerLane(over.id);
    
    if (activeContainer !== overContainer) {
      // Update the post's status
      updatePostStatus(active.id, overContainer);
      
      // Show success notification
      const post = localPosts.find(p => p.id === active.id);
      toast.success(`Moved "${post.title}" to ${overContainer}`);
    }
    
    setActiveId(null);
  };

  // Find the currently active post
  const activePost = activeId ? localPosts.find(post => post.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
        <Toaster position="bottom-right" />
        
        {lanes.map(lane => (
          <DroppableLane
            key={lane.id}
            laneName={lane.name}
            status={lane.id}
            color={lane.color}
            icon={lane.icon}
            posts={localPosts.filter(post => post.status === lane.id)}
            onUpvote={handleUpvote}
            onPostClick={handlePostClick}
          />
        ))}
        
        {/* Drag Overlay */}
        <DragOverlay>
          {activeId && activePost ? (
            <div className="bg-white p-3 rounded-md border border-blue-400 shadow-lg flex items-center gap-4 sm:gap-6 max-w-md opacity-90">
              <div className="flex flex-col items-center text-black text-sm gap-1 border p-2 rounded-lg px-3">
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
                <label>{activePost.upvotes}</label>
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] md:text-[18px] font-normal">
                  {activePost.title}
                </h3>
                <div className="mt-1">
                  <span className="bg-white border-gray-300 border text-gray-600 text-xs px-2 py-1 rounded-full">
                    {activePost.lane}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
        
        {/* Integrated PostModal Component */}
        <PostModal
          key={selectedPost?.id}
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      </div>
    </DndContext>
  );
}
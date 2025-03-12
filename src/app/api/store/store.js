import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Creating a Zustand store for managing posts
const usePostStore = create(
  devtools((set) => ({
    // Initial state of posts
    posts: [],

    // Action to set posts in the store
    setPosts: (posts) => set({ posts }),

    // Action to update the status of a post
    updatePostStatus: (id, newStatus) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, status: newStatus } : post // Update the post status
        ),
      })),

    // Action to upvote a post
    upvotePost: (id) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id
            ? { ...post, upvotes: post.upvotes + 1, voted: true } // Increment upvotes and mark as voted
            : post
        ),
      })),
  }))
);

export default usePostStore;

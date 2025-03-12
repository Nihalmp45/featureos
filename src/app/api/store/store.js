import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const usePostStore = create(
  devtools((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    updatePostStatus: (id, newStatus) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, status: newStatus } : post
        ),
      })),
    upvotePost: (id) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id
            ? { ...post, upvotes: post.upvotes + 1, voted: true }
            : post
        ),
      })),
  }))
);

export default usePostStore;

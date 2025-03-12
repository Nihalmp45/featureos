import { create } from 'zustand';

const usePostStore = create((set) => ({
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
}));
export default usePostStore
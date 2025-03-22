import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { IPost, PostsContextType } from "@/app/types";

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("https://blog-posts-hori.onrender.com/post");
        setPosts(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [posts]);

  return (
    <PostsContext.Provider value={{ posts, loading, error, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts deve ser usado dentro de um PostsProvider");
  }
  return context;
};

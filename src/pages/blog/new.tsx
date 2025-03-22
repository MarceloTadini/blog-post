import axios from "axios";
import FormPost from "@/app/components/FormPost";
import { IPost } from "@/app/types";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import { usePosts } from "@/app/context/PostsContext";

export default function NewPostPage() {
  const {accessToken, isAuthenticated} = useAuth();
  const {fetchPosts} = usePosts();

  const handleCreatePost = async (postData: IPost) => {
    try {
      await axios.post("https://blog-posts-hori.onrender.com/post", postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      fetchPosts();

      toast.success("Post adicionado com sucesso!"); 
      
    } catch (err) {
      console.error("Erro ao adicionar post", err);
      toast.error("Erro ao adicionar post, tente novamente!");
    }
  };

  if (!isAuthenticated) return <p className="text-center mt-10">Necessário fazer o Login para cadastrar um novo Post</p>;

  return <FormPost onSubmit={handleCreatePost} />;
}

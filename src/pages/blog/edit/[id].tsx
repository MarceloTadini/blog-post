import { useRouter } from "next/router"; 
import axios from "axios";
import FormPost from "@/app/components/FormPost";
import { useAuth } from "@/app/context/AuthContext";
import { usePosts } from "@/app/context/PostsContext";
import { IPost } from "@/app/types";
import { toast } from "react-toastify";

export default function EditPostPage() {
  const router = useRouter();
  const { id: postId } = router.query; 
  const {accessToken, isAuthenticated} = useAuth();
  const {loading, posts, setPosts} = usePosts();

  const handleUpdatePost = async (updatedData: IPost) => {

    try {
      await axios.put(`https://blog-posts-hori.onrender.com/post/${postId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? { ...post, ...updatedData } : post))
      );

      toast.success("Post editado com sucesso!"); 
    
    } catch (err) {
      console.error("Erro ao editar post", err);
      toast.error("Erro ao editar post, tente novamente!");
    }

    
  };

  if (loading) return <p className="text-center">Carregando...</p>;
  if (!isAuthenticated) return <p className="text-center mt-10">Necessário fazer o Login para editar um Post</p>;

  const post = postId ? posts.find((post) => post._id === postId) : null;

  return post ? <FormPost initialData={post} onSubmit={handleUpdatePost} /> : <p className="text-center">Post não encontrado.</p>;
}

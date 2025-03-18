import { useRouter } from "next/router"; 
import axios from "axios";
import FormPost from "@/app/components/FormPost";
import { useAuth } from "@/app/context/AuthContext";
import { usePosts } from "@/app/context/PostsContext";
import { IPost } from "@/app/types";

export default function EditPostPage() {
  const router = useRouter();
  const { id: postId } = router.query; 
  const {accessToken, isAuthenticated} = useAuth();
  const {loading, posts} = usePosts();

  const handleUpdatePost = async (updatedData: IPost) => {
    await axios.put(`https://blog-posts-hori.onrender.com/post/${postId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  if (loading) return <p className="text-center">Carregando...</p>;
  if (!isAuthenticated) return <p className="text-center mt-10">Necessário fazer o Login para editar um Post</p>;

  const post = posts.find((post) => post._id === postId);

  return post ? <FormPost initialData={post} onSubmit={handleUpdatePost} /> : <p className="text-center">Post não encontrado.</p>;
}

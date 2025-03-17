import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import axios from "axios";
import FormPost from "@/app/components/FormPost";

export default function EditPostPage() {
  const router = useRouter();
  const { id: postId } = router.query; 
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (postId) {
      axios.get(`https://blog-posts-hori.onrender.com/post/${postId}`)
        .then((res) => {
          setPostData(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }

    async function fetchToken() {
      try {
        const tokenResponse = await axios.get("/api/token");
        if (tokenResponse.data.access_token) {
          setAccessToken(tokenResponse.data.access_token);
        } else {
          router.push("/login"); // Redireciona se não estiver logado
        }
      } catch (error) {
        router.push("/login"); // Redireciona se houver erro ao obter o token
      }
    }

    fetchToken();
  }, [postId]);

  const handleUpdatePost = async (updatedData: any) => {
    await axios.put(`https://blog-posts-hori.onrender.com/post/${postId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  if (loading) return <p className="text-center">Carregando...</p>;

  return postData ? <FormPost initialData={postData} onSubmit={handleUpdatePost} /> : <p className="text-center">Post não encontrado.</p>;
}

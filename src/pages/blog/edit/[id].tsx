import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import axios from "axios";
import FormPost from "@/app/components/FormPost";

export default function EditPostPage() {
  const router = useRouter();
  const { id: postId } = router.query; 
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [postId]);

  const handleUpdatePost = async (updatedData: any) => {
    await axios.put(`https://blog-posts-hori.onrender.com/post/${postId}`, updatedData);
  };

  if (loading) return <p className="text-center">Carregando...</p>;

  return postData ? <FormPost initialData={postData} onSubmit={handleUpdatePost} /> : <p className="text-center">Post não encontrado.</p>;
}

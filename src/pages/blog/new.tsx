import axios from "axios";
import { useRouter } from "next/navigation";
import FormPost from "@/app/components/FormPost";
import { IPost } from "@/app/types";
import { useAuth } from "@/app/context/AuthContext";

export default function NewPostPage() {
  const router = useRouter();
  const {accessToken, isAuthenticated} = useAuth();

  const handleCreatePost = async (postData: IPost) => {
    if (!accessToken) return;

    await axios.post("https://blog-posts-hori.onrender.com/post", postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  if (!isAuthenticated) return <p className="text-center mt-10">Necessário fazer o Login para cadastrar um novo Post</p>;

  return <FormPost onSubmit={handleCreatePost} />;
}

import axios from "axios";
import FormPost from "@/app/components/FormPost";

export default function NewPostPage() {
  const handleCreatePost = async (postData: any) => {
    await axios.post("https://blog-posts-hori.onrender.com/post", postData);
  };

  return <FormPost onSubmit={handleCreatePost} />;
}

export interface IPost{
  _id?: string;
  title: string;
  author: string;
  content: string;
  intro: string;
  imageUrl: string;
  videoUrl: string;
}

export interface IFormRegisterUser{
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IErrorInputTextProps {
  children?: React.ReactNode;
}

export interface FormPostProps {
  initialData?: IPost;
  onSubmit: (postData: IPost) => Promise<void>;
}

export interface PostsContextType {
  posts: IPost[];
  fetchPosts: () => Promise<void>;
  loading: boolean;
  error: boolean;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
}

export interface YoutubeVideoProps {
  videoUrl: string;
}

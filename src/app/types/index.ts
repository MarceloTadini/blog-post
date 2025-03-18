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

export interface PostsContextType {
  posts: IPost[];
  loading: boolean;
  error: boolean;
  setPosts: (posts: IPost[]) => void;
}

export interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
}
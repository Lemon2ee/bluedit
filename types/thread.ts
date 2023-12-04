import { DateTime } from "next-auth/providers/kakao";

export interface Thread {
  id: string;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
  createdAt: DateTime;
  upvote: number;
}

export interface Comment {
  id: string;
  content: string;
  comment: DateTime;
  authorId: string;
  threadID: string;
}

type Role = "USER" | "ADMIN"; // Replace with your actual roles if different

interface Profile {
  id: string;
  bio: string;
  profilePicture: string;
  bannerPicture: string;
  displayName: string;
  userId: string;
}

interface User {
  id: string;
  username: string;
  password: string; // Consider security implications of exposing this field
  role: Role;
  image: string | null;
  profile: Profile | null;
}

export interface ThreadWithProfile {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  upvote: number | null;
  author: User;
}

import { DateTime } from "next-auth/providers/kakao";
import { User } from "next-auth";

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

export interface ThreadWithProfile {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  upvote: number;
  author: {
    id: string;
    username: string;
    password: string; // Consider omitting for security reasons
    role: string;
    image: string | null;
    profile: {
      id: string;
      bio: string;
      profilePicture: string;
      bannerPicture: string;
      displayName: string;
      userId: string;
    };
  };
}

import { DateTime } from "next-auth/providers/kakao";
import {User} from "next-auth";

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

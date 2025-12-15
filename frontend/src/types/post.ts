import type { Reply } from "./reply";

export interface Post {
  id: string;
  username: string;
  location?: string;
  imageUrl?: string;
  body: string;
  likeCount: number;
  replies: Reply[];
  created_at: string;
}

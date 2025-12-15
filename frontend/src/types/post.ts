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
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  caption: string | null;
}

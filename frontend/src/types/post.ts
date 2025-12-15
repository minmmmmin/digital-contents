export interface Post {
  post_id: number;
  user_id: string;
  created_at: string;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  caption: string | null;
  username: string;
  location?: string;
  likeCount: number;
  replies: any[];
}

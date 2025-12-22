"use client";

import { APIProvider, Map as GoogleMap, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/types/post";

interface MapProps {
  view?: 'split' | 'map' | 'timeline';
  setView?: Dispatch<SetStateAction<'split' | 'map' | 'timeline'>>;
  onPinClick?: (post: Post) => void;
  center?: { lat: number; lng: number } | null
}

type FetchedPost = {
  post_id: number;
  user_id: string;
  caption: string | null;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  users: { name: string; avatar_url: string | null } | null;
  comments: { count: number }[] | null;
};

type FavoriteRow = {
  post_id: number;
  user_id: string;
};


function MapInner({ center }: { center?: { lat: number; lng: number } | null }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !center) return;
    map.setCenter(center);
  }, [map, center]);

  return null;
}

export default function NekoMap({ view, setView, onPinClick, center }: MapProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const supabase = createClient();
    const fetchPosts = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("posts")
        .select(`
          post_id,
          user_id,
          caption,
          image_url,
          latitude,
          longitude,
          created_at,
          users!posts_user_id_fkey (
            name,
            avatar_url
          ),
          comments!post_id(count)
        `)
        .not("latitude", "is", null)
        .not("longitude", "is", null);

      if (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        return;
      }
      
      const rows = (data as unknown as FetchedPost[] | null) ?? []
      if (rows.length === 0) {
        setPosts([])
        return;
      }

      const postIds = rows.map((r) => r.post_id);
      const { data: favData, error: favError } = await supabase
        .from('favorites')
        .select('post_id, user_id')
        .in('post_id', postIds)

      if (favError) {
        console.error('Error fetching favorites:', favError)
      }
      
      const favs = (favData as FavoriteRow[] | null) ?? []
      const likeCountMap = new Map<number, number>()
      const likedSet = new Set<number>()

      for (const f of favs) {
        likeCountMap.set(f.post_id, (likeCountMap.get(f.post_id) ?? 0) + 1)
        if (user && f.user_id === user.id) likedSet.add(f.post_id)
      }

      const mappedPosts: Post[] = rows.map((row) => ({
        post_id: row.post_id,
        user_id: row.user_id,
        created_at: row.created_at,
        latitude: row.latitude,
        longitude: row.longitude,
        image_url: row.image_url,
        caption: row.caption,
        username: row.users?.name ?? 'unknown',
        avatar_url: row.users?.avatar_url ?? undefined,
        location: undefined,
        likeCount: likeCountMap.get(row.post_id) ?? 0,
        isLiked: likedSet.has(row.post_id),
        commentCount: row.comments?.[0]?.count ?? 0,
        replies: [],
      }));
      setPosts(mappedPosts);
    };

    fetchPosts();
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  // マーカーのリストを事前に作成
  const markers = posts
    .filter(post => post.latitude && post.longitude)
    .map(post => (
      <AdvancedMarker
        key={post.post_id}
        position={{ lat: post.latitude!, lng: post.longitude! }}
        onClick={() => onPinClick?.(post)}
      />
    ));

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            Google Maps APIキーが設定されていません。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultCenter={{ lat: 35.662186020148546, lng: 139.63409803900635, }}
          defaultZoom={15}
          mapId={mapId}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        >
          <MapInner center={center} />
          {markers}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}

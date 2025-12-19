'use client'

import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { Post } from '@/types/post'

type FetchedPost = {
  post_id: number
  user_id: string
  caption: string | null
  image_url: string | null
  latitude: number | null
  longitude: number | null
  created_at: string
  users: { name: string; avatar_url: string | null } | null
}

type FavoriteRow = {
  post_id: number
  user_id: string
}

interface TimelineProps {
  view: 'split' | 'map' | 'timeline'
  setView: Dispatch<SetStateAction<'split' | 'map' | 'timeline'>>
  isPC?: boolean
  onMoveMap: (lat: number, lng: number) => void
}

const Timeline = ({ view, setView, isPC, onMoveMap }: TimelineProps) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)

      const supabase = createClient()

      const { data: authData } = await supabase.auth.getUser()
      const user = authData?.user ?? null

      const { data, error } = await supabase
        .from('posts')
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
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error)
        setError(error.message)
        setPosts([])
        setLoading(false)
        return
      }

      const rows = (data as unknown as FetchedPost[] | null) ?? []

      if (rows.length === 0) {
        setPosts([])
        setLoading(false)
        return
      }

      const postIds = rows.map(r => r.post_id)

      // favorites をまとめて取得
      const { data: favData, error: favError } = await supabase
        .from('favorites')
        .select('post_id, user_id')
        .in('post_id', postIds)

      if (favError) {
        console.error('Error fetching favorites:', favError)
        setError(favError.message)
        setPosts([])
        setLoading(false)
        return
      }

      const favs = (favData as FavoriteRow[] | null) ?? []

      // post_idごとの件数、isLiked判定
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
        location: undefined, // DBに location 文字列が無いので一旦なし（必要なら後で追加）
        imageUrl: row.image_url ?? undefined,
        body: row.caption ?? '',
        likes: [],
        likeCount: likeCountMap.get(row.post_id) ?? 0,
        isLiked: likedSet.has(row.post_id),
        replies: [], // PostCardで length を見るので必ず入れる
      }))

      setPosts(mappedPosts)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  return (
    <div className="relative bg-gray-100 h-full overflow-y-auto">
      {view !== 'map' && !isPC && ( // !isPC を追加
        <button
          onClick={() => setView(view === 'split' ? 'timeline' : 'split')}
          className="sticky top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-md shadow-lg hover:bg-white z-10 float-right mr-4 cursor-pointer"
        >
          <Image
            src={view === 'split' ? '/fullscreen_icon.png' : '/fullscreen_close_icon.png'}
            alt="Toggle Fullscreen"
            width={24}
            height={24}
          />
        </button>
      )}
      <div className="max-w-xl mx-auto bg-white border-x border-gray-200">
        {loading && <div className="p-4 text-sm opacity-60">読み込み中…</div>}
        {error && <div className="p-4 text-sm text-red-600">取得に失敗しました: {error}</div>}

        {!loading && !error && posts.map((post) => (
          <PostCard key={post.post_id} post={post} onMoveMap={onMoveMap} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

'use client'

import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { Post } from '@/types/post'

type Row = {
  post_id: number
  user_id: string
  caption: string | null
  image_url: string | null
  latitude: number | null
  longitude: number | null
  created_at: string
  users: { name: string; avatar_url: string | null } | null
}

interface TimelineProps {
  view: 'split' | 'map' | 'timeline'
  setView: Dispatch<SetStateAction<'split' | 'map' | 'timeline'>>
  isPC?: boolean
}

const Timeline = ({ view, setView, isPC }: TimelineProps) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)

      const supabase = createClient()

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
        console.error('Error fetching posts:', error) // エラーもコンソールに出力
        setError(error.message)
        setPosts([])
        setLoading(false)
        return
      }

      console.log('Fetched data:', data) // 取得した生のデータを確認

      const mapped: Post[] = ((data ?? []) as unknown as Row[]).map((row) => ({
        id: String(row.post_id),
        username: row.users?.name ?? 'unknown',
        location: undefined, // DBに location 文字列が無いので一旦なし（必要なら後で追加）
        imageUrl: row.image_url ?? undefined,
        body: row.caption ?? '',
        likes: [],
        likeCount: 0,
        replies: [], // PostCardで length を見るので必ず入れる
      }))

      setPosts(mapped)
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
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

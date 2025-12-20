'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatPostDate } from '@/lib/dateUtils'
import { createClient } from '@/lib/supabase/client'
import type { Post } from '@/types/post'

const supabase = createClient()

interface PostCardProps {
  post: Post
  onCommentClick: (postId: number) => void
  onMoveMap: (lat: number, lng: number) => void
}

const PostCard = ({ post, onCommentClick, onMoveMap }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [pending, setPending] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)

  const handleLikeClick = async () => {
    if (pending) return
    setPending(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setPending(false)
      return
    }

    const nextLiked = !isLiked

    // 楽観更新（即UI反映）
    setIsLiked(nextLiked)
    setLikeCount((prev) => prev + (nextLiked ? 1 : -1))

    try {
      if (nextLiked) {
        // いいね追加
        const { error } = await supabase.from('favorites').insert({
          post_id: post.post_id,
          user_id: user.id,
        })
        if (error) throw error
      } else {
        // いいね解除
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('post_id', post.post_id)
          .eq('user_id', user.id)
        if (error) throw error
      }
    } catch (e) {
      // 失敗したら巻き戻す
      setIsLiked(!nextLiked)
      setLikeCount((prev) => prev - (nextLiked ? 1 : -1))
      console.error(e)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="relative flex space-x-3 p-4 border-b border-gray-200">
      {/* Created At */}
      <div className="absolute top-4 right-4 text-xs text-gray-400">
        {post.created_at && formatPostDate(post.created_at)}
      </div>

      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src="/images/dummycat.png"
            alt="user avatar"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
      </div>

      {/* Post content */}
      <div className="flex-1">
        {/* User Info */}
        <div className="flex items-center space-x-2">
          <span className="text-base text-black">{post.username}</span>

          {post.location && <span className="text-xs text-gray-500">{post.location}</span>}

          {/* 地図移動ボタン（仮） */}
          {post.latitude && post.longitude && (
            <button
              type="button"
              className="btn btn-xs btn-outline gap-1 text-gray-700"
              title="地図で場所を見る"
              onClick={() => onMoveMap(post.latitude!, post.longitude!)}
            >
              <span aria-hidden>📍</span>
              地図で見る
            </button>
          )}
        </div>

        {/* Post Body */}
        <p className="text-sm mt-1">{post.caption}</p>

        {/* Post Image */}
        {post.image_url && (
          <div
            className="mt-3 rounded-2xl overflow-hidden cursor-pointer hover:opacity-90"
            onClick={() => setIsImageOpen(true)}
          >
            <Image
              src={post.image_url}
              alt="猫の画像"
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-start space-x-8 mt-3 text-gray-500">
          <button
            type="button"
            onClick={handleLikeClick}
            disabled={pending}
            className={`flex items-center space-x-1 cursor-pointer ${isLiked ? 'text-pink-500' : 'hover:text-pink-500'
              } ${pending ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <span role="img" aria-label="likes">
              ❤️
            </span>
            <span>{likeCount}</span>
          </button>

          <button
            type="button"
            onClick={() => onCommentClick(post.post_id)}
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer"
          >
            <span role="img" aria-label="replies">
              💬
            </span>
            <span>{post.commentCount}</span>
          </button>
        </div>
      </div>

      {/* 画像を拡大表示するモーダル */}
      {isImageOpen && post.image_url && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          {/* 背景クリックで閉じる */}
          <div
            className="absolute inset-0"
            onClick={() => setIsImageOpen(false)}
          />

          <div className="relative max-h-[90vh] max-w-3xl mx-4">
            <Image
              src={post.image_url}
              alt="拡大画像"
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto max-w-full rounded-lg object-contain"
            />

            {/* 閉じるボタン */}
            <button
              type="button"
              className="btn btn-sm btn-circle absolute top-2 right-2 bg-black/60 border-none text-white hover:bg-black/80"
              onClick={() => setIsImageOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard

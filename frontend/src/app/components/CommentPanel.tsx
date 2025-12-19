'use client'

import { useEffect, useState, FormEvent, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { Comment } from '@/types/comment'
import type { User } from '@supabase/supabase-js'
import { formatPostDate } from '@/lib/dateUtils'

interface CommentPanelProps {
  postId: number
  onClose: () => void
}

type CommentRow = {
  comment_id: Comment['comment_id']
  post_id: Comment['post_id']
  user_id: Comment['user_id']
  content: Comment['content']
  created_at: Comment['created_at']
  users:
  | { name: string | null; avatar_url: string | null }
  | { name: string | null; avatar_url: string | null }[]
  | null
}

const CommentPanel = ({ postId, onClose }: CommentPanelProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const supabase = useMemo(() => createClient(), [])

  const fetchComments = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('comments')
        .select(
          `
          comment_id,
          post_id,
          user_id,
          content:comment,
          created_at,
          users!comments_user_id_fkey (
            name,
            avatar_url
          )
        `
        )
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (fetchError) {
        const err = fetchError as { message?: string; details?: string; hint?: string; code?: string }
        console.error('Error fetching comments:', {
          message: err?.message,
          details: err?.details,
          hint: err?.hint,
          code: err?.code,
          raw: fetchError,
        })
        setError('コメントの取得に失敗しました。')
        setComments([])
        return
      }

      const rows = (data as CommentRow[] | null) ?? []

      const mapped: Comment[] = rows.map((row) => {
        const u = Array.isArray(row.users) ? row.users[0] : row.users
        return {
          comment_id: row.comment_id,
          post_id: row.post_id,
          user_id: row.user_id,
          content: row.content,
          created_at: row.created_at,
          // Comment型が users を必須にしてない想定で、あれば入れる
          users: u
            ? {
              name: u.name ?? '名無しさん',
              avatar_url: u.avatar_url ?? null,
            }
            : undefined,
        } as Comment
      })

      setComments(mapped)
    } finally {
      setLoading(false)
    }
  }, [supabase, postId])

  useEffect(() => {
    const run = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      await fetchComments()
    }
    run()
  }, [supabase, fetchComments])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting || !user) return

    setIsSubmitting(true)
    setError(null)

    const { error: insertError } = await supabase.from('comments').insert({
      post_id: postId,
      user_id: user.id,
      comment: newComment.trim(),
    })

    if (insertError) {
      const err = insertError as { message?: string; details?: string; hint?: string; code?: string }
      console.error('Error posting comment:', {
        message: err?.message,
        details: err?.details,
        hint: err?.hint,
        code: err?.code,
        raw: insertError,
      })
      setError('コメントの投稿に失敗しました。')
    } else {
      setNewComment('')
      await fetchComments()
    }

    setIsSubmitting(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl h-[80vh] rounded-t-2xl shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">コメント</h2>
          <button onClick={onClose} className="text-2xl font-light">
            &times;
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading && <div className="text-center text-sm text-gray-500">読み込み中…</div>}
          {error && <div className="text-center text-sm text-red-500">{error}</div>}
          {!loading && !error && comments.length === 0 && (
            <div className="text-center text-sm text-gray-500">まだコメントはありません。</div>
          )}

          {comments.map((comment) => (
            <div key={comment.comment_id} className="flex space-x-3">
              <Image
                src={comment.users?.avatar_url || '/images/dummycat.png'}
                alt={comment.users?.name || 'user avatar'}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                  <span className="text-sm">{comment.users?.name ?? '名無しさん'}</span>
                  <span className="text-xs text-gray-400">{formatPostDate(comment.created_at)}</span>
                </div>
                <p className="text-sm mt-1 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを追加…"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                投稿
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-500">
            コメントを投稿するには
            <a href="/login" className="text-blue-500 hover:underline">
              ログイン
            </a>
            が必要です。
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentPanel

'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function AuthPage() {
  const supabase = createClient()

  // ログイン後にリダイレクトしたいURLをここに設定します
  // 例えば、現在のページのオリジンにリダイレクトしたい場合
  const [redirectUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    return ''
  })

  if (!redirectUrl) {
    return null // redirectUrlが設定されるまでレンダリングしない
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login / Register</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']} // 利用したいソーシャルプロバイダーを指定
          redirectTo={`${redirectUrl}/auth/callback`}
        />
      </div>
    </div>
  )
}

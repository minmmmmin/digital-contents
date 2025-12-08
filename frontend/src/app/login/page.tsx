'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

export default function AuthPage() {
  const supabase = createClient()

  // ログイン後にリダイレクトしたいURLをここに設定します
  // 例えば、現在のページのオリジンにリダイレクトしたい場合
  const [redirectUrl, setRedirectUrl] = useState("")

  // CSR でのみ値を設定
  useEffect(() => {
    Promise.resolve().then(() => {
      setRedirectUrl(window.location.origin)
    })
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login / Register</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']}
          redirectTo={redirectUrl ? `${redirectUrl}/auth/callback` : undefined}
        />
      </div>
    </div>
  )
}

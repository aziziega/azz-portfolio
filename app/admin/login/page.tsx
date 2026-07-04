"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    const result = await response.json().catch(() => null)

    if (!response.ok) {
      setError(result?.message || "Invalid username or password")
    } else {
      router.replace("/admin")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-shell">
        <div className="admin-login-header">
          <div className="admin-login-logo">A</div>
          <h1 className="admin-login-title">Portfolio CMS</h1>
          <p className="admin-login-subtitle">Manage portfolio content, inbox, writing, and site copy.</p>
        </div>

        <div className="admin-login-card">
          <h2 className="admin-login-card-title">Sign in</h2>

        {urlError === "unauthorized" && (
          <div className="admin-login-error">
            Access denied. This email is not authorized as admin.
          </div>
        )}
        
        {urlError === "auth_failed" && (
          <div className="admin-login-error">
            Authentication failed. Please try again.
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoFocus
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="password">Password</label>
            <div className="admin-login-password-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="admin-login-password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="admin-login-button"
          >
            {loading ? (
              <><Loader2 size={18} className="admin-spin" /> Signing in...</>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="admin-login-hint">
            Private access for the portfolio command center.
          </p>
        </form>
      </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h1 className="admin-login-title">Loading...</h1>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

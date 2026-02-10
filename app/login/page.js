'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password }) })
      if (res.ok) router.push('/dashboard')
      else setError('Invalid password')
    } catch { setError('Something went wrong') }
    finally { setLoading(false) }
  }

  return (<>
    <style jsx>{`
      .lp { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#0f1b2d; padding:24px; }
      .lc { width:100%; max-width:420px; background:#162238; border:1px solid #263650; border-radius:8px; padding:48px; }
      .ll { display:flex; align-items:center; gap:12px; margin-bottom:36px; }
      .ll-i { width:40px; height:40px; background:#c0392b; border-radius:6px; display:flex; align-items:center; justify-content:center; }
      .ll-t { font-family:'Outfit',sans-serif; font-size:18px; font-weight:700; color:#f5f7fa; }
      .ll-s { font-size:11px; color:#7a8ba3; font-weight:500; }
      .lt { font-family:'Outfit',sans-serif; font-size:24px; font-weight:700; color:#f5f7fa; margin-bottom:8px; }
      .ls { font-size:14px; color:#7a8ba3; margin-bottom:28px; }
      .lb { display:block; font-size:12px; font-weight:600; color:#7a8ba3; margin-bottom:6px; }
      .li { width:100%; padding:12px 14px; background:#0f1b2d; border:1px solid #263650; border-radius:6px; color:#f5f7fa; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; outline:none; transition:border-color 0.2s; }
      .li:focus { border-color:#c0392b; }
      .lb2 { width:100%; padding:14px; background:#c0392b; color:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:600; border:none; border-radius:6px; cursor:pointer; transition:background 0.2s; margin-top:20px; }
      .lb2:hover { background:#d94432; }
      .lb2:disabled { opacity:0.6; cursor:not-allowed; }
      .le { color:#c0392b; font-size:13px; margin-top:10px; }
      .lk { display:block; text-align:center; margin-top:20px; font-size:13px; color:#7a8ba3; text-decoration:none; transition:color 0.2s; }
      .lk:hover { color:#c0392b; }
    `}</style>
    <div className="lp"><div className="lc">
      <div className="ll"><div className="ll-i"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="22" height="22"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><div><div className="ll-t">Deadhead Trucking</div><div className="ll-s">Dashboard</div></div></div>
      <h1 className="lt">Sign In</h1>
      <p className="ls">Enter your dashboard password to continue.</p>
      <form onSubmit={handleSubmit}>
        <label className="lb">Password</label>
        <input type="password" className="li" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" required autoFocus/>
        {error && <p className="le">{error}</p>}
        <button type="submit" className="lb2" disabled={loading}>{loading?'Signing in...':'Sign In'}</button>
      </form>
      <a href="/" className="lk">← Back to website</a>
    </div></div>
  </>)
}
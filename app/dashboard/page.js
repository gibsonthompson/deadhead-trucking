'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const STC = { new:'#c0392b', contacted:'#2c6fbb', quoted:'#8e44ad', booked:'#27ae60', closed:'#7a8ba3' }
const FTL = { general:'General Freight', auto:'Motor Vehicle', hazmat:'Hazmat', other:'Other' }

export default function DashboardPage() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/check').then(r => { if (r.ok) setAuth(true); else router.push('/login') }).catch(() => router.push('/login'))
  }, [router])

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('deadhead_quotes').select('*').order('created_at', { ascending: false })
    if (data) setQuotes(data)
    setLoading(false)
  }, [])

  useEffect(() => { if (auth) load() }, [auth, load])

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('deadhead_quotes').update({ status }).eq('id', id)
    if (!error) setQuotes(p => p.map(q => q.id === id ? { ...q, status } : q))
  }

  const logout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login') }

  const filtered = quotes.filter(q => {
    if (filter !== 'all' && q.status !== filter) return false
    if (search) { const s = search.toLowerCase(); return [q.name,q.company,q.email,q.origin,q.destination].some(v => v?.toLowerCase().includes(s)) }
    return true
  })

  const counts = quotes.reduce((a, q) => { a[q.status] = (a[q.status]||0)+1; return a }, {})

  if (!auth) return null

  return (<>
    <style jsx>{`
      .d{min-height:100vh;background:#0f1b2d;color:#b0bfd0}
      .dh{background:#162238;border-bottom:1px solid #263650;padding:0 32px;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100}
      .dl{display:flex;align-items:center;gap:10px}
      .dli{width:32px;height:32px;background:#c0392b;border-radius:6px;display:flex;align-items:center;justify-content:center}
      .dlt{font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:#f5f7fa}
      .dls{font-size:10px;color:#c0392b;font-weight:600;text-transform:uppercase;letter-spacing:1px}
      .da{display:flex;gap:12px}
      .db{padding:8px 18px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;border:1px solid #263650;background:none;color:#7a8ba3;cursor:pointer;transition:all 0.2s;text-decoration:none;border-radius:4px;font-family:'Plus Jakarta Sans',sans-serif}
      .db:hover{border-color:#c0392b;color:#c0392b}
      .body{max-width:1200px;margin:0 auto;padding:28px 32px}
      .dt{font-family:'Outfit',sans-serif;font-size:28px;font-weight:700;color:#f5f7fa;margin-bottom:6px}
      .ds{font-size:14px;color:#7a8ba3;margin-bottom:28px}
      .sr{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:28px}
      .sc{background:#162238;border:1px solid #263650;border-radius:6px;padding:16px;cursor:pointer;transition:all 0.2s}
      .sc:hover,.sc.act{border-color:#c0392b}
      .sc .n{font-family:'Outfit',sans-serif;font-size:28px;font-weight:700;color:#f5f7fa;line-height:1}
      .sc .l{font-size:11px;color:#7a8ba3;margin-top:4px;text-transform:uppercase;letter-spacing:1px;font-weight:500}
      .ctrls{display:flex;gap:12px;margin-bottom:20px}
      .si{flex:1;max-width:400px;padding:10px 14px;background:#162238;border:1px solid #263650;border-radius:6px;color:#f5f7fa;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;outline:none}
      .si:focus{border-color:#c0392b}
      .rb{padding:10px 20px;background:#c0392b;color:#fff;font-size:13px;font-weight:600;border:none;border-radius:6px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif}
      .rb:hover{background:#d94432}
      .tw{overflow-x:auto}
      table{width:100%;border-collapse:collapse}
      th{font-size:11px;font-weight:600;color:#7a8ba3;letter-spacing:1px;text-transform:uppercase;text-align:left;padding:12px 14px;border-bottom:1px solid #263650;background:#162238;position:sticky;top:64px;z-index:10}
      td{padding:12px 14px;border-bottom:1px solid #1d2d45;font-size:14px;vertical-align:top}
      tr:hover td{background:rgba(192,57,43,0.02)}
      .ss{padding:5px 8px;background:#0f1b2d;border:1px solid #263650;color:#f5f7fa;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;cursor:pointer;outline:none;border-radius:4px}
      .ss:focus{border-color:#c0392b}
      .eb{background:none;border:none;color:#7a8ba3;cursor:pointer;font-size:16px;padding:0 6px}
      .eb:hover{color:#c0392b}
      .dr td{background:#162238;padding:16px 14px}
      .dg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
      .di label{display:block;font-size:10px;color:#7a8ba3;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;font-weight:600}
      .di p{font-size:14px;color:#f5f7fa}
      .di a{color:#c0392b;text-decoration:none}
      .df{grid-column:1/-1}
      .empty{text-align:center;padding:48px 20px;color:#7a8ba3}
      @media(max-width:768px){.sr{grid-template-columns:repeat(2,1fr)}.ctrls{flex-direction:column}.si{max-width:100%}.body{padding:20px 16px}.dh{padding:0 16px}.dg{grid-template-columns:1fr}}
    `}</style>
    <div className="d">
      <header className="dh">
        <div className="dl"><div><div className="dlt">DEADHEAD</div><div style={{width:'100%',height:'2px',background:'#c0392b',margin:'3px 0'}}></div><div className="dls">Quote Dashboard</div></div></div>
        <div className="da"><a href="/" className="db">View Site</a><button className="db" onClick={logout}>Logout</button></div>
      </header>
      <div className="body">
        <h1 className="dt">Quote Submissions</h1>
        <p className="ds">{quotes.length} total quote{quotes.length!==1?'s':''} received</p>
        <div className="sr">
          {[['all','All',quotes.length],['new','New',counts.new||0],['contacted','Contacted',counts.contacted||0],['quoted','Quoted',counts.quoted||0],['booked','Booked',counts.booked||0]].map(([k,l,c])=>(
            <div key={k} className={`sc ${filter===k?'act':''}`} onClick={()=>setFilter(k)}><div className="n">{c}</div><div className="l">{l}</div></div>
          ))}
        </div>
        <div className="ctrls">
          <input className="si" placeholder="Search name, company, email, route..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <button className="rb" onClick={load}>Refresh</button>
        </div>
        {loading ? <div className="empty">Loading...</div> : filtered.length===0 ? <div className="empty">No quotes found.</div> : (
          <div className="tw"><table><thead><tr><th></th><th>Date</th><th>Name</th><th>Company</th><th>Route</th><th>Type</th><th>Status</th></tr></thead><tbody>
            {filtered.map(q=>(<>
              <tr key={q.id}>
                <td><button className="eb" onClick={()=>setExpanded(expanded===q.id?null:q.id)}>{expanded===q.id?'−':'+'}</button></td>
                <td style={{whiteSpace:'nowrap',fontSize:13,color:'#7a8ba3'}}>{new Date(q.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric'})}<br/><span style={{fontSize:11}}>{new Date(q.created_at).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</span></td>
                <td style={{color:'#f5f7fa',fontWeight:500}}>{q.name}</td>
                <td>{q.company||'—'}</td>
                <td style={{whiteSpace:'nowrap'}}>{q.origin&&q.destination?`${q.origin} → ${q.destination}`:q.origin||q.destination||'—'}</td>
                <td>{FTL[q.freight_type]||'—'}</td>
                <td><select className="ss" value={q.status} onChange={e=>updateStatus(q.id,e.target.value)} style={{color:STC[q.status]||'#7a8ba3'}}><option value="new">New</option><option value="contacted">Contacted</option><option value="quoted">Quoted</option><option value="booked">Booked</option><option value="closed">Closed</option></select></td>
              </tr>
              {expanded===q.id&&<tr key={q.id+'-d'} className="dr"><td colSpan={7}><div className="dg">
                <div className="di"><label>Email</label><p><a href={`mailto:${q.email}`}>{q.email}</a></p></div>
                <div className="di"><label>Phone</label><p>{q.phone?<a href={`tel:${q.phone}`}>{q.phone}</a>:'—'}</p></div>
                <div className="di"><label>Origin</label><p>{q.origin||'—'}</p></div>
                <div className="di"><label>Destination</label><p>{q.destination||'—'}</p></div>
                <div className="di df"><label>Details</label><p style={{whiteSpace:'pre-wrap'}}>{q.details||'No additional details.'}</p></div>
              </div></td></tr>}
            </>))}
          </tbody></table></div>
        )}
      </div>
    </div>
  </>)
}
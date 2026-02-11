'use client'
import { useState } from 'react'

const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const ShieldIcon = ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const CardIcon = ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/></svg>
const CheckIcon = ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
const ClockIcon = ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
const PinIcon = ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>

export default function HomePage() {
  const [fd, setFd] = useState({ name:'', company:'', email:'', phone:'', origin:'', destination:'', freight_type:'', details:'' })
  const [ss, setSs] = useState('idle')
  const [mo, setMo] = useState(false)
  const hc = (e) => setFd(p => ({ ...p, [e.target.name]: e.target.value }))
  const hs = async (e) => {
    e.preventDefault(); setSs('submitting')
    try {
      const r = await fetch('/api/quote', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(fd) })
      if (r.ok) { setSs('success'); setFd({ name:'',company:'',email:'',phone:'',origin:'',destination:'',freight_type:'',details:'' }); setTimeout(()=>setSs('idle'),4000) }
      else { setSs('error'); setTimeout(()=>setSs('idle'),3000) }
    } catch { setSs('error'); setTimeout(()=>setSs('idle'),3000) }
  }

  return (<>
    {/* NAV */}
    <nav><div className="nav-inner">
      <a href="#" className="logo-stacked"><div className="logo-main">DEADHEAD</div><div className="logo-divider"></div><div className="logo-sub-text">TRUCKING LLC</div></a>
      <ul className={`nav-links ${mo?'active':''}`}>
        <li><a href="#about" onClick={()=>setMo(false)}>About</a></li>
        <li><a href="#services" onClick={()=>setMo(false)}>Services</a></li>
        <li><a href="#coverage" onClick={()=>setMo(false)}>Coverage</a></li>
        <li><a href="#drivers" onClick={()=>setMo(false)}>Drivers</a></li>
        <li><a href="#quote" className="nav-cta" onClick={()=>setMo(false)}>Get a Quote</a></li>
      </ul>
      <button className="mobile-toggle" onClick={()=>setMo(!mo)} aria-label="Menu"><span/><span/><span/></button>
    </div></nav>

    {/* HERO */}
    <section className="hero"><div className="hero-bg"/><div className="hero-content">
      <div className="hero-eyebrow">Aurora, IL — Nationwide Coverage</div>
      <h1 className="hero-title">Reliable freight<br/>across all 48 states.</h1>
      <p className="hero-desc">Deadhead Trucking LLC is a federally authorized interstate carrier with 82+ trucks, 100+ drivers, and over 45 million miles logged annually. General freight, vehicle transport, and hazmat certified.</p>
      <div className="hero-actions">
        <a href="#quote" className="btn-primary">Request a Quote →</a>
        <a href="tel:3312644842" className="btn-outline"><PhoneIcon/> (331) 264-4842</a>
      </div>
      <div className="hero-stats">
        <div className="hero-stat"><div className="val">82+</div><div className="lbl">Power Units</div></div>
        <div className="hero-stat"><div className="val">102</div><div className="lbl">Drivers</div></div>
        <div className="hero-stat"><div className="val">45M+</div><div className="lbl">Miles Annually</div></div>
      </div>
    </div></section>

    {/* INFO BAR */}
    <div className="info-bar"><div className="info-bar-inner">
      <div className="info-bar-item">USDOT <span>3689437</span></div>
      <div className="info-bar-item">MC <span>1286521</span></div>
      <div className="info-bar-item">Authorized For-Hire</div>
      <div className="info-bar-item">Hazmat Certified</div>
      <div className="info-bar-item">Interstate Operations</div>
    </div></div>

    {/* ABOUT */}
    <section className="section" id="about"><div className="about-grid">
      <div>
        <div className="section-label">About Us</div>
        <h2 className="section-title">Built on reliability. Driven by results.</h2>
        <p className="section-desc">Deadhead Trucking LLC is an authorized interstate freight carrier headquartered in Aurora, Illinois — in the heart of the Chicago metropolitan logistics corridor. We specialize in general freight, motor vehicle transport, and hazmat-certified hauling.</p>
        <p className="section-desc">With over 82 power units and 102 professional drivers, we&apos;ve built our reputation on consistent on-time performance, transparent communication, and operational scale that brokers and shippers depend on.</p>
      </div>
      <div className="about-image">
        <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80" alt="Fleet"/>
        <div className="about-badge"><div className="about-badge-dot"/><div><div className="about-badge-text">FMCSA Active &amp; Authorized</div><div className="about-badge-sub">Last updated Feb 2026</div></div></div>
      </div>
    </div></section>

    {/* STATS */}
    <div className="stats-bar"><div className="stats-inner">
      {[['82+','Power Units'],['102','Professional Drivers'],['45M+','Miles Per Year'],['48','States Covered']].map(([n,l])=>(
        <div className="stat-item" key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
      ))}
    </div></div>

    {/* SERVICES */}
    <section className="section" id="services">
      <div className="services-header"><div className="section-label">Our Services</div><h2 className="section-title">What we haul</h2><p className="section-desc">From dry van freight to vehicle transport and hazmat loads — we have the equipment, credentials, and team to move it.</p></div>
      <div className="services-grid">
        {[
          { icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><rect x="1" y="6" width="22" height="12" rx="1"/><path d="M6 6V4a2 2 0 012-2h8a2 2 0 012 2v2"/></svg>, t:'General Freight', d:'Full truckload general freight services across the continental US. Dry van capacity for palletized goods, boxed cargo, and standard commodities.', f:['Full Truckload (FTL)','Dry Van Transport','Palletized & Boxed Cargo','Door-to-Door Delivery'] },
          { icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><rect x="3" y="11" width="18" height="7" rx="1"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>, t:'Motor Vehicle Transport', d:'Licensed and insured auto transport. We move passenger vehicles, fleet vehicles, and specialty automobiles safely across state lines.', f:['Open & Enclosed Carriers','Dealer-to-Dealer Transport','Fleet Relocation','Fully Insured Loads'] },
          { icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1"/></svg>, t:'Hazmat Certified', d:'Federally certified for hazardous materials transport. Hazmat-endorsed drivers and compliant equipment for safe movement of dangerous goods.', f:['Certified Hazmat Drivers','DOT-Compliant Equipment','Safety Protocols & Tracking','Emergency Response Plans'] },
        ].map(s=>(
          <div className="svc-card" key={s.t}><div className="svc-icon">{s.icon}</div><h3 className="svc-title">{s.t}</h3><p className="svc-desc">{s.d}</p><div className="svc-list">{s.f.map(f=><span className="svc-list-item" key={f}>{f}</span>)}</div></div>
        ))}
      </div>
    </section>

    {/* WHY */}
    <section className="why-section"><div className="why-inner">
      <div className="section-label">Why Deadhead</div><h2 className="section-title">The carrier brokers keep coming back to</h2>
      <div className="why-grid">
        {[
          {n:'01',t:'Scale you can count on',d:'82+ trucks and 102 drivers mean we have capacity to cover your lanes — even during peak season.'},
          {n:'02',t:'FMCSA authorized & compliant',d:'Fully authorized for-hire interstate carrier with active USDOT and MC authority.'},
          {n:'03',t:'45+ million miles proven',d:"Our annual mileage speaks for itself. We're a proven operator moving freight at scale, day in and day out."},
          {n:'04',t:'Multi-cargo capability',d:'General freight, motor vehicles, and hazmat — three verticals under one authority. Fewer vendors, better rates.'},
        ].map(w=><div className="why-card" key={w.n}><div className="why-num">{w.n}</div><div><h3>{w.t}</h3><p>{w.d}</p></div></div>)}
      </div>
    </div></section>

    {/* COVERAGE */}
    <section className="section" id="coverage"><div className="cov-grid">
      <div>
        <div className="section-label">Service Area</div><h2 className="section-title">Coast to coast, out of Chicago</h2>
        <p className="section-desc">Headquartered in Aurora, IL — 40 miles west of Chicago — we operate interstate routes covering all 48 contiguous states with access to I-88, I-80, I-55, and I-294.</p>
        <div className="cov-routes">
          {[['Midwest Hub Operations','Core'],['East Coast Corridors','High Volume'],['Southern & Southeast Routes','Growing'],['West Coast & Mountain States','Full Coverage'],['Texas & Southwest Triangle','Active']].map(([n,t])=>(
            <div className="cov-route" key={n}><span className="cov-route-name">{n}</span><span className="cov-tag">{t}</span></div>
          ))}
        </div>
      </div>
      <div className="cov-map-box">
        <div className="cov-map-label">Continental U.S. Coverage</div>
        <svg viewBox="0 0 200 120" fill="none" style={{width:'100%',maxWidth:320}}>
          <path d="M30 30 L50 22 L80 20 L110 22 L140 25 L160 32 L168 42 L170 55 L165 68 L155 78 L140 86 L120 92 L100 95 L80 96 L60 94 L45 88 L35 78 L28 65 L26 50 L28 38Z" stroke="var(--border)" strokeWidth="1" fill="none"/>
          <circle cx="118" cy="42" r="5" fill="#c0392b" opacity="0.2"/><circle cx="118" cy="42" r="2.5" fill="#c0392b"/>
        </svg>
        <div className="cov-hq-name">Aurora, Illinois</div>
        <div className="cov-hq-detail">Company Headquarters</div>
      </div>
    </div></section>

    {/* CREDENTIALS */}
    <div className="creds"><div className="creds-inner">
      {[{l:'USDOT',v:'3689437',I:ShieldIcon},{l:'MC Number',v:'MC-1286521',I:CardIcon},{l:'Status',v:'Active & Authorized',I:CheckIcon},{l:'Operations',v:'Interstate For-Hire',I:ClockIcon}].map(c=>(
        <div className="cred" key={c.l}><div className="cred-icon"><c.I/></div><div><div className="cred-label">{c.l}</div><div className="cred-value">{c.v}</div></div></div>
      ))}
    </div></div>

    {/* DRIVERS */}
    <section className="drivers" id="drivers"><div className="drivers-bg"/><div className="drivers-inner">
      <div className="section-label" style={{justifyContent:'center',display:'flex'}}>Now Hiring</div>
      <h2 className="section-title" style={{textAlign:'center'}}>Drive with Deadhead</h2>
      <p className="section-desc" style={{textAlign:'center',margin:'0 auto'}}>We&apos;re looking for experienced CDL drivers. Competitive pay, consistent miles, and a team that respects the work you do.</p>
      <div className="driver-benefits">
        {[['💰','Competitive Pay','Top-of-market rates with consistent weekly miles'],['🛣️','Steady Miles','45M+ fleet miles annually keeps you moving'],['🤝','Driver-First Culture','Dispatch that communicates and actually supports']].map(([i,t,d])=>(
          <div className="benefit" key={t}><div className="benefit-icon">{i}</div><div className="benefit-title">{t}</div><div className="benefit-desc">{d}</div></div>
        ))}
      </div>
      <div className="driver-phone-label">Call to apply</div>
      <a href="tel:3312644842" className="driver-phone">(331) 264-4842</a>
    </div></section>

    {/* QUOTE */}
    <section className="quote" id="quote"><div className="quote-inner">
      <div className="quote-info">
        <div className="section-label">Get Started</div><h2 className="section-title">Request a freight quote</h2>
        <p className="section-desc">Whether you&apos;re a broker or shipper looking for a reliable carrier, fill out the form and our dispatch team will get back to you.</p>
        <div className="contact-items">
          <div className="contact-item"><div className="contact-icon"><PhoneIcon/></div><div><h4>Phone</h4><p><a href="tel:3312644842">(331) 264-4842</a></p></div></div>
          <div className="contact-item"><div className="contact-icon"><PinIcon/></div><div><h4>Headquarters</h4><p>Aurora, IL 60504</p></div></div>
          <div className="contact-item"><div className="contact-icon"><CardIcon/></div><div><h4>Authority</h4><p>MC-1286521 | USDOT 3689437</p></div></div>
        </div>
      </div>
      <div className="form-card">
        <div className="form-title">Tell us about your freight</div>
        <form onSubmit={hs}>
          <div className="form-row">
            <div className="form-group"><label>Full Name</label><input name="name" value={fd.name} onChange={hc} placeholder="Your name" required/></div>
            <div className="form-group"><label>Company</label><input name="company" value={fd.company} onChange={hc} placeholder="Company name"/></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Email</label><input name="email" type="email" value={fd.email} onChange={hc} placeholder="you@company.com" required/></div>
            <div className="form-group"><label>Phone</label><input name="phone" type="tel" value={fd.phone} onChange={hc} placeholder="(555) 555-5555"/></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Origin</label><input name="origin" value={fd.origin} onChange={hc} placeholder="e.g. Chicago, IL"/></div>
            <div className="form-group"><label>Destination</label><input name="destination" value={fd.destination} onChange={hc} placeholder="e.g. Dallas, TX"/></div>
          </div>
          <div className="form-group"><label>Freight Type</label><select name="freight_type" value={fd.freight_type} onChange={hc}><option value="" disabled>Select freight type</option><option value="general">General Freight (Dry Van)</option><option value="auto">Motor Vehicle Transport</option><option value="hazmat">Hazmat Load</option><option value="other">Other / Not Sure</option></select></div>
          <div className="form-group"><label>Additional Details</label><textarea name="details" value={fd.details} onChange={hc} placeholder="Weight, dimensions, requirements, timeline..."/></div>
          <button type="submit" className={`form-submit ${ss==='success'?'success':ss==='error'?'error':''}`} disabled={ss==='submitting'}>
            {ss==='idle'&&'Submit Quote Request'}{ss==='submitting'&&'Submitting...'}{ss==='success'&&"Submitted — We'll be in touch!"}{ss==='error'&&'Error — Please try again'}
          </button>
        </form>
      </div>
    </div></section>

    {/* FOOTER */}
    <footer><div className="footer-inner">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" className="logo-stacked"><div className="logo-main">DEADHEAD</div><div className="logo-divider"></div><div className="logo-sub-text">TRUCKING LLC</div></a>
          <p>Federally authorized interstate carrier based in Aurora, IL. General freight, vehicle transport, and hazmat hauling across all 48 states.</p>
        </div>
        <div className="footer-col"><h4>Links</h4><ul><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#coverage">Coverage</a></li><li><a href="#drivers">Drivers</a></li><li><a href="#quote">Get a Quote</a></li></ul></div>
        <div className="footer-col"><h4>Services</h4><ul><li><a href="#services">General Freight</a></li><li><a href="#services">Vehicle Transport</a></li><li><a href="#services">Hazmat Hauling</a></li><li><a href="#services">FTL Shipping</a></li></ul></div>
        <div className="footer-col"><h4>Contact</h4><div className="footer-contact">
          <div className="footer-contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><p><a href="tel:3312644842">(331) 264-4842</a></p></div>
          <div className="footer-contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><p>4304 Chesapeake Dr<br/>Aurora, IL 60504</p></div>
          <div className="footer-contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/></svg><p>MC-1286521 | USDOT 3689437</p></div>
        </div></div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Deadhead Trucking LLC. All rights reserved.</p>
        <div className="footer-legal"><a href="#">Privacy Policy</a><a href="#">Terms</a><a href="https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3689437" target="_blank" rel="noopener noreferrer">FMCSA Record</a></div>
      </div>
    </div></footer>
  </>)
}
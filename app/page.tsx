"use client";

export default function Home() {
  function toggleModal(id: string, show: boolean) {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'flex' : 'none';
  }
  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const contact_name = (document.getElementById('fn') as HTMLInputElement).value;
    const email = (document.getElementById('fe') as HTMLInputElement).value;
    const message = (document.getElementById('fm') as HTMLTextAreaElement).value;
    const budget = (document.getElementById('fbudget') as HTMLSelectElement).value;
    const project_type = (document.getElementById('ftype') as HTMLSelectElement).value;
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact_name, email, message, brand_name: '', budget, project_type })
    });
    const form = document.getElementById('contact-form') as HTMLElement;
    const success = document.getElementById('success-message') as HTMLElement;
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
  }
  async function handleJoinSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = (document.getElementById('join-name') as HTMLInputElement).value;
    const email = (document.getElementById('join-email') as HTMLInputElement).value;
    const skill = (document.getElementById('join-skill') as HTMLSelectElement).value;
    const portfolio = (document.getElementById('join-portfolio') as HTMLInputElement).value;
    await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, skill, portfolio })
    });
    toggleModal('join-modal', false);
    alert("Application sent! We'll review your portfolio soon.");
  }

  const skills = [
    { value: "strategy", label: "Brand Strategy" },
    { value: "web", label: "Web Development" },
    { value: "text", label: "Copywriting & SEO" },
    { value: "design", label: "Graphic Design" },
    { value: "photography", label: "Photography" },
    { value: "video", label: "Videography" },
    { value: "motion", label: "Motion Graphics" },
    { value: "illustration", label: "Illustration" },
    { value: "ux", label: "UI/UX Design" },
    { value: "social", label: "Social Media" },
    { value: "media_buying", label: "Media Buying" },
    { value: "performance", label: "Performance Marketing" },
    { value: "influencer", label: "Influencer Marketing" },
    { value: "email", label: "Email Marketing" },
    { value: "events", label: "Event Management" },
    { value: "pr", label: "PR & Communications" },
  ];

  const filters = [
    { value: "all", label: "All Talent" },
    { value: "strategy", label: "Strategy" },
    { value: "web", label: "Web" },
    { value: "design", label: "Design" },
    { value: "text", label: "Copy & SEO" },
    { value: "photography", label: "Photography" },
    { value: "video", label: "Video" },
    { value: "social", label: "Social" },
    { value: "media_buying", label: "Media Buying" },
    { value: "performance", label: "Performance" },
    { value: "pr", label: "PR" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        :root { --bastian-orange: #f58a07; --bastian-black: #1a1a1a; }
        body { font-family: 'DM Sans', sans-serif; background-color: #ffffff; color: var(--bastian-black); }
        h1, h2, h3, h4, .serif { font-family: 'Cormorant Garamond', serif; }
        .grid-bg { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px); }
        .btn-orange { background-color: var(--bastian-orange); color: white; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .btn-orange:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(245,138,7,0.3); }
        .dashed-card { border: 1.5px dashed #ddd; transition: all 0.3s ease; }
        .brand-logo { filter: grayscale(100%); opacity: 0.4; transition: all 0.4s ease; }
        .brand-logo:hover { filter: grayscale(0%); opacity: 1; transform: scale(1.05); }
        .filter-btn { padding: 6px 16px; border-radius: 99px; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; transition: all 0.3s; border: 1px solid transparent; cursor: pointer; background: none; flex-shrink: 0; }
        .filter-btn:hover { color: var(--bastian-orange); border-color: #eee; }
        .active-tab { background: var(--bastian-orange) !important; color: white !important; border-color: var(--bastian-orange) !important; }
        .loader { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .audit-box { background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1px solid #dbeafe; }
        .ticker-track { animation: ticker 40s linear infinite; display: flex; white-space: nowrap; }
        .ticker-item { display: inline-flex; align-items: center; padding: 0 2.5rem; }
        .ticker-star { color: #f58a07; margin: 0 0; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #f58a07; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .mobile-menu { display: none; }
        .mobile-menu.open { display: flex; }
        .specialism-btn { cursor: pointer; transition: all 0.3s; }
        .specialism-btn:hover { border-color: #f58a07; color: #f58a07; background: #fff7ed; }
      `}</style>

      {/* JOIN MODAL */}
      <div id="join-modal" style={{display:'none'}} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button onClick={() => toggleModal('join-modal', false)} className="absolute top-8 right-8 text-gray-400 hover:text-black text-2xl leading-none">✕</button>
          <h3 className="serif text-4xl font-bold tracking-tight mb-2 italic">Join the <span className="text-[#f58a07]">Network</span></h3>
          <p className="text-gray-400 text-sm mb-8">Top 10% talent only. Tell us about your craft.</p>
          <form onSubmit={handleJoinSubmit} className="space-y-5">
            <input id="join-name" type="text" placeholder="Full Name" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            <input id="join-email" type="email" placeholder="Email Address" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            <select id="join-skill" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500 text-gray-600">
              {skills.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <input id="join-portfolio" type="url" placeholder="Portfolio / LinkedIn URL" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            <button type="submit" className="w-full btn-orange py-5 rounded-2xl font-bold uppercase tracking-widest text-xs">Submit Application</button>
          </form>
        </div>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 py-5 px-6 md:px-12">
        <div className="flex justify-between items-center">
          <a href="#home" className="serif text-2xl font-bold tracking-tight">BASTIAN<span className="text-[#f58a07]">.</span></a>
          <div className="hidden lg:flex space-x-10 uppercase text-[10px] font-bold tracking-[0.2em] text-gray-400">
            <a href="#about" className="nav-link hover:text-black transition-colors">About</a>
            <a href="#network" className="nav-link hover:text-black transition-colors">Network</a>
            <a href="#offerings" className="nav-link hover:text-black transition-colors">Offerings</a>
            <a href="#work" className="nav-link hover:text-black transition-colors">Work</a>
            <a href="#audit" className="nav-link hover:text-black transition-colors">Brand Audit</a>
            <a href="#join" className="nav-link hover:text-black transition-colors">Join</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="btn-orange px-8 py-2.5 rounded-xl font-bold text-sm">Contact</a>
            <button className="lg:hidden p-2" onClick={() => {
              const m = document.getElementById('mobile-menu');
              if (m) m.classList.toggle('open');
            }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div id="mobile-menu" className="mobile-menu flex-col pt-6 pb-4 space-y-4 lg:hidden">
          {["about","network","offerings","work","audit","join","contact"].map(item => (
            <a key={item} href={`#${item}`} className="uppercase text-[11px] font-bold tracking-widest text-gray-500 hover:text-orange-500"
              onClick={() => document.getElementById('mobile-menu')?.classList.remove('open')}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section id="home" className="grid-bg min-h-[75vh] flex items-center px-6 md:px-12 py-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start w-full">
            <h1 className="serif text-6xl md:text-8xl font-bold leading-[1.05] tracking-tight italic">
              Your Brand<br />Deserves A<br /><span className="text-[#f58a07]">Dream Team</span>
            </h1>
            <div className="md:pt-10">
              <p className="text-gray-500 text-xl mb-6 leading-relaxed">
                Bastian is the glue between <strong>ambitious brands</strong> and <strong>specialist freelancers</strong>. We curate your perfect team and manage everything — so you get agency-quality work without the agency price tag.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="#contact" className="text-xs uppercase tracking-widest px-5 py-2.5 bg-orange-50 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-colors cursor-pointer">For Brands →</a>
                <a href="#join" className="text-xs uppercase tracking-widest px-5 py-2.5 bg-gray-50 text-gray-500 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-colors cursor-pointer">For Freelancers →</a>
              </div>
              <div className="flex flex-wrap gap-5">
                <a href="#network" className="btn-orange px-10 py-4 rounded-xl font-bold">Explore the Network</a>
                <a href="#work" className="border-2 border-orange-500 text-orange-500 px-10 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors">Past Projects</a>
              </div>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="bg-[#1a1a1a] py-3 overflow-hidden">
          <div className="ticker-track">
            {[...Array(2)].flatMap((_, i) =>
              ["Social Media","Performance Marketing","Brand Strategy","Content & SEO","Event Management","Website Design","PR & Communications","Creative Direction","Media Buying","Influencer Marketing"].map((item) => (
                <span key={`${i}-${item}`} className="ticker-item text-xs uppercase tracking-widest text-white/60 flex-shrink-0">
                  {item}<span className="ticker-star ml-5">✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* BRANDS */}
        <section className="py-24 px-6 md:px-12 border-t border-b border-gray-100 bg-gray-50/30">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-12 text-center">Brands we&apos;ve <em className="text-[#f58a07]">scaled</em></p>
            <div id="brands-grid" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="dashed-card p-3 flex items-center justify-center brand-logo rounded-2xl bg-white min-h-[80px]">
                <img src="https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/images/One%20Kochi%20Logo.png" alt="One Kochi" className="h-16 w-auto object-contain" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="dashed-card p-8 flex items-center justify-center brand-logo rounded-2xl bg-white min-h-[80px]">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">Who We Are</p>
              <h2 className="serif text-5xl md:text-6xl font-bold tracking-tight mb-6">The <em className="text-[#f58a07]">Glue</em> Between Brands & Talent.</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">Bastian was born from a simple observation: great brands need great creative teams, but great creative teams are hard to find, coordinate, and manage.</p>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">We solve that. Bastian acts as your outsourced creative director — handpicking the right specialists, briefing them properly, managing timelines, and delivering work you're proud of.</p>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { num: "50+", label: "Specialist Freelancers" },
                  { num: "30+", label: "Brands Served" },
                  { num: "100%", label: "Managed End-to-End" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="serif text-4xl font-bold text-[#f58a07]">{s.num}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Curated Talent", desc: "Every freelancer is handpicked and vetted for quality, reliability and craft." },
                { title: "Full Management", desc: "We handle strategy, briefs, timelines, revisions and delivery. You just approve." },
                { title: "360° Coverage", desc: "Strategy to execution — one team, every discipline, zero gaps." },
                { title: "Startup Pricing", desc: "Agency-quality output at a fraction of the retainer cost." },
              ].map(c => (
                <div key={c.title} className="dashed-card p-6 rounded-2xl bg-white hover:border-orange-300 transition-colors">
                  <h4 className="serif font-bold text-lg mb-2">{c.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREELANCER NETWORK */}
        <section id="network" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">The Network</p>
              <h2 className="serif text-5xl font-bold mb-4 tracking-tight">Our <em className="text-[#f58a07]">Freelancer</em> Network</h2>
              <p className="text-gray-400 text-sm mb-10 max-w-xl leading-relaxed">Every specialist is handpicked. Bastian manages all communication, timelines, and quality — you just approve the work.</p>
              <div className="flex flex-wrap gap-3 mb-16">
                {filters.map((cat) => (
                  <button key={cat.value} data-category={cat.value} className={`filter-btn ${cat.value === 'all' ? 'active-tab' : ''}`}
                    onClick={(e) => { e.preventDefault(); (window as any).setFilter(cat.value); }}>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div id="freelancer-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => <div key={i} className="h-36 bg-gray-100/50 rounded-2xl animate-pulse" />)}
              </div>
            </div>

            {/* Team Architect */}
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 h-fit sticky top-28 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-orange-500 text-2xl">✨</span>
                <h3 className="serif font-bold text-2xl uppercase tracking-tighter">Team Architect</h3>
              </div>
              <p className="text-gray-500 text-xs mb-6 leading-relaxed">Describe your goal, and our AI will suggest the perfect specialized team structure from our network.</p>
              <textarea id="project-description" placeholder="e.g. Launch a high-end streetwear brand in Mumbai..." className="w-full p-5 rounded-2xl border border-gray-200 outline-none text-sm mb-6 min-h-[120px] shadow-inner focus:border-orange-500 transition-colors resize-none" />
              <button id="architect-btn" className="w-full btn-orange py-5 rounded-2xl font-bold text-xs uppercase tracking-widest"
                onClick={() => (window as any).architectTeam()}>
                Suggest Team
              </button>
              <div id="architect-result" style={{display:'none'}} className="mt-8 text-sm text-gray-700 leading-relaxed bg-white p-6 rounded-2xl border border-orange-100 italic shadow-sm" />
            </div>
          </div>
        </section>

        {/* OFFERINGS */}
        <section id="offerings" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">What We Deliver</p>
            <h2 className="serif text-6xl font-bold mb-16 tracking-tight">Our <em className="text-[#f58a07]">Offerings</em></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Brand Building", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
                { title: "Digital Marketing", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
                { title: "PR & Media", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title: "Social Media", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
                { title: "Media Buying", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
                { title: "Events & Experiential", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                { title: "Website Design", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> },
                { title: "Content & SEO", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
                { title: "Performance Ads", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
                { title: "Influencer Marketing", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
                { title: "Photography & Film", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> },
                { title: "Creative Direction", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4-4-4 4-4z"/></svg> },
              ].map((o) => (
                <div key={o.title} className="border-[1.5px] border-black rounded-2xl p-6 flex items-center gap-5 hover:bg-black hover:text-white transition-all cursor-pointer group">
                  <span className="w-7 h-7 flex-shrink-0 text-[#f58a07] transition-transform group-hover:scale-110">{o.svg}</span>
                  <span className="serif text-lg font-bold">{o.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">Portfolio</p>
            <h2 className="serif text-6xl font-bold mb-16 tracking-tight">Featured <em className="text-[#f58a07]">Work</em></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Multi-Sensororial Art", description: "Interactive performance branding for a cultural experience brand.", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80", tag: "Brand & Events" },
                { title: "The Shirt Dandy", description: "AI-powered fashion retail launch — brand identity, digital, and in-store experience.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", tag: "Fashion & Retail" },
              ].map((p) => (
                <div key={p.title} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="aspect-video overflow-hidden relative">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-orange-500">{p.tag}</span>
                  </div>
                  <div className="p-8">
                    <h4 className="serif font-bold text-xl mb-2">{p.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRAND AUDIT */}
        <section id="audit" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="audit-box p-12 md:p-16 rounded-[4rem] flex flex-col lg:flex-row justify-between items-center gap-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-blue-500 text-2xl">✨</span>
                  <h3 className="serif font-bold text-4xl md:text-5xl tracking-tight leading-tight">Instant <em className="text-blue-600">Brand Audit</em></h3>
                </div>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed">Input your brand name or social handle, and our AI will perform a real-time strategic analysis of your presence.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input id="audit-input" type="text" placeholder="@yourbrandname or Brand Name" className="flex-1 bg-white border border-blue-100 p-5 rounded-2xl outline-none focus:border-blue-500 shadow-sm text-lg" />
                  <button id="audit-btn" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all text-lg shadow-lg shadow-blue-100"
                    onClick={() => (window as any).performAudit()}>
                    Audit Now
                  </button>
                </div>
              </div>
              <div id="audit-result" className="w-full lg:w-1/3 min-h-[200px] p-8 bg-white/60 backdrop-blur-sm rounded-[3rem] border border-blue-50 text-sm italic text-gray-600 shadow-inner flex items-center justify-center text-center">
                Results will appear here...
              </div>
            </div>
          </div>
        </section>

        {/* JOIN NETWORK */}
        <section id="join" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20 bg-gray-50/40">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">For Freelancers</p>
              <h2 className="serif text-5xl md:text-6xl font-bold tracking-tight italic mb-6">Do work you <span className="text-[#f58a07]">love.</span></h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">We bring you vetted briefs, managed clients, and portfolio-worthy projects — so you can focus entirely on your craft.</p>
              <ul className="space-y-3 mb-10">
                {["Access to quality brand clients","Managed timelines and clear briefs","Payment protection on every project","Flexible — fits around your main job","Community of top creative professionals"].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="w-5 h-px bg-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => toggleModal('join-modal', true)} className="btn-orange px-10 py-4 rounded-xl font-bold">
                Apply to Join the Network →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s.value}
                  className="specialism-btn dashed-card bg-white px-6 py-4 rounded-2xl text-sm text-gray-500"
                  onClick={() => (window as any).openJoinWithSkill(s.value)}>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 px-6 md:px-12 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">Get In Touch</p>
            <h2 className="serif text-7xl font-bold mb-4 tracking-tight"><em>Let&apos;s</em> <span className="text-[#f58a07]">talk.</span></h2>
            <p className="text-gray-400 mb-10 leading-relaxed">Tell us about your brand. We&apos;ll put together the perfect team and get back to you within 24 hours.</p>
            <form id="contact-form" className="space-y-10" onSubmit={handleContactSubmit}>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="border-b-2 border-gray-100 focus-within:border-orange-500 transition-colors py-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                  <input id="fn" type="text" placeholder="Your name" className="w-full bg-transparent outline-none text-lg" required />
                </div>
                <div className="border-b-2 border-gray-100 focus-within:border-orange-500 transition-colors py-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                  <input id="fe" type="email" placeholder="you@brand.com" className="w-full bg-transparent outline-none text-lg" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="border-b-2 border-gray-100 focus-within:border-orange-500 transition-colors py-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Project Type</label>
                  <select id="ftype" className="w-full bg-transparent outline-none text-lg text-gray-500">
                    <option value="">Select a service</option>
                    <option value="brand">Brand Building</option>
                    <option value="digital">Digital Marketing</option>
                    <option value="social">Social Media</option>
                    <option value="media_buying">Media Buying</option>
                    <option value="pr">PR & Media</option>
                    <option value="events">Events & Experiential</option>
                    <option value="web">Website Design</option>
                    <option value="content">Content & SEO</option>
                    <option value="performance">Performance Ads</option>
                    <option value="influencer">Influencer Marketing</option>
                    <option value="film">Photography & Film</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="border-b-2 border-gray-100 focus-within:border-orange-500 transition-colors py-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Budget Range</label>
                  <select id="fbudget" className="w-full bg-transparent outline-none text-lg text-gray-500">
                    <option value="">Select budget</option>
                    <option value="under_50k">Under ₹50,000</option>
                    <option value="50k_2l">₹50,000 – ₹2,00,000</option>
                    <option value="2l_5l">₹2,00,000 – ₹5,00,000</option>
                    <option value="5l_plus">₹5,00,000+</option>
                    <option value="discuss">Let&apos;s Discuss</option>
                  </select>
                </div>
              </div>
              <div className="border-b-2 border-gray-100 focus-within:border-orange-500 transition-colors py-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                <textarea id="fm" placeholder="Tell us about your project and goals..." rows={4} className="w-full bg-transparent outline-none text-lg resize-none" required />
              </div>
              <button type="submit" className="btn-orange w-full md:w-auto px-16 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs">
                Send Inquiry
              </button>
            </form>
            <div id="success-message" style={{display:'none'}} className="py-24 text-center bg-orange-50 rounded-[4rem] italic font-bold text-orange-600 text-2xl">
              Inquiry Sent! We&apos;ll be in touch within 24 hours. ✦
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-16 px-6 md:px-12 border-t border-gray-100 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="serif text-3xl font-bold tracking-tight mb-4">BASTIAN<span className="text-[#f58a07]">.</span></div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">The glue between ambitious brands and specialist freelancers. <br /> Agency-quality output. Startup-friendly cost.</p>
              <div className="flex gap-4">
                {[
                  { label: "Instagram", href: "#" },
                  { label: "LinkedIn", href: "#" },
                  { label: "WhatsApp", href: "#" },
                ].map(s => (
                  <a key={s.label} href={s.href} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition-colors">{s.label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-4">Navigation</p>
              <div className="space-y-3">
                {["About","Network","Offerings","Work","Brand Audit","Join","Contact"].map(item => (
                  <a key={item} href={`#${item.toLowerCase().replace(' ','-')}`} className="block text-sm text-gray-400 hover:text-orange-500 transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-4">Contact</p>
              <div className="space-y-3 text-sm text-gray-400">
                <p>communication@bastian.co.in</p>
                <p>Everywhere in India</p>
                <a href="#contact" className="block mt-4 btn-orange px-6 py-3 rounded-xl font-bold text-xs text-center uppercase tracking-widest">Start a Project</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">© 2026 Bastian Consultants. All rights reserved.</div>
            <div className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Vibe Coded with ✦AI✦ in India</div>
          </div>
        </div>
      </footer>

      <script src="/bastian.js" defer></script>
    </>
  );
}
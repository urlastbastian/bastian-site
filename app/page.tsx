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
    const budget = (document.getElementById('fbudget') as HTMLSelectElement)?.value || '';
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
    const name = (document.getElementById('join-name-inline') as HTMLInputElement)?.value || '';
    const email = (document.getElementById('join-email-inline') as HTMLInputElement)?.value || '';
    const skill = (document.getElementById('join-skill-inline') as HTMLSelectElement)?.value || '';
    const portfolio = (document.getElementById('join-portfolio-inline') as HTMLInputElement)?.value || '';
    await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, skill, portfolio })
    });
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
    { value: "other", label: "Other" },
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

  const offerings = [
    { title: "Brand Building", desc: "From naming and identity to brand guidelines and tone of voice - we build brands that mean something.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
    { title: "Digital Marketing", desc: "Full-funnel digital strategy across search, social, and display - built to convert, not just impress.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
    { title: "PR & Media", desc: "Earned media, press coverage, and reputation management - we get your brand talked about.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { title: "Social Media", desc: "Content strategy, creation, and community management - consistently on-brand, always engaging.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
    { title: "Media Buying", desc: "Strategic placement across print, digital, OOH and broadcast - maximum reach, minimum waste.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
    { title: "Events & Experiential", desc: "Brand activations, product launches, and live experiences that people remember and share.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { title: "Website Design", desc: "Fast, beautiful, conversion-optimised websites - designed to impress and built to perform.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> },
    { title: "Content & SEO", desc: "Blog posts, long-form content, and SEO strategy that builds authority and drives organic growth.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
    { title: "Performance Ads", desc: "Data-driven paid campaigns on Meta, Google, and beyond - optimised for ROAS, not just reach.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
    { title: "Influencer Marketing", desc: "Curated creator partnerships that feel authentic - from micro-influencers to celebrity collaborations.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
    { title: "Photography & Film", desc: "Campaign shoots, product photography, brand films, and reels - visual storytelling at its finest.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> },
    { title: "Creative Direction", desc: "The overarching vision that ties it all together - consistent, compelling, and unmistakably yours.", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4-4-4 4-4z"/></svg> },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        :root { --bastian-orange: #f64523; --bastian-black: #1a1a1a; }
        body { font-family: 'DM Sans', sans-serif; background-color: #ffffff; color: var(--bastian-black); }
        h1, h2, h3, h4, .serif { font-family: 'Cormorant Garamond', serif; }
        .grid-bg { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px); }
        .btn-orange { background-color: var(--bastian-orange); color: white; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .btn-orange:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(246,69,35,0.3); }
        .dashed-card { border: 1.5px dashed #ddd; transition: all 0.3s ease; }
        .brand-logo { filter: grayscale(100%); opacity: 0.4; transition: all 0.4s ease; }
        .brand-logo:hover { filter: grayscale(0%); opacity: 1; transform: scale(1.05); border-color: #f64523 !important; }
        .filter-btn { padding: 6px 16px; border-radius: 99px; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; transition: all 0.3s; border: 1px solid transparent; cursor: pointer; background: none; flex-shrink: 0; }
        .filter-btn:hover { color: #f64523; border-color: #eee; }
        .active-tab { background: #f64523 !important; color: white !important; border-color: #f64523 !important; }
        .loader { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .audit-box { background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1px solid #dbeafe; }
        .ticker-track { animation: ticker 40s linear infinite; display: flex; white-space: nowrap; }
        .ticker-item { display: inline-flex; align-items: center; padding: 0 2.5rem; }
        .ticker-star { color: #f64523; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #f64523; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .mobile-menu { display: none; }
        .mobile-menu.open { display: flex; }
        .shortlist-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 90; transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
        .offering-card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; cursor: pointer; background: white; position: relative; overflow: hidden; transition: box-shadow 0.3s ease; }
        .offering-card::before { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #f64523; transition: width 0.4s cubic-bezier(0.4,0,0.2,1); }
        .offering-card:hover { box-shadow: 0 8px 30px -8px rgba(0,0,0,0.12); }
        .offering-card:hover::before { width: 100%; }
        .offering-icon { color: #f64523; transition: transform 0.3s ease; }
        .offering-card:hover .offering-icon { transform: scale(1.1); }
        .offering-desc { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease 0.1s; }
        .offering-card:hover .offering-desc { max-height: 80px; opacity: 1; }
        .offering-title { font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 15px; margin: 8px 0 0 0; }
        #brands-grid::-webkit-scrollbar { height: 1px; }
        #brands-grid::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 99px; }
        #brands-grid::-webkit-scrollbar-thumb { background: #f64523; border-radius: 99px; }
        #brands-progress { height: 1px; background: #f3f4f6; border-radius: 99px; margin-top: 12px; }
        #brands-thumb { height: 1px; background: #f64523; border-radius: 99px; width: 0%; transition: width 0.1s; }
        .offerings-scroll { overflow-y: auto; scrollbar-width: thin; scrollbar-color: #f64523 #f3f4f6; }
        .offerings-scroll::-webkit-scrollbar { width: 2px; }
        .offerings-scroll::-webkit-scrollbar-thumb { background: #f64523; border-radius: 99px; }
      `}</style>

      {/* FREELANCER PROFILE MODAL */}
      <div id="freelancer-modal" style={{display:'none'}} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
        <div id="freelancer-modal-content" className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"></div>
      </div>

      {/* JOIN MODAL */}
      <div id="join-modal" style={{display:'none'}} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button onClick={() => { const m = document.getElementById('join-modal'); if(m) m.style.display='none'; }} className="absolute top-8 right-8 text-gray-400 hover:text-black text-2xl leading-none">✕</button>
          <h3 className="serif text-4xl font-bold tracking-tight mb-2 italic">Join the <span className="text-[#f64523]">Network</span></h3>
          <p className="text-gray-400 text-sm mb-8">Top 10% talent only. Tell us about your craft.</p>
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <input id="join-name-inline" type="text" placeholder="Full Name" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            <div className="grid grid-cols-2 gap-3">
              <input id="join-email-inline" type="email" placeholder="Email Address" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
              <input id="join-phone-inline" type="tel" placeholder="Phone (optional)" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            </div>
            <select id="join-skill-inline" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500 text-gray-600">
              {skills.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <input id="join-portfolio-inline" type="url" placeholder="Portfolio / LinkedIn URL" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            <button type="submit" className="w-full btn-orange py-5 rounded-2xl font-bold uppercase tracking-widest text-xs">Submit Application</button>
          </form>
        </div>
      </div>

      {/* SHORTLIST BAR */}
      <div id="shortlist-bar" className="shortlist-bar bg-[#1a1a1a] px-6 py-4 flex items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div id="shortlist-avatars" className="flex items-center" style={{paddingLeft:'8px'}}></div>
          <div>
            <p id="shortlist-count" className="text-white font-bold text-sm"></p>
            <p className="text-gray-400 text-xs">Ready to build your dream team?</p>
          </div>
        </div>
        <button onClick={() => (window as any).requestTeam()} className="btn-orange px-8 py-3 rounded-xl font-bold text-sm flex-shrink-0">
          Request this Team
        </button>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 py-4 px-6 md:px-12">
        <div className="flex justify-between items-center">
          <a href="#home"><img src="https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png" alt="Bastian" className="h-7 w-auto object-contain" /></a>
          <div className="hidden lg:flex space-x-10 uppercase text-[10px] font-bold tracking-[0.2em] text-gray-400">
            <a href="#about" className="nav-link hover:text-black transition-colors">About</a>
            <a href="#network" className="nav-link hover:text-black transition-colors">Network</a>
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
        <div id="mobile-menu" className="mobile-menu flex-col pt-6 pb-4 space-y-4 lg:hidden">
          {["about","network","work","audit","join","contact"].map(item => (
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
              Your Brand<br />Deserves a <span className="text-[#f64523]">Dream Team.</span>
            </h1>
            <div className="md:pt-10">
              <p className="text-gray-500 text-xl mb-6 leading-relaxed">
                Bastian is the glue between <strong>ambitious brands</strong> and <strong>specialist freelancers</strong>. We curate your perfect team and manage everything - so you get agency-quality work without the agency price tag.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="#contact" className="text-xs uppercase tracking-widest px-5 py-2.5 bg-orange-50 text-[#f64523] rounded-full font-semibold hover:bg-[#f64523] hover:text-white transition-colors cursor-pointer">For Brands</a>
                <a href="#join" className="text-xs uppercase tracking-widest px-5 py-2.5 bg-gray-50 text-gray-500 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-colors cursor-pointer">For Freelancers</a>
              </div>
              <div className="flex flex-wrap gap-5">
                <a href="#network" className="btn-orange px-10 py-4 rounded-xl font-bold">Explore the Network</a>
                <a href="#work" className="border-2 border-[#f64523] text-[#f64523] px-10 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors">Our Work</a>
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
        <section className="py-20 px-6 md:px-12 border-t border-b border-gray-100 bg-gray-50/30">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#f64523] mb-10 text-center">Brands we&apos;ve collaborated with</p>
            <div className="relative">
              <div id="brands-grid" className="flex gap-6 overflow-x-auto pb-4 pt-2 cursor-grab active:cursor-grabbing" style={{scrollbarWidth:'none'}}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="dashed-card p-6 flex items-center justify-center rounded-2xl bg-white min-h-[100px] min-w-[180px] flex-shrink-0">
                    <div className="w-24 h-10 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div id="brands-progress" className="mx-auto max-w-xs"><div id="brands-thumb"></div></div>
              <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold text-center mt-3">Scroll to explore</p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f64523] mb-4">Who We Are</p>
              <h2 className="serif text-5xl md:text-6xl font-bold tracking-tight mb-6">The <em className="text-[#f64523]">Glue</em> Between Brands & Talent.</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">Bastian was born from a simple observation: great brands need great creative teams, but great creative teams are hard to find, coordinate, and manage.</p>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">We solve that. Bastian acts as your outsourced creative director - handpicking the right specialists, briefing them properly, managing timelines, and delivering work you are proud of.</p>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { num: "50+", label: "Specialist Freelancers" },
                  { num: "30+", label: "Brands Served" },
                  { num: "100%", label: "Managed End-to-End" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="serif text-4xl font-bold text-[#f64523]">{s.num}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Curated Talent", desc: "Every freelancer is handpicked and vetted for quality, reliability and craft." },
                { title: "Full Management", desc: "We handle briefs, timelines, revisions and delivery. You just approve." },
                { title: "360 Coverage", desc: "Strategy to execution - one team, every discipline, zero gaps." },
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
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f64523] mb-4">The Network</p>
              <h2 className="serif text-5xl font-bold mb-4 tracking-tight">Our <em className="text-[#f64523]">Freelancer</em> Network</h2>
              <p className="text-gray-400 text-sm mb-4 max-w-xl leading-relaxed">Every specialist is handpicked. Click any card to view their profile and add them to your team shortlist.</p>
              <div className="flex flex-wrap gap-3 mb-12">
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
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 h-fit sticky top-28 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#f64523] text-2xl">✦</span>
                <h3 className="serif font-bold text-2xl uppercase tracking-tighter">Team Architect</h3>
              </div>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">Describe your project and we will personally recommend the perfect team within 24 hours.</p>
              <input id="architect-email" type="email" placeholder="Your email address" className="w-full p-4 rounded-2xl border border-gray-200 outline-none text-sm mb-3 focus:border-orange-500 transition-colors" />
              <input id="architect-phone" type="tel" placeholder="Phone number (optional)" className="w-full p-4 rounded-2xl border border-gray-200 outline-none text-sm mb-3 focus:border-orange-500 transition-colors" />
              <textarea id="project-description" placeholder="e.g. Launch a high-end streetwear brand in Mumbai..." className="w-full p-5 rounded-2xl border border-gray-200 outline-none text-sm mb-4 min-h-[100px] shadow-inner focus:border-orange-500 transition-colors resize-none" />
              <button id="architect-btn" className="w-full btn-orange py-4 rounded-2xl font-bold text-xs uppercase tracking-widest"
                onClick={() => (window as any).submitArchitect()}>
                Get My Dream Team
              </button>
              <div id="architect-result" style={{display:'none'}} className="mt-4 text-sm text-gray-600 leading-relaxed bg-white p-4 rounded-2xl border border-orange-100 italic text-center">
                ✦ Thanks! We will send your Dream Team recommendation within 24 hours.
              </div>
            </div>
          </div>
        </section>

        {/* WORK + OFFERINGS */}
        <section id="work" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* LEFT - The Deck */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f64523] mb-4">Portfolio</p>
                <h2 className="serif text-5xl font-bold tracking-tight mb-3">The <em className="text-[#f64523]">Deck</em></h2>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">From brand strategy to activations - a look at who we are and what we have built.</p>
                <div style={{position:'relative',width:'100%',height:0,paddingTop:'56.25%',borderRadius:'12px',overflow:'hidden',boxShadow:'0 2px 8px 0 rgba(63,69,81,0.16)'}}>
                  <iframe
                    loading="lazy"
                    style={{position:'absolute',width:'100%',height:'100%',top:0,left:0,border:'none',padding:0,margin:0}}
                    src="https://www.canva.com/design/DAHNgt89NrA/nbZtDqA5ecd7_fLl2uz9_Q/view?embed"
                    allowFullScreen
                    allow="fullscreen"
                    title="Bastian Deck"
                  />
                </div>
                <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-3 mb-3">Taking too long? Open it directly below.</p>
                <div className="flex gap-3">
                  <a href="https://www.canva.com/design/DAHNgt89NrA/nbZtDqA5ecd7_fLl2uz9_Q/view" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 border border-gray-200 rounded-xl text-gray-500 hover:border-[#f64523] hover:text-[#f64523] transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    View in Browser
                  </a>
                  <a href="https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Your%20Last%20Bastian..pdf" download
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 border border-gray-200 rounded-xl text-gray-500 hover:border-[#f64523] hover:text-[#f64523] transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download PDF
                  </a>
                </div>
              </div>
              {/* RIGHT - Offerings */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f64523] mb-4">What We Deliver</p>
                <h2 className="serif text-5xl font-bold tracking-tight mb-6">Our <em className="text-[#f64523]">Offerings</em></h2>
                <div className="offerings-scroll grid grid-cols-2 gap-2" style={{maxHeight:'420px'}}>
                  {offerings.map((o) => (
                    <div key={o.title} className="offering-card">
                      <span className="offering-icon w-5 h-5 block">{o.svg}</span>
                      <p className="offering-title">{o.title}</p>
                      <div className="offering-desc">
                        <p className="text-xs text-gray-400 leading-relaxed mt-2">{o.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND AUDIT */}
        <section id="audit" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="audit-box p-12 md:p-16 rounded-[4rem] flex flex-col lg:flex-row justify-between items-center gap-12">
              <div className="max-w-2xl w-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-blue-500 text-2xl">✦</span>
                  <h3 className="serif font-bold text-4xl md:text-5xl tracking-tight leading-tight">Free <em className="text-blue-600">Brand Audit</em></h3>
                </div>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">Tell us your brand name, social handle, or website and we will send you a sharp, honest strategic audit within 24 hours - on us.</p>
                <div className="flex flex-col gap-3 max-w-lg">
                  <input id="audit-brand" type="text" placeholder="Brand name, @handle, or website URL" className="bg-white border border-blue-100 p-4 rounded-2xl outline-none focus:border-blue-500 shadow-sm" />
                  <input id="audit-email" type="email" placeholder="Your email address" className="bg-white border border-blue-100 p-4 rounded-2xl outline-none focus:border-blue-500 shadow-sm" />
                  <input id="audit-phone" type="tel" placeholder="Phone number (optional)" className="bg-white border border-blue-100 p-4 rounded-2xl outline-none focus:border-blue-500 shadow-sm" />
                  <button id="audit-btn" className="bg-[#1a1a1a] text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all text-sm shadow-lg uppercase tracking-widest"
                    onClick={() => (window as any).submitAudit()}>
                    Request My Free Audit
                  </button>
                </div>
                <div id="audit-result" style={{display:'none'}} className="mt-6 p-5 bg-white/80 rounded-2xl border border-blue-100 text-sm italic text-gray-600 text-center">
                  ✦ Thanks! Your brand audit will be in your inbox within 24 hours.
                </div>
              </div>
              <div className="w-full lg:w-1/3 p-8 bg-white/60 backdrop-blur-sm rounded-[3rem] border border-blue-50 shadow-inner">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-4">What you will get</p>
                {[
                  { title: "The Vibe", desc: "What energy does your brand project right now?" },
                  { title: "The Gap", desc: "Your biggest strategic weakness, identified." },
                  { title: "The Move", desc: "One bold recommendation to act on immediately." },
                ].map(item => (
                  <div key={item.title} className="mb-4">
                    <p className="serif font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* JOIN + CONTACT */}
        <section id="join" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20 bg-gray-50/40">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

            {/* FOR FREELANCERS */}
            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f64523] mb-3">For Freelancers</p>
              <h2 className="serif text-4xl font-bold tracking-tight italic mb-3">Do work you <span className="text-[#f64523]">love.</span></h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">We bring you vetted briefs, managed clients, and portfolio-worthy projects - so you can focus entirely on your craft.</p>
              <ul className="space-y-2 mb-8">
                {["Access to quality brand clients","Managed timelines and clear briefs","Payment protection on every project","Flexible - fits around your main job","Community of top creative professionals"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="w-4 h-px bg-[#f64523] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => { const m = document.getElementById('join-modal'); if(m) m.style.display='flex'; }} className="btn-orange px-10 py-4 rounded-xl font-bold w-full text-center">
                Apply to Join the Network
              </button>
            </div>

            {/* FOR BUSINESSES */}
            <div id="contact" className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm scroll-mt-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f64523] mb-3">For Businesses</p>
              <h2 className="serif text-4xl font-bold tracking-tight italic mb-3">Let&apos;s <span className="text-[#f64523]">talk.</span></h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Tell us about your brand. We will get back to you within 24 hours.</p>
              <form id="contact-form" className="space-y-3" onSubmit={handleContactSubmit}>
                <input id="fn" type="text" placeholder="Name" required className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500 text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input id="fe" type="email" placeholder="Email" required className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500 text-sm" />
                  <input id="fphone" type="tel" placeholder="Phone (optional)" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500 text-sm" />
                </div>
                <select id="ftype" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500 text-gray-600 text-sm">
                  <option value="">Project Type</option>
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

                <textarea id="fm" placeholder="Message" rows={3} required className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500 text-sm resize-none" />
                <button type="submit" className="w-full btn-orange py-4 rounded-xl font-bold uppercase tracking-widest text-xs">Send Inquiry</button>
              </form>
              <div id="success-message" style={{display:'none'}} className="mt-4 py-6 text-center bg-orange-50 rounded-2xl italic font-bold text-[#f64523] text-sm">
                Inquiry sent! We will be in touch within 24 hours. ✦
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-16 px-6 md:px-12 border-t border-gray-100 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="mb-4"><img src="https://tuvojbqvhbitedvgtzjn.supabase.co/storage/v1/object/public/Portfolio/Bastian%20Logo_Fin_Long.png" alt="Bastian" className="h-8 w-auto object-contain" /></div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">Your Last Bastian.</p>
              <div className="flex gap-4">
                {[
                  { label: "Instagram", href: "https://www.instagram.com/bastianconsultants/" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/bastianconsultants/" },
                  { label: "WhatsApp", href: "https://wa.me/917259803027" }
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#f64523] transition-colors">{s.label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-4">Navigation</p>
              <div className="space-y-3">
                {["About","Network","Work","Brand Audit","Join","Contact"].map(item => (
                  <a key={item} href={`#${item.toLowerCase().replace(' ','-')}`} className="block text-sm text-gray-400 hover:text-[#f64523] transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-4">Contact</p>
              <div className="space-y-3 text-sm text-gray-400">
                <p>communication@bastian.co.in</p>
                <a href="#contact" className="block mt-4 btn-orange px-6 py-3 rounded-xl font-bold text-xs text-center uppercase tracking-widest">Start a Project</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">© 2026 Bastian Consultants. All rights reserved.</div>
            <div className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Vibe Coded with ✦ AI ✦ in India</div>
          </div>
        </div>
      </footer>

      <script src="/bastian.js" defer></script>
    </>
  );
}
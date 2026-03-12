"use client";

export default function Home() {
  // ── REACT HANDLERS ──
  function toggleModal(id: string, show: boolean) {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'flex' : 'none';
  }
  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const contact_name = (document.getElementById('fn') as HTMLInputElement).value;
    const email = (document.getElementById('fe') as HTMLInputElement).value;
    const message = (document.getElementById('fm') as HTMLTextAreaElement).value;
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact_name, email, message, brand_name: '' })
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
        .filter-btn { padding: 6px 16px; border-radius: 99px; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; transition: all 0.3s; border: 1px solid transparent; cursor: pointer; background: none; }
        .filter-btn:hover { color: var(--bastian-orange); border-color: #eee; }
        .active-tab { background: var(--bastian-orange) !important; color: white !important; border-color: var(--bastian-orange) !important; }
        .loader { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .audit-box { background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1px solid #dbeafe; }
        .ticker-track { animation: ticker 32s linear infinite; display: flex; gap: 3rem; white-space: nowrap; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      {/* JOIN MODAL */}
      <div id="join-modal" style={{display:'none'}} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl relative">
          <button onClick={() => toggleModal('join-modal', false)} className="absolute top-8 right-8 text-gray-400 hover:text-black text-2xl leading-none">✕</button>
          <h3 className="serif text-4xl font-bold tracking-tight mb-4 italic">Join the Network</h3>
          <p className="text-gray-400 text-sm mb-10">Top 10% talent? Tell us about your craft.</p>
          <form onSubmit={handleJoinSubmit} className="space-y-6">
            <input id="join-name" type="text" placeholder="Full Name" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            <input id="join-email" type="email" placeholder="Email Address" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            <select id="join-skill" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500 text-gray-500">
              <option value="web">Web Development</option>
              <option value="text">Copywriting / SEO</option>
              <option value="image">Graphic Design / Photography</option>
              <option value="design">UI/UX Design</option>
              <option value="social">Social Media</option>
              <option value="strategy">Brand Strategy</option>
              <option value="video">Video & Motion</option>
              <option value="pr">PR & Communications</option>
            </select>
            <input id="join-portfolio" type="url" placeholder="Portfolio / LinkedIn URL" required className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:border-orange-500" />
            <button type="submit" className="w-full btn-orange py-5 rounded-2xl font-bold uppercase tracking-widest text-xs">Submit Portfolio</button>
          </form>
        </div>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 py-5 px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="serif text-2xl font-bold tracking-tight">BASTIAN<span className="text-[#f58a07]">.</span></a>
        <div className="hidden lg:flex space-x-12 uppercase text-[10px] font-bold tracking-[0.2em] text-gray-400">
          <a href="#network" className="hover:text-orange-500 transition-colors">Freelancer Network</a>
          <a href="#offerings" className="hover:text-orange-500 transition-colors">Offerings</a>
          <a href="#work" className="hover:text-orange-500 transition-colors">Work</a>
          <a href="#join" className="hover:text-orange-500 transition-colors">Join Network</a>
        </div>
        <a href="#contact" className="btn-orange px-8 py-2.5 rounded-xl font-bold text-sm">Contact</a>
      </nav>

      <main>
        {/* HERO */}
        <section id="home" className="grid-bg min-h-[75vh] flex items-center px-6 md:px-12 py-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start w-full">
            <h1 className="serif text-6xl md:text-8xl font-bold leading-[1.05] tracking-tight italic">
              Your Brand Deserves <br />a <span className="text-[#f58a07]">Dream Team.</span>
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
              ["Social Media","Performance Marketing","Brand Strategy","Content & SEO","Event Management","Website Design","PR & Communications","Creative Direction"].map((item) => (
                <span key={`${i}-${item}`} className="text-xs uppercase tracking-widest text-[#f58a07]/70 flex-shrink-0">
                  {item} <span className="text-[#f58a07] mx-4">✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* BRANDS */}
        <section className="py-24 px-6 md:px-12 border-t border-b border-gray-100 bg-gray-50/30">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-12 text-center">Brands we&apos;ve scaled</p>
            <div id="brands-grid" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="dashed-card p-8 flex items-center justify-center brand-logo rounded-2xl bg-white min-h-[80px]">
                <img src="https://i.ibb.co/3mKzPzG/One-Kochi-Logo.png" alt="One Kochi" className="h-8 w-auto object-contain" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="dashed-card p-8 flex items-center justify-center brand-logo rounded-2xl bg-white min-h-[80px]">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
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
              <h2 className="serif text-5xl font-bold mb-4 tracking-tight">Our <em>Freelancer</em> Network</h2>
              <p className="text-gray-400 text-sm mb-10 max-w-xl leading-relaxed">Every specialist is handpicked. Bastian manages all communication, timelines, and quality — you just approve the work.</p>
              <div className="flex flex-wrap gap-4 mb-16">
                {["all","web","text","image","design"].map((cat) => (
                  <button key={cat} data-category={cat} className={`filter-btn ${cat === 'all' ? 'active-tab' : ''}`}
                    onClick={(e) => { e.preventDefault(); (window as any).setFilter(cat); }}>
                    {cat === 'all' ? 'All Talent' : cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            <h2 className="serif text-6xl font-bold mb-16 tracking-tight">Our <em>Offerings</em></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Brand Building", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
                { title: "Digital Marketing", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
                { title: "PR & Media", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title: "Social Media", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
                { title: "Events & Experiential", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                { title: "Website Design", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> },
                { title: "Content & SEO", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
                { title: "Performance Ads", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
              ].map((o) => (
                <div key={o.title} className="border-[1.5px] border-black rounded-2xl p-8 flex items-center gap-6 hover:bg-black hover:text-white transition-all cursor-pointer group">
                  <span className="w-7 h-7 flex-shrink-0 text-[#f58a07] group-hover:text-[#f58a07] transition-transform group-hover:scale-110">{o.svg}</span>
                  <span className="serif text-xl font-bold">{o.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="py-24 px-6 md:px-12 border-b border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">Portfolio</p>
            <h2 className="serif text-6xl font-bold mb-16 tracking-tight">Featured <em>Work</em></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Multi-Sensororial Art", description: "Interactive performance branding.", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80" },
                { title: "The Shirt Dandy", description: "AI-Powered fashion retail launch.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
              ].map((p) => (
                <div key={p.title} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
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
                  <h3 className="serif font-bold text-4xl md:text-5xl tracking-tight italic leading-tight">Instant Brand Audit</h3>
                </div>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed">Input your brand name or social handle, and our AI will perform a real-time strategic analysis of your presence.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input id="audit-input" type="text" placeholder="@yourbrandname" className="flex-1 bg-white border border-blue-100 p-5 rounded-2xl outline-none focus:border-blue-500 shadow-sm text-lg" />
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
              {["Brand Strategy","Graphic Design","Copywriting & SEO","Web Development","Social Media","Photography","Video & Motion","UI/UX Design"].map((spec) => (
                <div key={spec} className="dashed-card bg-white px-6 py-4 rounded-2xl text-sm text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors cursor-default">
                  {spec}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 px-6 md:px-12 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">Get In Touch</p>
            <h2 className="serif text-7xl font-bold mb-4 tracking-tight"><em>Let&apos;s</em> talk.</h2>
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
      <footer className="py-16 px-6 border-t border-gray-100 flex flex-col items-center gap-4">
        <div className="serif text-xl font-bold tracking-tight">BASTIAN<span className="text-[#f58a07]">.</span></div>
        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">© 2026 Bastian Studio Consultants. All rights reserved.</div>
      </footer>

      {/* ALL JS LOGIC */}
      <script dangerouslySetInnerHTML={{ __html: `
        var allFreelancers = [];
        var currentFilter = 'all';

        async function loadFreelancers() {
          try {
            const res = await fetch('/api/freelancers');
            const data = await res.json();
            if (data.freelancers && data.freelancers.length > 0) {
              allFreelancers = data.freelancers;
            }
          } catch(e) {
            console.log('Could not load freelancers:', e);
          }
          renderFreelancers();
        }

        function renderFreelancers() {
          var filtered = currentFilter === 'all' ? allFreelancers : allFreelancers.filter(function(f){ return f.category === currentFilter; });
          var grid = document.getElementById('freelancer-grid');
          if (!grid) return;
          var cards = filtered.map(function(f){
            return '<div class="dashed-card p-4 rounded-2xl flex flex-col items-center text-center bg-white shadow-sm hover:border-orange-500 transition-all duration-300 group"><div class="w-16 h-16 mb-3 rounded-full overflow-hidden border border-gray-100"><img src="' + f.image + '" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" /></div><h4 class="font-bold text-sm mb-1">' + f.name + '</h4><p class="text-[9px] text-orange-500 font-bold uppercase tracking-widest">' + f.role + '</p></div>';
          }).join('');
          var joinCard = '<div onclick="toggleModalGlobal(\'join-modal\', true)" class="dashed-card p-4 rounded-2xl flex flex-col items-center justify-center text-center bg-orange-50 border-orange-200 cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 min-h-[140px]"><div class="w-10 h-10 rounded-full border border-dashed border-orange-300 flex items-center justify-center mb-2 text-orange-500 text-xl">+</div><h4 class="font-bold text-xs italic">Join the Network</h4></div>';
          grid.innerHTML = cards + joinCard;
        }

        window.toggleModalGlobal = function(id, show) {
          var el = document.getElementById(id);
          if (el) el.style.display = show ? 'flex' : 'none';
        };

        window.setFilter = function(cat) {
          currentFilter = cat;
          document.querySelectorAll('.filter-btn').forEach(function(btn){
            btn.classList.toggle('active-tab', btn.dataset.category === cat);
          });
          renderFreelancers();
        };

        async function callClaude(userPrompt, systemPrompt) {
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userPrompt, systemPrompt })
  });
  const data = await response.json();
  return data.text || 'No response generated.';
}

        window.architectTeam = async function() {
          var btn = document.getElementById('architect-btn');
          var res = document.getElementById('architect-result');
          var desc = document.getElementById('project-description').value;
          if (!desc.trim()) return;
          btn.disabled = true;
          btn.innerHTML = '<span class="loader"></span>';
          res.style.display = 'block';
          res.innerHTML = 'Building your dream team...';
          try {
            var text = await callClaude(desc, 'You are Bastian, a creative marketing agency. Suggest 3-4 specialist freelancer roles that would form the perfect team for this project. Give each role a creative title and a one-line description. Explain how together they form the Dream Team. Keep it punchy and inspiring.');
            res.innerHTML = text;
          } catch(e) {
            res.innerHTML = 'Unable to connect right now. Please try again shortly.';
          }
          btn.disabled = false;
          btn.innerHTML = 'Suggest Team';
        };

        window.performAudit = async function() {
          var btn = document.getElementById('audit-btn');
          var res = document.getElementById('audit-result');
          var val = document.getElementById('audit-input').value;
          if (!val.trim()) return;
          btn.disabled = true;
          btn.innerHTML = '<span class="loader"></span>';
          res.innerHTML = 'Analysing brand...';
          try {
            var text = await callClaude(val, 'You are a sharp brand strategist at Bastian. Perform a punchy honest brand audit in 3 short paragraphs: 1) The Vibe — what energy does this brand project? 2) The Gap — biggest strategic weakness? 3) The Move — one bold recommendation. Be direct and inspiring.');
            res.innerHTML = text;
          } catch(e) {
            res.innerHTML = 'Unable to analyse right now. Please try again shortly.';
          }
          btn.disabled = false;
          btn.innerHTML = 'Audit Now';
        };

        document.addEventListener('DOMContentLoaded', function() { loadFreelancers(); });
      `}} />
    </>
  );
}
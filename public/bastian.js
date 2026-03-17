var allFreelancers = [];
var currentFilter = 'all';
var shortlist = [];

async function loadFreelancers() {
  try {
    var res = await fetch('/api/freelancers');
    var data = await res.json();
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
    var inShortlist = shortlist.find(function(s){ return s.id === f.id; });
    var availDot = f.availability ? '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;margin-right:4px;"></span>' : '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#d1d5db;margin-right:4px;"></span>';
    return '<div onclick="openFreelancerModal(' + f.id + ')" class="dashed-card p-4 rounded-2xl flex flex-col items-center text-center bg-white shadow-sm hover:border-orange-500 transition-all duration-300 group cursor-pointer relative">'
      + (inShortlist ? '<div style="position:absolute;top:8px;right:8px;background:#f58a07;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;">✓</div>' : '')
      + '<div style="width:64px;height:64px;border-radius:50%;overflow:hidden;border:1px solid #f3f4f6;margin-bottom:12px;">'
      + '<img src="' + f.image + '" style="width:100%;height:100%;object-fit:cover;filter:grayscale(100%);" onmouseover="this.style.filter=\'grayscale(0%)\'" onmouseout="this.style.filter=\'grayscale(100%)\'" /></div>'
      + '<h4 style="font-weight:700;font-size:13px;margin-bottom:4px;">' + f.name + '</h4>'
      + '<p style="font-size:9px;color:#f58a07;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">' + f.role + '</p>'
      + '<p style="font-size:10px;color:#9ca3af;display:flex;align-items:center;justify-content:center;">' + availDot + (f.availability ? 'Available' : 'Busy') + '</p>'
      + '</div>';
  }).join('');
  var joinCard = '<div onclick="toggleModalGlobal(\'join-modal\', true)" class="dashed-card p-4 rounded-2xl flex flex-col items-center justify-center text-center bg-orange-50 border-orange-200 cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 min-h-[140px]"><div style="width:40px;height:40px;border-radius:50%;border:1px dashed #fdba74;display:flex;align-items:center;justify-content:center;margin-bottom:8px;color:#f58a07;font-size:20px;">+</div><h4 style="font-weight:700;font-size:12px;font-style:italic;">Join the Network</h4></div>';
  grid.innerHTML = cards + joinCard;
}

window.openFreelancerModal = function(id) {
  var f = allFreelancers.find(function(x){ return x.id === id; });
  if (!f) return;
  var inShortlist = shortlist.find(function(s){ return s.id === f.id; });
  var skills = f.skills ? f.skills.split(',').map(function(s){ return '<span style="display:inline-block;padding:3px 10px;background:#fff7ed;color:#f58a07;border-radius:99px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin:2px;">' + s.trim() + '</span>'; }).join('') : '';
  var modal = document.getElementById('freelancer-modal');
  var content = document.getElementById('freelancer-modal-content');
  content.innerHTML = ''
    + '<button onclick="closeFreelancerModal()" style="position:absolute;top:24px;right:24px;color:#9ca3af;font-size:24px;line-height:1;background:none;border:none;cursor:pointer;">✕</button>'
    + '<div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;">'
    + '<div style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid #f3f4f6;">'
    + '<img src="' + f.image + '" style="width:100%;height:100%;object-fit:cover;" /></div>'
    + '<div>'
    + '<h3 style="font-family:\'Cormorant Garamond\',serif;font-size:28px;font-weight:700;margin-bottom:4px;">' + f.name + '</h3>'
    + '<p style="color:#f58a07;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">' + f.role + '</p>'
    + '<p style="font-size:11px;color:#9ca3af;display:flex;align-items:center;gap:4px;">'
    + (f.availability ? '<span style="width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;"></span>Available for projects' : '<span style="width:8px;height:8px;border-radius:50%;background:#d1d5db;display:inline-block;"></span>Currently busy')
    + '</p></div></div>'
    + (f.bio ? '<p style="color:#6b7280;font-size:14px;line-height:1.7;margin-bottom:20px;">' + f.bio + '</p>' : '')
    + (skills ? '<div style="margin-bottom:24px;">' + skills + '</div>' : '')
    + '<button onclick="toggleShortlist(' + f.id + ')" id="shortlist-btn-' + f.id + '" style="width:100%;padding:16px;border-radius:16px;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;transition:all 0.3s;border:none;background:' + (inShortlist ? '#1a1a1a' : '#f58a07') + ';color:white;">'
    + (inShortlist ? '✓ Added to Your Team' : '+ Add to Your Team') + '</button>';
  modal.style.display = 'flex';
};

window.closeFreelancerModal = function() {
  document.getElementById('freelancer-modal').style.display = 'none';
};

window.toggleShortlist = function(id) {
  var f = allFreelancers.find(function(x){ return x.id === id; });
  if (!f) return;
  var idx = shortlist.findIndex(function(s){ return s.id === id; });
  if (idx > -1) {
    shortlist.splice(idx, 1);
  } else {
    shortlist.push(f);
  }
  updateShortlistBar();
  renderFreelancers();
  // Update button inside modal
  var btn = document.getElementById('shortlist-btn-' + id);
  if (btn) {
    var inShortlist = shortlist.find(function(s){ return s.id === id; });
    btn.style.background = inShortlist ? '#1a1a1a' : '#f58a07';
    btn.innerHTML = inShortlist ? '✓ Added to Your Team' : '+ Add to Your Team';
  }
};

function updateShortlistBar() {
  var bar = document.getElementById('shortlist-bar');
  if (!bar) return;
  if (shortlist.length === 0) {
    bar.style.transform = 'translateY(100%)';
    return;
  }
  bar.style.transform = 'translateY(0)';
  var avatars = shortlist.slice(0,4).map(function(f){
    return '<img src="' + f.image + '" style="width:36px;height:36px;border-radius:50%;border:2px solid white;object-fit:cover;margin-left:-8px;" />';
  }).join('');
  document.getElementById('shortlist-avatars').innerHTML = avatars;
  document.getElementById('shortlist-count').innerHTML = shortlist.length + ' specialist' + (shortlist.length > 1 ? 's' : '') + ' selected';
}

window.requestTeam = function() {
  var names = shortlist.map(function(f){ return f.name + ' (' + f.role + ')'; }).join(', ');
  var msg = document.getElementById('fm');
  if (msg) msg.value = "I'd like to work with: " + names + ".\n\nTell us more about your project...";
  document.getElementById('shortlist-bar').style.transform = 'translateY(100%)';
  var contact = document.getElementById('contact');
  if (contact) contact.scrollIntoView({ behavior: 'smooth' });
};

window.toggleModalGlobal = function(id, show) {
  var el = document.getElementById(id);
  if (el) el.style.display = show ? 'flex' : 'none';
};

window.openJoinWithSkill = function(skill) {
  var select = document.getElementById('join-skill');
  if (select && skill) select.value = skill;
  window.toggleModalGlobal('join-modal', true);
};

window.setFilter = function(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(function(btn){
    btn.classList.toggle('active-tab', btn.dataset.category === cat);
  });
  renderFreelancers();
};

async function callClaude(userPrompt, systemPrompt) {
  var response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userPrompt: userPrompt, systemPrompt: systemPrompt })
  });
  var data = await response.json();
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
    var text = await callClaude(val, 'You are a sharp brand strategist at Bastian. Perform a punchy honest brand audit in 3 short paragraphs: 1) The Vibe - what energy does this brand project? 2) The Gap - biggest strategic weakness? 3) The Move - one bold recommendation. Be direct and inspiring.');
    res.innerHTML = text;
  } catch(e) {
    res.innerHTML = 'Unable to analyse right now. Please try again shortly.';
  }
  btn.disabled = false;
  btn.innerHTML = 'Audit Now';
};

async function loadBrands() {
  try {
    var res = await fetch('/api/brands');
    var data = await res.json();
    var grid = document.getElementById('brands-grid');
    if (!grid || !data.brands || data.brands.length === 0) return;
    grid.innerHTML = data.brands.map(function(b){
      return '<div class="dashed-card p-4 flex items-center justify-center brand-logo rounded-2xl bg-white min-h-[80px] min-w-[160px] flex-shrink-0">'
        + '<img src="' + b.logo_url + '" alt="' + b.name + '" style="height:56px;width:auto;max-width:140px;object-fit:contain;" /></div>';
    }).join('');
  } catch(e) {
    console.log('Could not load brands:', e);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadFreelancers();
  loadBrands();
  var grid = document.getElementById('brands-grid');
  var thumb = document.getElementById('brands-thumb');
  if (grid && thumb) {
    grid.addEventListener('scroll', function() {
      var pct = grid.scrollLeft / (grid.scrollWidth - grid.clientWidth);
      thumb.style.width = Math.round(pct * 100) + '%';
    });
  }
});
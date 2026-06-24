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
  if (filtered.length === 0 && allFreelancers.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#9ca3af;font-size:13px;padding:40px;">Loading talent...</div>';
    return;
  }
  var cards = filtered.map(function(f){
    var inShortlist = shortlist.find(function(s){ return s.id === f.id; });
    var availDot = f.availability
      ? '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;margin-right:4px;"></span>'
      : '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#d1d5db;margin-right:4px;"></span>';
    return '<div onclick="openFreelancerModal(' + f.id + ')" style="border:1.5px dashed #ddd;border-radius:16px;padding:16px;display:flex;flex-direction:column;align-items:center;text-align:center;background:white;cursor:pointer;transition:all 0.3s;position:relative;" onmouseover="this.style.borderColor=\'#f64523\'" onmouseout="this.style.borderColor=\'#ddd\'">'
      + (inShortlist ? '<div style="position:absolute;top:8px;right:8px;background:#f64523;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;">✓</div>' : '')
      + '<div style="width:64px;height:64px;border-radius:50%;overflow:hidden;border:1px solid #f3f4f6;margin-bottom:12px;">'
      + '<img src="' + f.image + '" style="width:100%;height:100%;object-fit:cover;filter:grayscale(100%);transition:filter 0.3s;" onmouseover="this.style.filter=\'grayscale(0%)\'" onmouseout="this.style.filter=\'grayscale(100%)\'" /></div>'
      + '<h4 style="font-weight:700;font-size:13px;margin-bottom:4px;">' + f.name + '</h4>'
      + '<p style="font-size:9px;color:#f64523;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">' + f.role + '</p>'
      + '<p style="font-size:10px;color:#9ca3af;display:flex;align-items:center;justify-content:center;">' + availDot + (f.availability ? 'Available' : 'Busy') + '</p>'
      + '</div>';
  }).join('');
  var joinCard = '<div onclick="document.getElementById(\'join\').scrollIntoView({behavior:\'smooth\'})" style="border:1.5px dashed #fdba74;border-radius:16px;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff7ed;cursor:pointer;min-height:140px;transition:all 0.3s;" onmouseover="this.style.background=\'#f64523\';this.style.color=\'white\'" onmouseout="this.style.background=\'#fff7ed\';this.style.color=\'\'"><div style="width:40px;height:40px;border-radius:50%;border:1px dashed #fdba74;display:flex;align-items:center;justify-content:center;margin-bottom:8px;color:#f64523;font-size:20px;">+</div><h4 style="font-weight:700;font-size:12px;font-style:italic;">Join the Network</h4></div>';
  grid.innerHTML = cards + joinCard;
}

window.openFreelancerModal = function(id) {
  var f = allFreelancers.find(function(x){ return x.id === id; });
  if (!f) return;
  var inShortlist = shortlist.find(function(s){ return s.id === f.id; });
  var skills = f.skills ? f.skills.split(',').map(function(s){
    return '<span style="display:inline-block;padding:3px 10px;background:#fff7ed;color:#f64523;border-radius:99px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin:2px;">' + s.trim() + '</span>';
  }).join('') : '';
  var modal = document.getElementById('freelancer-modal');
  var content = document.getElementById('freelancer-modal-content');
  content.innerHTML = ''
    + '<button onclick="closeFreelancerModal()" style="position:absolute;top:24px;right:24px;color:#9ca3af;font-size:24px;line-height:1;background:none;border:none;cursor:pointer;">✕</button>'
    + '<div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;">'
    + '<div style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid #f3f4f6;">'
    + '<img src="' + f.image + '" style="width:100%;height:100%;object-fit:cover;" /></div>'
    + '<div>'
    + '<h3 style="font-family:\'Cormorant Garamond\',serif;font-size:28px;font-weight:700;margin-bottom:4px;">' + f.name + '</h3>'
    + '<p style="color:#f64523;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">' + f.role + '</p>'
    + '<p style="font-size:11px;color:#9ca3af;display:flex;align-items:center;gap:4px;">'
    + (f.availability ? '<span style="width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;"></span>Available for projects' : '<span style="width:8px;height:8px;border-radius:50%;background:#d1d5db;display:inline-block;"></span>Currently busy')
    + '</p></div></div>'
    + (f.bio ? '<p style="color:#6b7280;font-size:14px;line-height:1.7;margin-bottom:20px;">' + f.bio + '</p>' : '')
    + (skills ? '<div style="margin-bottom:24px;">' + skills + '</div>' : '')
    + '<button onclick="toggleShortlist(' + f.id + ')" id="shortlist-btn-' + f.id + '" style="width:100%;padding:16px;border-radius:16px;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;transition:all 0.3s;border:none;background:' + (inShortlist ? '#1a1a1a' : '#f64523') + ';color:white;">'
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
  if (idx > -1) { shortlist.splice(idx, 1); } else { shortlist.push(f); }
  updateShortlistBar();
  renderFreelancers();
  var btn = document.getElementById('shortlist-btn-' + id);
  if (btn) {
    var inShortlist = shortlist.find(function(s){ return s.id === id; });
    btn.style.background = inShortlist ? '#1a1a1a' : '#f64523';
    btn.innerHTML = inShortlist ? '✓ Added to Your Team' : '+ Add to Your Team';
  }
};

function updateShortlistBar() {
  var bar = document.getElementById('shortlist-bar');
  if (!bar) return;
  if (shortlist.length === 0) { bar.style.transform = 'translateY(100%)'; return; }
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
  if (msg) msg.value = "I'd like to work with: " + names + ".\n\nProject details...";
  document.getElementById('shortlist-bar').style.transform = 'translateY(100%)';
  var contact = document.getElementById('contact');
  if (contact) contact.scrollIntoView({ behavior: 'smooth' });
};

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

window.submitArchitect = async function() {
  var btn = document.getElementById('architect-btn');
  var res = document.getElementById('architect-result');
  var email = document.getElementById('architect-email') ? document.getElementById('architect-email').value : '';
  var desc = document.getElementById('project-description') ? document.getElementById('project-description').value : '';
  if (!email.trim() || !desc.trim()) { alert('Please fill in your email and project description.'); return; }
  btn.disabled = true;
  btn.innerHTML = 'Sending...';
  try {
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact_name: '', email: email, message: 'DREAM TEAM REQUEST: ' + desc, brand_name: '', budget: '', project_type: 'team_architect' })
    });
    res.style.display = 'block';
  } catch(e) { res.style.display = 'block'; }
  btn.disabled = false;
  btn.innerHTML = 'Get My Dream Team';
};

window.submitAudit = async function() {
  var btn = document.getElementById('audit-btn');
  var res = document.getElementById('audit-result');
  var brand = document.getElementById('audit-brand') ? document.getElementById('audit-brand').value : '';
  var email = document.getElementById('audit-email') ? document.getElementById('audit-email').value : '';
  if (!brand.trim() || !email.trim()) { alert('Please fill in your brand name and email.'); return; }
  btn.disabled = true;
  btn.innerHTML = 'Sending...';
  try {
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact_name: '', email: email, message: 'BRAND AUDIT REQUEST: ' + brand, brand_name: brand, budget: '', project_type: 'brand_audit' })
    });
    res.style.display = 'block';
  } catch(e) { res.style.display = 'block'; }
  btn.disabled = false;
  btn.innerHTML = 'Request My Free Audit';
};

async function loadBrands() {
  try {
    var res = await fetch('/api/brands');
    var data = await res.json();
    var grid = document.getElementById('brands-grid');
    if (!grid || !data.brands || data.brands.length === 0) return;
    grid.innerHTML = data.brands.map(function(b){
      return '<div style="border:1.5px dashed #ddd;border-radius:16px;padding:16px;display:flex;align-items:center;justify-content:center;background:white;min-height:100px;min-width:180px;flex-shrink:0;filter:grayscale(100%);opacity:0.5;transition:all 0.4s;" onmouseover="this.style.filter=\'grayscale(0%)\';this.style.opacity=\'1\';this.style.borderColor=\'#f64523\'" onmouseout="this.style.filter=\'grayscale(100%)\';this.style.opacity=\'0.5\';this.style.borderColor=\'#ddd\'">'
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
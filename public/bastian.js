var allFreelancers = [];
var currentFilter = 'all';

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
    return '<a href="' + (f.portfolio_url || '#') + '" target="_blank" rel="noopener noreferrer" class="dashed-card p-4 rounded-2xl flex flex-col items-center text-center bg-white shadow-sm hover:border-orange-500 transition-all duration-300 group cursor-pointer"><div class="w-16 h-16 mb-3 rounded-full overflow-hidden border border-gray-100"><img src="' + f.image + '" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" /></div><h4 class="font-bold text-sm mb-1">' + f.name + '</h4><p class="text-[9px] text-orange-500 font-bold uppercase tracking-widest">' + f.role + '</p></a>';
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

document.addEventListener('DOMContentLoaded', function() { loadFreelancers(); });
/* =========================================================
   PLANT CARE ASSISTANT — script.js
   AI-powered plant analysis simulation with premium UX
   ========================================================= */

'use strict';

// ── Constants ────────────────────────────────────────────
const PLANT_DB = [
  {
    name: 'Monstera Deliciosa',
    emoji: '🌿',
    water: { freq: 'Every 7–10 days', sub: 'Allow top 2–3 cm of soil to dry out between waterings.', pct: 55, label: 'Moderate' },
    sun: { type: 'Bright Indirect', sub: 'Thrives near a north or east-facing window. Avoid harsh direct sun.', pct: 70, label: 'Medium-High' },
    humid: { value: '60–80%', sub: 'Mist leaves weekly or place on a pebble tray.', pct: 70 },
    temp: { range: '18–27 °C', sub: 'Keep away from cold draughts and air conditioning vents.' },
    fert: { freq: 'Monthly (spring–summer)', sub: 'Use a balanced liquid fertilizer diluted to half strength.' },
    soil: { type: 'Well-draining mix', sub: 'Repot every 1–2 years when roots peek through drainage holes.' },
    tips: ['Wipe leaves with a damp cloth every 2 weeks to remove dust.','Rotate the pot quarterly for even growth.','Provide a moss pole for climbing support.','Yellow leaves often mean overwatering — let soil dry more.'],
    issues: null,
    healthChance: [0.7, 0.2, 0.1],
    confidence: [91, 97]
  },
  {
    name: 'Peace Lily',
    emoji: '🌸',
    water: { freq: 'Every 5–7 days', sub: 'Water when the top inch of soil is dry. Drooping is a sign of thirst.', pct: 65, label: 'Regular' },
    sun: { type: 'Low to Medium Light', sub: 'Tolerates low light but blooms better with indirect bright light.', pct: 40, label: 'Low-Medium' },
    humid: { value: '50–60%', sub: 'Mist occasionally. Brown leaf tips indicate dry air.', pct: 55 },
    temp: { range: '16–27 °C', sub: 'Sensitive to cold — avoid temperatures below 13 °C.' },
    fert: { freq: 'Every 6 weeks (growing season)', sub: 'Use a slow-release or diluted liquid fertilizer.' },
    soil: { type: 'Rich, moist loam', sub: 'Repot every 18 months when roots start to crowd.' },
    tips: ['Keep away from direct sunlight to avoid leaf scorch.','Flush soil monthly to prevent salt buildup.','Remove spent flowers to encourage new blooms.','Peace lilies are toxic to pets — place out of reach.'],
    issues: 'Brown leaf tips detected — likely due to low humidity or fluoride in tap water.',
    healthChance: [0.5, 0.4, 0.1],
    confidence: [85, 94]
  },
  {
    name: 'Fiddle Leaf Fig',
    emoji: '🌳',
    water: { freq: 'Every 7–10 days', sub: 'Water thoroughly then allow top 5 cm to dry completely.', pct: 50, label: 'Moderate' },
    sun: { type: 'Bright Direct/Indirect', sub: 'Needs 6+ hours of bright light. A south-facing window is ideal.', pct: 85, label: 'High' },
    humid: { value: '30–65%', sub: 'Average household humidity is usually sufficient.', pct: 48 },
    temp: { range: '15–24 °C', sub: 'Avoid sudden temperature changes — choose a stable spot.' },
    fert: { freq: 'Every 4 weeks (spring–autumn)', sub: 'High-nitrogen fertilizer promotes lush leaf growth.' },
    soil: { type: 'Fast-draining potting mix', sub: 'Repot every 2 years or when growth stalls.' },
    tips: ['Do NOT move the plant once it\'s happy — it dislikes change.','Clean large leaves with a slightly damp cloth.','Check regularly for spider mites and scale insects.','Dramatic leaf drop often means drafts or relocation stress.'],
    issues: 'Yellowing lower leaves detected — possible root rot or inconsistent watering.',
    healthChance: [0.4, 0.45, 0.15],
    confidence: [78, 92]
  },
  {
    name: 'Snake Plant (Sansevieria)',
    emoji: '🐍',
    water: { freq: 'Every 2–4 weeks', sub: 'One of the most drought-tolerant houseplants — less is more.', pct: 20, label: 'Minimal' },
    sun: { type: 'Any Light Condition', sub: 'Thrives from low light to bright indirect sun. Very adaptable.', pct: 50, label: 'Flexible' },
    humid: { value: '30–50%', sub: 'Normal indoor humidity is perfect. No misting needed.', pct: 40 },
    temp: { range: '15–29 °C', sub: 'Extremely tolerant. Avoid frost and temperatures below 10 °C.' },
    fert: { freq: 'Once every 2 months (summer only)', sub: 'Light feeding with a cactus/succulent fertilizer.' },
    soil: { type: 'Cactus / Succulent mix', sub: 'Repot only when severely root-bound — every 3–5 years.' },
    tips: ['Overwatering is the #1 killer — always err on the dry side.','Can tolerate neglect and air conditioning environments.','Wipe leaves occasionally to maintain their striking pattern.','Excellent air purifier — great for bedrooms and offices.'],
    issues: null,
    healthChance: [0.85, 0.12, 0.03],
    confidence: [88, 96]
  },
  {
    name: 'Pothos (Epipremnum)',
    emoji: '🍃',
    water: { freq: 'Every 7–14 days', sub: 'Water when the top half of soil is dry. Very forgiving.', pct: 45, label: 'Low-Moderate' },
    sun: { type: 'Low to Bright Indirect', sub: 'Adaptable but variegated varieties need more light to maintain colour.', pct: 55, label: 'Flexible' },
    humid: { value: '50–70%', sub: 'Happy in normal humidity but appreciates occasional misting.', pct: 60 },
    temp: { range: '15–29 °C', sub: 'Keep away from cold windows in winter.' },
    fert: { freq: 'Monthly (spring–summer)', sub: 'Any balanced houseplant fertilizer at half strength.' },
    soil: { type: 'Standard potting mix', sub: 'Repot when roots fill the pot, roughly every 1–2 years.' },
    tips: ['Propagate easily in water — cuttings root in 2–4 weeks.','Trailing vines can reach 2–3 m long — trim to encourage bushy growth.','Yellow leaves often indicate overwatering.','Great beginner plant — hard to kill!'],
    issues: null,
    healthChance: [0.8, 0.15, 0.05],
    confidence: [82, 95]
  },
  {
    name: 'ZZ Plant (Zamioculcas)',
    emoji: '🌴',
    water: { freq: 'Every 2–3 weeks', sub: 'Allow soil to dry out completely between waterings.', pct: 25, label: 'Minimal' },
    sun: { type: 'Low to Moderate Indirect', sub: 'Tolerates low light very well — perfect for offices or dim rooms.', pct: 35, label: 'Low' },
    humid: { value: '40–60%', sub: 'Average indoor humidity is ideal. Very drought tolerant.', pct: 50 },
    temp: { range: '15–26 °C', sub: 'Keep above 8 °C. Not frost-hardy.' },
    fert: { freq: 'Every 2–3 months (growing season)', sub: 'Feed sparingly with a diluted balanced fertilizer.' },
    soil: { type: 'Well-draining mix with perlite', sub: 'Rarely needs repotting — happy to be pot-bound.' },
    tips: ['ZZ plants store water in their rhizomes — very forgiving of neglect.','Toxic if ingested — keep away from children and pets.','Wipe glossy leaves to maintain their beautiful shine.','Slow grower — patience is rewarded with stunning new fronds.'],
    issues: null,
    healthChance: [0.88, 0.1, 0.02],
    confidence: [86, 97]
  },
  {
    name: 'Aloe Vera',
    emoji: '🌵',
    water: { freq: 'Every 2–3 weeks (summer)', sub: 'Water deeply then let soil dry completely. Reduce to monthly in winter.', pct: 20, label: 'Very Low' },
    sun: { type: 'Bright Direct', sub: 'Loves 6–8 hours of direct sun. South or west-facing window is ideal.', pct: 90, label: 'Very High' },
    humid: { value: '20–40%', sub: 'Prefers dry air. Avoid misting — it is a succulent.', pct: 30 },
    temp: { range: '13–27 °C', sub: 'Cannot survive frost. Bring indoors if temperatures drop below 4 °C.' },
    fert: { freq: 'Once or twice a year (spring/summer)', sub: 'Use a low-nitrogen succulent fertilizer.' },
    soil: { type: 'Cactus / Sandy mix', sub: 'Repot when it becomes top-heavy or pups crowd the pot.' },
    tips: ['Never let aloe sit in water — root rot is its biggest enemy.','Harvest outer leaves for their soothing gel benefits.','Pups can be separated and potted independently.','Sunburned leaves turn orange-red — increase shade if this happens.'],
    issues: 'Dry, wrinkled leaves detected — may need watering soon.',
    healthChance: [0.6, 0.35, 0.05],
    confidence: [79, 93]
  },
];

const HEALTH_LEVELS = ['healthy', 'attention', 'critical'];
const HEALTH_LABELS = { healthy: '✅ Healthy', attention: '⚠️ Needs Attention', critical: '🚨 Critical' };

// ── State ────────────────────────────────────────────────
let state = {
  currentImage: null,
  currentAnalysis: null,
  history: JSON.parse(localStorage.getItem('plantHistory') || '[]'),
  darkMode: localStorage.getItem('darkMode') === 'true',
  deferredPrompt: null,
  isFav: false,
  analyzing: false,
};

// ── DOM References ───────────────────────────────────────
const $ = id => document.getElementById(id);
const el = {
  body:            document.body,
  installBtn:      $('installBtn'),
  darkToggle:      $('darkToggle'),
  toggleIcon:      $('toggleIcon'),
  historySidebar:  $('historySidebar'),
  openHistoryBtn:  $('openHistoryBtn'),
  closeSidebar:    $('closeSidebar'),
  sidebarOverlay:  $('sidebarOverlay'),
  historyList:     $('historyList'),
  clearHistoryBtn: $('clearHistoryBtn'),
  uploadZone:      $('uploadZone'),
  uploadInner:     $('uploadInner'),
  uploadPreview:   $('uploadPreview'),
  previewImg:      $('previewImg'),
  fileInput:       $('fileInput'),
  cameraInput:     $('cameraInput'),
  analyzeBtn:      $('analyzeBtn'),
  analyzeBtnText:  $('analyzeBtnText'),
  btnSpinner:      $('btnSpinner'),
  reuploadBtn:     $('reuploadBtn'),
  uploadSection:   $('uploadSection'),
  loadingSection:  $('loadingSection'),
  loadingBar:      $('loadingBar'),
  loadingSteps:    $('loadingSteps'),
  dashboard:       $('dashboard'),
  dashThumb:       $('dashThumb'),
  aiConfidence:    $('aiConfidence'),
  plantName:       $('plantName'),
  healthBadge:     $('healthBadge'),
  healthDot:       $('healthDot'),
  issuesAlert:     $('issuesAlert'),
  issueDesc:       $('issueDescription'),
  favBtn:          $('favBtn'),
  downloadBtn:     $('downloadBtn'),
  newAnalysisBtn:  $('newAnalysisBtn'),
  newAnalysisBtn2: $('newAnalysisBtn2'),
  waterFreq:       $('waterFreq'),
  waterSub:        $('waterSub'),
  waterProgress:   $('waterProgress'),
  waterLabel:      $('waterLabel'),
  sunType:         $('sunType'),
  sunSub:          $('sunSub'),
  sunProgress:     $('sunProgress'),
  sunLabel:        $('sunLabel'),
  humidValue:      $('humidValue'),
  humidSub:        $('humidSub'),
  humidCircle:     $('humidCircle'),
  humidPct:        $('humidPct'),
  tempRange:       $('tempRange'),
  tempSub:         $('tempSub'),
  fertFreq:        $('fertFreq'),
  fertSub:         $('fertSub'),
  soilType:        $('soilType'),
  soilSub:         $('soilSub'),
  tipsList:        $('tipsList'),
  recentGrid:      $('recentGrid'),
  toast:           $('toast'),
};

// ── Initialise ───────────────────────────────────────────
function init() {
  applyDarkMode();
  renderRecentGrid();
  renderHistoryList();
  bindEvents();
  registerServiceWorker();
}

// ── Dark Mode ────────────────────────────────────────────
function applyDarkMode() {
  if (state.darkMode) {
    el.body.classList.add('dark-mode');
    el.toggleIcon.textContent = '☀️';
  } else {
    el.body.classList.remove('dark-mode');
    el.toggleIcon.textContent = '🌙';
  }
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  localStorage.setItem('darkMode', state.darkMode);
  applyDarkMode();
}

// ── Event Binding ────────────────────────────────────────
function bindEvents() {
  // Dark mode
  el.darkToggle.addEventListener('click', toggleDarkMode);

  // Install
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    state.deferredPrompt = e;
    el.installBtn.classList.remove('hidden');
  });
  el.installBtn.addEventListener('click', async () => {
    if (!state.deferredPrompt) return;
    state.deferredPrompt.prompt();
    const { outcome } = await state.deferredPrompt.userChoice;
    if (outcome === 'accepted') el.installBtn.classList.add('hidden');
    state.deferredPrompt = null;
  });

  // History sidebar
  el.openHistoryBtn.addEventListener('click', openSidebar);
  el.closeSidebar.addEventListener('click', closeSidebar);
  el.sidebarOverlay.addEventListener('click', closeSidebar);
  el.clearHistoryBtn.addEventListener('click', clearHistory);

  // Upload zone — drag & drop
  el.uploadZone.addEventListener('dragover', e => { e.preventDefault(); el.uploadZone.classList.add('drag-over'); });
  el.uploadZone.addEventListener('dragleave', () => el.uploadZone.classList.remove('drag-over'));
  el.uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    el.uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageFile(file);
  });
  el.uploadZone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') el.fileInput.click(); });

  // File inputs
  el.fileInput.addEventListener('change', e => { if (e.target.files[0]) handleImageFile(e.target.files[0]); });
  el.cameraInput.addEventListener('change', e => { if (e.target.files[0]) handleImageFile(e.target.files[0]); });

  // Click on upload zone (not on buttons inside)
  el.uploadZone.addEventListener('click', e => {
    if (!e.target.closest('.btn') && !el.uploadPreview.contains(e.target)) el.fileInput.click();
  });

  // Reupload
  el.reuploadBtn.addEventListener('click', e => { e.stopPropagation(); resetUpload(); });

  // Analyse
  el.analyzeBtn.addEventListener('click', e => { e.stopPropagation(); startAnalysis(); });

  // Dashboard actions
  el.newAnalysisBtn.addEventListener('click', resetAll);
  el.newAnalysisBtn2.addEventListener('click', resetAll);
  el.favBtn.addEventListener('click', toggleFav);
  el.downloadBtn.addEventListener('click', downloadAnalysis);
}

// ── Image Handling ───────────────────────────────────────
function handleImageFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    state.currentImage = e.target.result;
    el.previewImg.src = state.currentImage;
    el.uploadInner.classList.add('hidden');
    el.uploadPreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function resetUpload() {
  el.uploadPreview.classList.add('hidden');
  el.uploadInner.classList.remove('hidden');
  el.fileInput.value = '';
  el.cameraInput.value = '';
  state.currentImage = null;
}

function resetAll() {
  resetUpload();
  el.dashboard.classList.add('hidden');
  el.uploadSection.classList.remove('hidden');
  state.currentAnalysis = null;
  state.isFav = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Analysis Simulation ──────────────────────────────────
function startAnalysis() {
  if (state.analyzing) return;
  state.analyzing = true;

  // Button loading state
  el.btnSpinner.classList.remove('hidden');
  el.analyzeBtnText.textContent = 'Analyzing…';
  el.analyzeBtn.disabled = true;

  // Small delay then show full loading screen
  setTimeout(() => {
    el.uploadSection.classList.add('hidden');
    el.loadingSection.classList.remove('hidden');
    el.dashboard.classList.add('hidden');
    runLoadingAnimation();
  }, 600);
}

function runLoadingAnimation() {
  const steps = el.loadingSteps.querySelectorAll('.loading-step');
  let current = 0;

  const TOTAL_MS = 3200;
  const STEP_MS = TOTAL_MS / steps.length;

  // Progress bar
  let progressInterval = setInterval(() => {
    const w = parseFloat(el.loadingBar.style.width || '0');
    if (w >= 100) clearInterval(progressInterval);
    else el.loadingBar.style.width = Math.min(100, w + 1.8) + '%';
  }, TOTAL_MS / 60);

  // Step cycling
  function advanceStep() {
    if (current < steps.length) {
      steps.forEach((s, i) => {
        s.classList.remove('active');
        if (i < current) s.classList.add('done');
      });
      if (current < steps.length) steps[current].classList.add('active');
      current++;
      if (current <= steps.length) setTimeout(advanceStep, STEP_MS);
    }
  }
  advanceStep();

  // Final
  setTimeout(() => {
    clearInterval(progressInterval);
    el.loadingBar.style.width = '100%';
    setTimeout(() => {
      state.analyzing = false;
      el.btnSpinner.classList.add('hidden');
      el.analyzeBtnText.textContent = '✨ Analyze Plant';
      el.analyzeBtn.disabled = false;
      el.loadingSection.classList.add('hidden');
      showDashboard(generateAnalysis());
    }, 400);
  }, TOTAL_MS + 200);
}

function generateAnalysis() {
  const plant = PLANT_DB[Math.floor(Math.random() * PLANT_DB.length)];
  const confRaw = plant.confidence;
  const confidence = Math.floor(Math.random() * (confRaw[1] - confRaw[0])) + confRaw[0];

  // Pick health level based on probability weights
  const r = Math.random();
  let healthIdx = 0;
  let cum = 0;
  for (let i = 0; i < plant.healthChance.length; i++) {
    cum += plant.healthChance[i];
    if (r < cum) { healthIdx = i; break; }
  }
  const health = HEALTH_LEVELS[healthIdx];

  return { plant, confidence, health, imageData: state.currentImage, date: new Date() };
}

// ── Dashboard Rendering ──────────────────────────────────
function showDashboard(analysis) {
  state.currentAnalysis = analysis;
  const { plant, confidence, health } = analysis;

  // Identity
  el.dashThumb.src = analysis.imageData;
  el.aiConfidence.textContent = `AI Confidence · ${confidence}%`;
  el.plantName.textContent = plant.name;
  el.healthBadge.textContent = HEALTH_LABELS[health];
  el.healthBadge.className = `health-badge ${health}`;
  el.healthDot.className = `health-dot ${health}`;

  // Issues
  if (plant.issues && health !== 'healthy') {
    el.issuesAlert.classList.remove('hidden');
    el.issueDesc.textContent = ' ' + plant.issues;
  } else {
    el.issuesAlert.classList.add('hidden');
  }

  // Watering
  el.waterFreq.textContent = plant.water.freq;
  el.waterSub.textContent = plant.water.sub;
  el.waterLabel.textContent = plant.water.label;
  setTimeout(() => { el.waterProgress.style.width = plant.water.pct + '%'; }, 300);

  // Sunlight
  el.sunType.textContent = plant.sun.type;
  el.sunSub.textContent = plant.sun.sub;
  el.sunLabel.textContent = plant.sun.label;
  setTimeout(() => { el.sunProgress.style.width = plant.sun.pct + '%'; }, 350);

  // Humidity
  el.humidValue.textContent = plant.humid.value;
  el.humidSub.textContent = plant.humid.sub;
  el.humidPct.textContent = plant.humid.pct + '%';
  setTimeout(() => {
    const pct = plant.humid.pct / 100;
    const circumference = 2 * Math.PI * 24; // r=24
    el.humidCircle.style.strokeDashoffset = circumference * (1 - pct);
  }, 400);

  // Temperature
  el.tempRange.textContent = plant.temp.range;
  el.tempSub.textContent = plant.temp.sub;

  // Fertilizer
  el.fertFreq.textContent = plant.fert.freq;
  el.fertSub.textContent = plant.fert.sub;

  // Soil
  el.soilType.textContent = plant.soil.type;
  el.soilSub.textContent = plant.soil.sub;

  // Tips
  el.tipsList.innerHTML = plant.tips.map(t => `<li>${t}</li>`).join('');

  // Fav reset
  state.isFav = false;
  el.favBtn.textContent = '🤍';
  el.favBtn.classList.remove('active');

  // Show
  el.dashboard.classList.remove('hidden');
  el.uploadSection.classList.add('hidden');
  el.dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Save to history
  saveToHistory(analysis);
}

// ── History ──────────────────────────────────────────────
function saveToHistory(analysis) {
  const entry = {
    id: Date.now(),
    plantName: analysis.plant.name,
    health: analysis.health,
    confidence: analysis.confidence,
    imageData: analysis.imageData,
    date: analysis.date.toISOString(),
  };
  state.history.unshift(entry);
  if (state.history.length > 20) state.history.pop();
  localStorage.setItem('plantHistory', JSON.stringify(state.history));
  renderHistoryList();
  renderRecentGrid();
}

function renderHistoryList() {
  if (state.history.length === 0) {
    el.historyList.innerHTML = `
      <div class="empty-history">
        <div class="empty-icon">🌿</div>
        <p>No analyses yet.<br/>Upload your first plant!</p>
      </div>`;
    return;
  }
  el.historyList.innerHTML = state.history.map(entry => `
    <div class="history-item">
      <img src="${entry.imageData}" alt="${entry.plantName}" loading="lazy" />
      <div class="history-item-info">
        <div class="history-item-name">${entry.plantName}</div>
        <div class="history-item-date">${formatDate(entry.date)} · ${entry.confidence}% confidence</div>
      </div>
    </div>
  `).join('');
}

function renderRecentGrid() {
  if (state.history.length === 0) {
    el.recentGrid.innerHTML = `
      <div class="recent-empty">
        <span>🌱</span>
        <p>Your plant analyses will appear here</p>
      </div>`;
    return;
  }
  const recent = state.history.slice(0, 6);
  el.recentGrid.innerHTML = recent.map(entry => `
    <div class="recent-card">
      <img src="${entry.imageData}" alt="${entry.plantName}" loading="lazy" />
      <div class="recent-card-info">
        <div class="recent-card-name">${entry.plantName}</div>
        <div class="recent-card-date">${formatDate(entry.date)}</div>
        <span class="recent-card-badge ${entry.health}">${HEALTH_LABELS[entry.health]}</span>
      </div>
    </div>
  `).join('');
}

function clearHistory() {
  state.history = [];
  localStorage.removeItem('plantHistory');
  renderHistoryList();
  renderRecentGrid();
  showToast('History cleared 🗑️');
  closeSidebar();
}

// ── Sidebar ──────────────────────────────────────────────
function openSidebar() {
  el.historySidebar.classList.add('open');
  el.sidebarOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  el.historySidebar.classList.remove('open');
  el.sidebarOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

// ── Favourite ────────────────────────────────────────────
function toggleFav() {
  state.isFav = !state.isFav;
  el.favBtn.textContent = state.isFav ? '❤️' : '🤍';
  el.favBtn.classList.toggle('active', state.isFav);
  showToast(state.isFav ? 'Added to favourites ❤️' : 'Removed from favourites');
}

// ── Download (basic text summary) ───────────────────────
function downloadAnalysis() {
  if (!state.currentAnalysis) return;
  const { plant, confidence, health } = state.currentAnalysis;
  const content = [
    '🌿 PLANT CARE ASSISTANT — Analysis Report',
    '═══════════════════════════════════════════',
    '',
    `Plant Identified: ${plant.name}`,
    `AI Confidence:    ${confidence}%`,
    `Health Status:    ${HEALTH_LABELS[health]}`,
    `Date:             ${new Date().toLocaleDateString()}`,
    '',
    '── CARE GUIDE ──────────────────────────────',
    '',
    `💧 WATERING`,
    `   Frequency: ${plant.water.freq}`,
    `   Notes:     ${plant.water.sub}`,
    '',
    `☀️ SUNLIGHT`,
    `   Type:  ${plant.sun.type}`,
    `   Notes: ${plant.sun.sub}`,
    '',
    `💦 HUMIDITY`,
    `   Level: ${plant.humid.value}`,
    `   Notes: ${plant.humid.sub}`,
    '',
    `🌡️ TEMPERATURE`,
    `   Range: ${plant.temp.range}`,
    `   Notes: ${plant.temp.sub}`,
    '',
    `🌱 FERTILIZER`,
    `   Frequency: ${plant.fert.freq}`,
    `   Notes:     ${plant.fert.sub}`,
    '',
    `🪴 SOIL & REPOTTING`,
    `   Type:  ${plant.soil.type}`,
    `   Notes: ${plant.soil.sub}`,
    '',
    '── CARE TIPS ───────────────────────────────',
    '',
    ...plant.tips.map((t, i) => `${i + 1}. ${t}`),
    '',
    '═══════════════════════════════════════════',
    'Generated by Plant Care Assistant · AI-powered',
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${plant.name.replace(/ /g, '_')}_Care_Guide.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Analysis downloaded ⬇️');
}

// ── Toast ────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove('show'), 2800);
}

// ── Utilities ────────────────────────────────────────────
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Service Worker Registration ──────────────────────────
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(err => {
      console.warn('SW registration failed:', err);
    });
  }
}

// ── Boot ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

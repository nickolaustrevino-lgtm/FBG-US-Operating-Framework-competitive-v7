const elements = {
  search: document.getElementById("search"),
  lastUpdatedDate: document.getElementById("lastUpdatedDate"),
  printLastUpdatedDate: document.getElementById("printLastUpdatedDate"),
  printFilterSummary: document.getElementById("printFilterSummary"),
  sportsStatus: document.getElementById("sportsStatus"),
  igamingStatus: document.getElementById("igamingStatus"),
  licensingModel: document.getElementById("licensingModel"),
  taxBand: document.getElementById("taxBand"),
  handleTier: document.getElementById("handleTier"),
  measurementCandidate: document.getElementById("measurementCandidate"),
  highAttributionRisk: document.getElementById("highAttributionRisk"),
  rows: document.getElementById("stateRows"),
  headerRow: document.getElementById("tableHeaderRow"),
  kpiNarrative: document.getElementById("kpiNarrative"),
  highTaxBudgetShare: document.getElementById("highTaxBudgetShare"),
  highTaxBudgetShareMeta: document.getElementById("highTaxBudgetShareMeta"),
  negativeContributionCount: document.getElementById("negativeContributionCount"),
  negativeContributionMeta: document.getElementById("negativeContributionMeta"),
  measurementCalibrationCount: document.getElementById("measurementCalibrationCount"),
  measurementCalibrationMeta: document.getElementById("measurementCalibrationMeta"),
  attributionRiskCount: document.getElementById("attributionRiskCount"),
  attributionRiskMeta: document.getElementById("attributionRiskMeta"),
  stateBriefSelect: document.getElementById("stateBriefSelect"),
  briefSnapshot: document.getElementById("briefSnapshot"),
  briefUpdate: document.getElementById("briefUpdate"),
  briefWhy: document.getElementById("briefWhy"),
  briefExecNarrative: document.getElementById("briefExecNarrative"),
  briefLinks: document.getElementById("briefLinks"),
  activeFilterText: document.getElementById("activeFilterText"),
  majorPolicyCallout: document.getElementById("majorPolicyCallout"),
  activeFilterChips: document.getElementById("activeFilterChips"),
  presetNarrative: document.getElementById("presetNarrative"),
  resetBtn: document.getElementById("resetBtn"),
  copyBtn: document.getElementById("copyBtn"),
  copyTableBtn: document.getElementById("copyTableBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  copyToast: document.getElementById("copyToast"),
  presetButtons: document.querySelectorAll("[data-preset]"),
  tableSummaryRow: document.getElementById("tableSummaryRow"),
  columnToggleMenu: document.getElementById("columnToggleMenu"),
  competitiveStateSelect: document.getElementById("competitiveStateSelect"),
  competitivePromoIntensity: document.getElementById("competitivePromoIntensity"),
  dominantCompetitorModel: document.getElementById("dominantCompetitorModel"),
  competitiveDeploymentNote: document.getElementById("competitiveDeploymentNote"),
  channelMixImplication: document.getElementById("channelMixImplication"),
  competitiveVerified: document.getElementById("competitiveVerified"),
  competitiveSources: document.getElementById("competitiveSources"),
  toggleCompetitiveBtn: document.getElementById("toggleCompetitiveBtn"),
  competitiveBody: document.getElementById("competitiveBody"),
  actionSummary: document.getElementById("actionSummary"),
  actionShortlist: document.getElementById("actionShortlist"),
  handoffSummary: document.getElementById("handoffSummary"),
  handoffNotes: document.getElementById("handoffNotes"),
  handoffChannelCheck: document.getElementById("handoffChannelCheck"),
  handoffMeasurementCheck: document.getElementById("handoffMeasurementCheck"),
  handoffRiskCheck: document.getElementById("handoffRiskCheck"),
  copyHandoffBtn: document.getElementById("copyHandoffBtn"),
  footerLastUpdatedDate: document.getElementById("footerLastUpdatedDate")
};

const defaultFilters = {
  search: "",
  sportsStatus: "all",
  igamingStatus: "all",
  licensingModel: "all",
  taxBand: "all",
  handleTier: "all",
  measurementCandidate: "all",
  measurementSuitability: "all",
  highAttributionRisk: "all"
};

const hiddenFilters = {
  licensingModel: defaultFilters.licensingModel,
  taxBand: defaultFilters.taxBand,
  handleTier: defaultFilters.handleTier,
  measurementSuitability: defaultFilters.measurementSuitability
};

const HIGH_TAX_THRESHOLD = new Set(["High", "Extreme"]);
const MEASUREMENT_SUITABILITY_LABELS = {
  "Prime for geo-holdouts": "Geo-holdout candidate",
  "MMM calibration only": "MMM anchor — no media tests",
  "Don't test here": "Avoid testing — review with team"
};
const EXEC_NARRATIVE_ANGLE = [
  "Sportsbook president: Frame as: performance efficiency and market share protection.",
  "Casino president: Frame as: performance ROI and iGaming expansion opportunity.",
  "CMO: Frame as: brand building, fan ecosystem, and story.",
  "Default: Tailor framing to audience — planning signals are the same regardless."
].join("\n");
const STORAGE_KEYS = {
  columns: "fbg-market-filter-columns-v3",
  competitiveCollapsed: "fbg-market-filter-competitive-collapsed-v2"
};

const presetDetails = {
  none: "Select an operating view to load a focused market slice.",
  "governance-watchlist": "High-tax, high-handle markets that should be flagged for commercial review and closer governance discussion.",
  "launch-ready-tests": "Launch-ready markets that are better suited for lower-complexity media tests and cleaner experiment design.",
  "continuity-risk": "States where measurement approach should be sense-checked most carefully during PMG to in-house transition.",
  "geo-holdout": "Geo-holdout candidates that can help anchor MMM calibration priority within the current planning slice."
};

const presetLabels = {
  none: "All jurisdictions view",
  "governance-watchlist": "High-tax, high-handle markets — flag for commercial review",
  "launch-ready-tests": "Launch-ready markets — media test candidates",
  "continuity-risk": "Attribution continuity risk — sense-check measurement approach",
  "geo-holdout": "Prime geo-holdout candidates — MMM calibration priority"
};

const columnDefinitions = [
  { key: "state", label: "State", sortKey: "state", defaultVisible: true, render: (row) => row.state, exportValue: (row) => row.state },
  { key: "licensingModel", label: "Licensing Model", sortKey: "licensingModel", defaultVisible: true, render: (row) => displayLicensingModel(row), exportValue: (row) => row.licensingModel },
  { key: "sports", label: "Sports Betting", sortKey: "sports", defaultVisible: true, render: (row) => displaySports(row), exportValue: (row) => formatSportsForExport(row) },
  { key: "online", label: "Online / Mobile", sortKey: "online", defaultVisible: true, render: (row) => displayOnline(row), exportValue: (row) => displayOnline(row) },
  { key: "igaming", label: "iGaming", sortKey: "igaming", defaultVisible: true, render: (row) => displayIGaming(row), exportValue: (row) => formatIGamingForExport(row) },
  { key: "tax", label: "Tax %", sortKey: "tax", defaultVisible: true, render: (row) => displayTaxCell(row), exportValue: (row) => displayTaxForExport(row) },
  { key: "handleTier", label: "Handle Tier", sortKey: "handleTier", defaultVisible: true, render: (row) => displayHandleTier(row), exportValue: (row) => row.handleBand },
  {
    key: "attribution_continuity_risk",
    label: "Attribution Continuity Risk",
    headerLabel:
      'Attribution Continuity Risk <span class="info-dot" title="High = heavy ecosystem overlap, large budget exposure, and more methodology drift risk during PMG to in-house.">i</span>',
    sortKey: "attribution_continuity_risk",
    defaultVisible: true,
    render: (row) => displayAttributionRisk(row),
    exportValue: (row) => row.attribution_continuity_risk
  },
  {
    key: "measurement_suitability",
    label: "Measurement Suitability",
    headerLabel:
      'Measurement Suitability <span class="info-dot" title="Driven by peer-state count, scale, and operational importance.">i</span>',
    sortKey: "measurement_suitability",
    defaultVisible: true,
    render: (row) => displayMeasurementSuitability(row),
    exportValue: (row) => getMeasurementSuitabilityLabel(row.measurement_suitability)
  },
  { key: "promo_intensity", label: "Promo Intensity", sortKey: "promo_intensity", defaultVisible: true, render: (row) => displayPromoIntensity(row.promo_intensity), exportValue: (row) => row.promo_intensity },
  {
    key: "dominant_competitor_model",
    label: "Dominant Competitor Model",
    sortKey: "dominant_competitor_model",
    defaultVisible: true,
    render: (row) => displayCompetitorModel(row.dominant_competitor_model),
    exportValue: (row) => getCompetitorModelLabel(row.dominant_competitor_model)
  },
  {
    key: "fbg_ecosystem_fit",
    label: "FBG Ecosystem Fit",
    selectorLabel: "FBG ECOSYSTEM FIT",
    defaultVisible: false,
    render: (row) => displayEcosystemFit(row.fbg_ecosystem_fit),
    exportValue: (row) => row.fbg_ecosystem_fit
  },
  {
    key: "pmg_transition_risk",
    label: "PMG Transition Risk",
    selectorLabel: "PMG TRANSITION RISK",
    headerLabel:
      'PMG Transition Risk <span class="info-dot" title="Operational risk only — reflects where methodology drift during PMG-to-in-house transition would most affect measurement quality. Not a budget directive.">i</span>',
    defaultVisible: false,
    render: (row) => displayPmgTransitionRisk(row.pmg_transition_risk),
    exportValue: (row) => row.pmg_transition_risk
  },
  { key: "fanaticsSportsbook", label: "Fanatics Sportsbook", sortKey: "fanaticsSportsbook", defaultVisible: false, render: (row) => displayFanatics(Boolean(row.fanaticsSportsbook)), exportValue: (row) => (row.fanaticsSportsbook ? "Live" : "Not live") },
  { key: "fanaticsCasino", label: "Fanatics Casino", sortKey: "fanaticsCasino", defaultVisible: false, render: (row) => displayFanatics(Boolean(row.fanaticsCasino)), exportValue: (row) => (row.fanaticsCasino ? "Live" : "Not live") },
  { key: "region", label: "Region", sortKey: "region", defaultVisible: false, render: (row) => row.region, exportValue: (row) => row.region },
  { key: "fanatics_launch_date", label: "FBG Launch", sortKey: "fanatics_launch_date", defaultVisible: false, render: (row) => row.fanatics_launch_date || "—", exportValue: (row) => row.fanatics_launch_date || "—" }
];

const defaultVisibleColumns = Object.fromEntries(columnDefinitions.map((column) => [column.key, column.defaultVisible]));
const VALID_SORT_KEYS = new Set(columnDefinitions.filter((column) => column.sortKey).map((column) => column.sortKey));
const VALID_STATES = new Set(stateData.map((row) => row.state));
const VALID_FILTER_OPTIONS = {
  sportsStatus: new Set(["all", "legal", "illegal", "limited"]),
  igamingStatus: new Set(["all", "yes", "pending", "no"]),
  licensingModel: new Set(["all", "Open commercial", "Casino-tethered", "Tribal exclusive", "State monopoly", "Not yet authorized", "accessible"]),
  taxBand: new Set(["all", "Low", "Mid", "High", "Extreme", "High+", "Workable"]),
  handleTier: new Set(["all", "Mega", "Major", "Mid", "Small", "Scaled"]),
  measurementCandidate: new Set(["all", "yes", "no"]),
  measurementSuitability: new Set(["all", "Prime for geo-holdouts", "MMM calibration only", "Don't test here"]),
  highAttributionRisk: new Set(["all", "yes", "no"])
};

let activePreset = "none";
let activeSort = { key: "state", direction: "asc" };
let lastRenderedRows = [];
let lastWatchlistRows = [];
let expandedState = null;
let selectedCompetitiveState = "";
let copyToastTimeout;
const visibleColumns = loadVisibleColumns();
let competitiveCollapsed = loadCompetitiveCollapsed();

const stateBriefOverrides = {
  Illinois: {
    snapshot: "Status: Online sports betting legal and live statewide; iGaming remains not yet legalized.",
    update: "Last notable update: 2025-2026 tax changes pushed Illinois into a more aggressively tiered operator-tax regime.",
    why: "Why it matters here: high scale, extreme tax, and high attribution continuity risk make Illinois a review-heavy state rather than a simple optimization market.",
    links: [
      { label: "Illinois Gaming Board", url: "https://igb.illinois.gov/" },
      { label: "Legal Sports Report - Illinois", url: "https://www.legalsportsreport.com/illinois/" }
    ]
  },
  "New York": {
    snapshot: "Status: Online sports betting legal and live statewide; iGaming remains not yet legalized.",
    update: "Last notable update: 2025–2026 budget cycle includes renewed iGaming debate tied to state revenue pressure.",
    why: "Why it matters here: New York should be treated as a high-scrutiny governance state and a likely MMM anchor, not a clean geo-holdout test bed.",
    links: [
      { label: "NYS Gaming Commission", url: "https://gaming.ny.gov/" },
      { label: "Legal Sports Report - NY", url: "https://www.legalsportsreport.com/new-york/" }
    ]
  },
  Maine: {
    snapshot: "Status: Online sports betting legal; iGaming legalized in 2026 but rollout is pending.",
    update: "Last notable update: January 2026 legalization created a new iGaming pathway with implementation and legal follow-through still developing.",
    why: "Why it matters here: access structure and rollout timing remain the main questions, so Maine is better treated as an operating watchpoint than a measurement anchor.",
    links: [
      { label: "Maine Gambling Control Unit", url: "https://www.maine.gov/dps/mgc/" },
      { label: "Action Network - Maine betting", url: "https://www.actionnetwork.com/online-sports-betting/maine" }
    ]
  },
  Missouri: {
    snapshot: "Status: Sports betting has been authorized, but statewide online launch is not yet live; iGaming remains not legal.",
    update: "Last notable update: Missouri should be treated as a pre-launch market rather than an active online sportsbook state.",
    why: "Why it matters here: Missouri belongs on the roadmap and policy watchlist, but not in current measurement or live-budget assumptions.",
    links: [
      { label: "Missouri Gaming Commission", url: "https://www.mgc.dps.mo.gov/" },
      { label: "Legal Sports Report - Missouri", url: "https://www.legalsportsreport.com/missouri/" }
    ]
  }
};

function loadVisibleColumns() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEYS.columns);
    if (!saved) return { ...defaultVisibleColumns };
    return { ...defaultVisibleColumns, ...JSON.parse(saved) };
  } catch {
    return { ...defaultVisibleColumns };
  }
}

function saveVisibleColumns() {
  sessionStorage.setItem(STORAGE_KEYS.columns, JSON.stringify(visibleColumns));
}

function loadCompetitiveCollapsed() {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.competitiveCollapsed) === "true";
  } catch {
    return false;
  }
}

function saveCompetitiveCollapsed() {
  sessionStorage.setItem(STORAGE_KEYS.competitiveCollapsed, String(competitiveCollapsed));
}

function getDisplayLastUpdated() {
  if (typeof dataLastUpdated === "string" && dataLastUpdated.trim()) return dataLastUpdated.trim();
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date());
}

function updateLastUpdatedDisplay() {
  const displayDate = getDisplayLastUpdated();
  elements.lastUpdatedDate.textContent = displayDate;
  elements.printLastUpdatedDate.textContent = displayDate;
  elements.footerLastUpdatedDate.textContent = displayDate;
}

function clampNumber(value, min, max, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function normalizeSelectValue(value, allowedValues, fallback) {
  return allowedValues.has(value) ? value : fallback;
}

function normalizeSort(sort) {
  if (!sort || sort.key === null) return { key: null, direction: "asc" };
  return {
    key: VALID_SORT_KEYS.has(sort.key) ? sort.key : "state",
    direction: sort.direction === "desc" ? "desc" : "asc"
  };
}

function normalizeFilters(filters) {
  return {
    search: VALID_STATES.has(filters?.search) ? filters.search : defaultFilters.search,
    sportsStatus: normalizeSelectValue(filters?.sportsStatus ?? defaultFilters.sportsStatus, VALID_FILTER_OPTIONS.sportsStatus, defaultFilters.sportsStatus),
    igamingStatus: normalizeSelectValue(filters?.igamingStatus ?? defaultFilters.igamingStatus, VALID_FILTER_OPTIONS.igamingStatus, defaultFilters.igamingStatus),
    licensingModel: normalizeSelectValue(filters?.licensingModel ?? defaultFilters.licensingModel, VALID_FILTER_OPTIONS.licensingModel, defaultFilters.licensingModel),
    taxBand: normalizeSelectValue(filters?.taxBand ?? defaultFilters.taxBand, VALID_FILTER_OPTIONS.taxBand, defaultFilters.taxBand),
    handleTier: normalizeSelectValue(filters?.handleTier ?? defaultFilters.handleTier, VALID_FILTER_OPTIONS.handleTier, defaultFilters.handleTier),
    measurementCandidate: normalizeSelectValue(filters?.measurementCandidate ?? defaultFilters.measurementCandidate, VALID_FILTER_OPTIONS.measurementCandidate, defaultFilters.measurementCandidate),
    measurementSuitability: normalizeSelectValue(
      filters?.measurementSuitability ?? defaultFilters.measurementSuitability,
      VALID_FILTER_OPTIONS.measurementSuitability,
      defaultFilters.measurementSuitability
    ),
    highAttributionRisk: normalizeSelectValue(filters?.highAttributionRisk ?? defaultFilters.highAttributionRisk, VALID_FILTER_OPTIONS.highAttributionRisk, defaultFilters.highAttributionRisk)
  };
}

function getFilters() {
  return normalizeFilters({
    search: elements.search.value,
    sportsStatus: elements.sportsStatus.value,
    igamingStatus: elements.igamingStatus.value,
    licensingModel: hiddenFilters.licensingModel,
    taxBand: hiddenFilters.taxBand,
    handleTier: hiddenFilters.handleTier,
    measurementCandidate: elements.measurementCandidate.value,
    measurementSuitability: hiddenFilters.measurementSuitability,
    highAttributionRisk: elements.highAttributionRisk.value
  });
}

function getVisibleColumns() {
  const visible = columnDefinitions.filter((column) => visibleColumns[column.key] !== false);
  return visible.length ? visible : columnDefinitions.filter((column) => column.key === "state");
}

function formatSportsForExport(row) {
  return row.sportsNote ? `${capitalize(row.sports)} (${row.sportsNote})` : capitalize(row.sports);
}

function formatIGamingForExport(row) {
  if (row.igamingStatus === "pending") return "Pending";
  return row.igaming ? "Live" : "Not legal";
}

function displayTaxForExport(row) {
  if (row.tax === null) return "N/A";
  return `${displayTax(row)} [${row.taxBand}]`;
}

function runFilter(data, filters) {
  return data.filter((row) => {
    if (filters.search && row.state !== filters.search) return false;
    if (filters.sportsStatus !== "all" && row.sports !== filters.sportsStatus) return false;
    if (filters.igamingStatus !== "all") {
      if (filters.igamingStatus === "yes" && !row.igaming) return false;
      if (filters.igamingStatus === "pending" && row.igamingStatus !== "pending") return false;
      if (filters.igamingStatus === "no" && (row.igaming || row.igamingStatus === "pending")) return false;
    }
    if (filters.licensingModel !== "all") {
      if (filters.licensingModel === "accessible" && !["Open commercial", "Casino-tethered"].includes(row.licensingModel)) return false;
      if (filters.licensingModel !== "accessible" && row.licensingModel !== filters.licensingModel) return false;
    }
    if (filters.taxBand !== "all") {
      if (filters.taxBand === "High+" && !HIGH_TAX_THRESHOLD.has(row.taxBand)) return false;
      else if (filters.taxBand === "Workable" && !["Low", "Mid"].includes(row.taxBand)) return false;
      else if (!["High+", "Workable"].includes(filters.taxBand) && row.taxBand !== filters.taxBand) return false;
    }
    if (filters.handleTier !== "all") {
      if (filters.handleTier === "Scaled" && !["Mega", "Major"].includes(row.handleBand)) return false;
      else if (filters.handleTier === "Small" && row.handleBand !== "Small / pre-launch") return false;
      else if (!["Scaled", "Small"].includes(filters.handleTier) && row.handleBand !== filters.handleTier) return false;
    }
    if (filters.measurementCandidate !== "all") {
      const shouldBeCandidate = filters.measurementCandidate === "yes";
      if (Boolean(row.measurement_candidate) !== shouldBeCandidate) return false;
    }
    if (filters.measurementSuitability !== "all" && row.measurement_suitability !== filters.measurementSuitability) return false;
    if (filters.highAttributionRisk !== "all") {
      const shouldBeHighRisk = filters.highAttributionRisk === "yes";
      if (Boolean(row.high_attribution_drift_risk) !== shouldBeHighRisk) return false;
    }
    return true;
  });
}

function displaySports(row) {
  const badge =
    row.sports === "legal"
      ? `<span class="pill legal">Legal</span>`
      : row.sports === "limited"
        ? `<span class="pill limited">Limited</span>`
        : `<span class="pill illegal">Illegal</span>`;

  if (!row.sportsNote) return badge;
  return `<div class="cell-stack">${badge}<small class="cell-note">${escapeHtml(row.sportsNote)}</small></div>`;
}

function displayOnline(row) {
  if (!row.online) return row.onlineNote ? `No (${row.onlineNote})` : "No";
  return row.onlineNote ? `Yes (${row.onlineNote})` : "Yes";
}

function displayIGaming(row) {
  if (row.igamingStatus === "pending") return `<span class="pill igaming-pending">Pending</span>`;
  if (row.igaming) return `<span class="pill igaming-live">Live</span>`;
  return `<span class="pill igaming-off">Not legal</span>`;
}

function displayTax(row) {
  if (row.tax === null) return "N/A";
  if (row.taxNote) return `${row.tax}% (${row.taxNote})`;
  return `${row.tax}%`;
}

function displayTaxCell(row) {
  return `
    <div class="cell-stack">
      <span class="${taxBandClass(row.tax)}">${displayTax(row)}</span>
      <small class="cell-note">${row.taxBand === "N/A" ? "No current tax read" : `${row.taxBand} tax band`}</small>
    </div>
  `;
}

function displayFanatics(value) {
  return value ? `<span class="pill fanatics-live">Live</span>` : `<span class="pill fanatics-off">Not live</span>`;
}

function displayLicensingModel(row) {
  const tone =
    row.licensingModel === "Open commercial"
      ? "license-open"
      : row.licensingModel === "Casino-tethered"
        ? "license-casino"
        : row.licensingModel === "Tribal exclusive"
          ? "license-tribal"
          : row.licensingModel === "State monopoly"
            ? "license-monopoly"
            : "fanatics-off";
  return `<span class="pill ${tone}">${escapeHtml(row.licensingModel)}</span>`;
}

function displayHandleTier(row) {
  return row.handleBand;
}

function displayAttributionRisk(row) {
  const tone =
    row.attribution_continuity_risk === "High"
      ? "intensity-high"
      : row.attribution_continuity_risk === "Medium"
        ? "intensity-medium"
        : "intensity-low";
  const tooltip =
    row.attribution_continuity_risk === "High"
      ? "High = heavy FanCash or ecosystem overlap, large budget, and higher methodology drift risk."
      : row.attribution_continuity_risk === "Medium"
        ? "Medium = some ecosystem overlap and material spend, but manageable."
        : "Low = smaller state or limited ecosystem overlap.";
  return `<span class="pill ${tone}" title="${escapeHtml(tooltip)}">${row.attribution_continuity_risk}</span>`;
}

function getMeasurementSuitabilityLabel(value) {
  return MEASUREMENT_SUITABILITY_LABELS[value] || value;
}

function getCompetitorModelLabel(model) {
  return model === "Constrained access" ? "Constrained Access" : model;
}

function displayMeasurementSuitability(row) {
  const tone =
    row.measurement_suitability === "Prime for geo-holdouts"
      ? "measurement-prime"
      : row.measurement_suitability === "MMM calibration only"
        ? "measurement-mmm"
        : "measurement-dont";
  return `<span class="pill ${tone}" title="Driven by number of peer states, scale, and operational importance.">${escapeHtml(getMeasurementSuitabilityLabel(row.measurement_suitability))}</span>`;
}

function displayPromoIntensity(intensity) {
  const tone = intensity === "High" ? "intensity-high" : intensity === "Medium" ? "intensity-medium" : "intensity-low";
  return `<span class="pill ${tone}">${intensity}</span>`;
}

function displayCompetitorModel(model) {
  const tone =
    model === "Search-heavy"
      ? "model-search"
      : model === "CTV-heavy"
        ? "model-ctv"
        : model === "Affiliate-heavy"
          ? "model-affiliate"
          : "fanatics-off";
  return `<span class="pill ${tone}">${escapeHtml(getCompetitorModelLabel(model))}</span>`;
}

function displayEcosystemFit(value) {
  const tone =
    value === "Active ecosystem — casino"
      ? "ecosystem-casino"
      : value === "Active ecosystem"
        ? "ecosystem-active"
        : value === "Entry opportunity"
          ? "ecosystem-entry"
          : "ecosystem-none";
  return `<span class="pill ${tone}">${escapeHtml(value)}</span>`;
}

function displayPmgTransitionRisk(value) {
  const tone = value === "HIGH" ? "intensity-high" : value === "MEDIUM" ? "intensity-medium" : "intensity-low";
  return `<span class="pill ${tone}">${escapeHtml(value)}</span>`;
}

function renderCompetitiveToggleButton() {
  elements.toggleCompetitiveBtn.textContent = `${competitiveCollapsed ? "▸ Show" : "▾ Hide"} competitive intel`;
  elements.toggleCompetitiveBtn.setAttribute("aria-expanded", String(!competitiveCollapsed));
}

function taxBandClass(tax) {
  if (tax === null) return "";
  if (tax >= 36) return "tax-high";
  if (tax >= 20) return "tax-mid";
  if (tax < 15) return "tax-low";
  return "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function capitalize(value) {
  return value ? `${value[0].toUpperCase()}${value.slice(1)}` : value;
}

function rowIsIGamingPending(row) {
  return row.igamingStatus === "pending";
}

function getAttributionRiskRank(row) {
  return { High: 0, Medium: 1, Low: 2 }[row.attribution_continuity_risk] ?? 3;
}

function getMeasurementSuitabilityRank(row) {
  return { "Prime for geo-holdouts": 0, "MMM calibration only": 1, "Don't test here": 2 }[row.measurement_suitability] ?? 3;
}

function getReviewPriorityScore(row) {
  let score = 0;
  score += { High: 4, Medium: 2, Low: 0 }[row.attribution_continuity_risk] ?? 0;
  score += { "Prime for geo-holdouts": 3, "MMM calibration only": 2, "Don't test here": 0 }[row.measurement_suitability] ?? 0;
  score += { Extreme: 3, High: 2, Mid: 1, Low: 0, "N/A": 0 }[row.taxBand] ?? 0;
  score += { Mega: 3, Major: 2, Mid: 1, "Small / pre-launch": 0 }[row.handleBand] ?? 0;
  return score;
}

function getWatchlistReason(row) {
  const parts = [`${row.taxBand.toLowerCase()} tax`, row.licensingModel.toLowerCase()];
  if (row.attribution_continuity_risk !== "Low") parts.push(`${row.attribution_continuity_risk.toLowerCase()} attribution drift risk`);
  if (row.measurement_suitability !== "Don't test here") parts.push(getMeasurementSuitabilityLabel(row.measurement_suitability));
  return parts.join(" • ");
}

function getBriefForRow(row) {
  const baseBrief = stateBriefOverrides[row.state]
    ? { ...stateBriefOverrides[row.state] }
    : (() => {
        const igamingDescriptor = row.igaming ? "iGaming legal and live" : row.igamingStatus === "pending" ? "iGaming approved or pending launch" : "iGaming not legal";
        const sportsDescriptor =
          row.sports === "legal"
            ? row.online
              ? "Online sports legal"
              : "Sports betting authorized; online launch not yet live"
            : row.sports === "limited"
              ? "Limited sports market"
              : "Sports betting not legal";
        return {
          snapshot: `Status: ${sportsDescriptor}; ${igamingDescriptor}. Licensing: ${row.licensingModel}. Tax: ${displayTax(row)}.`,
          update: "Current watchpoint: monitor regulator and legislative calendars for policy movement.",
          why: `Planning read: ${row.attribution_continuity_risk} attribution continuity risk; ${getMeasurementSuitabilityLabel(row.measurement_suitability)}; handle tier ${displayHandleTier(row)}.`,
          links: [
            { label: "AGA state gaming map", url: "https://www.americangaming.org/resources/state-gaming-map/" },
            { label: "Legal Sports Report", url: "https://www.legalsportsreport.com/" }
          ]
        };
      })();

  return {
    ...baseBrief,
    execNarrative: EXEC_NARRATIVE_ANGLE
  };
}

function buildInlineBrief(row) {
  const brief = getBriefForRow(row);
  const links = brief.links
    .map((link) => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a></li>`)
    .join("");
  return `
    <div class="inline-brief">
      <div class="inline-brief-grid">
        <div>
          <p class="inline-brief-label">Snapshot</p>
          <p>${brief.snapshot}</p>
        </div>
        <div>
          <p class="inline-brief-label">Update</p>
          <p>${brief.update}</p>
        </div>
        <div>
          <p class="inline-brief-label">Why It Matters</p>
          <p>${brief.why}</p>
        </div>
        <div>
          <p class="inline-brief-label">Exec Narrative Angle</p>
          <p class="exec-narrative-text">${escapeHtml(brief.execNarrative).replaceAll("\n", "<br />")}</p>
        </div>
        <div>
          <p class="inline-brief-label">Data Last Verified</p>
          <p>${row.last_verified}</p>
        </div>
      </div>
      <div>
        <p class="inline-brief-label">Sources</p>
        <ul>${links}</ul>
      </div>
    </div>
  `;
}

function renderHeaderRow() {
  const visible = getVisibleColumns();
  elements.headerRow.innerHTML = visible
    .map((column) => {
      const headerLabel = column.headerLabel || column.label;
      if (!column.sortKey) return `<th data-column="${column.key}">${headerLabel}</th>`;
      const active = activeSort.key === column.sortKey;
      const indicator = active ? (activeSort.direction === "asc" ? "↑" : "↓") : "";
      return `
        <th data-column="${column.key}">
          <button type="button" class="sort-btn${active ? " active" : ""}" data-sort-key="${column.sortKey}">
            ${headerLabel}
            <span class="sort-indicator">${indicator}</span>
          </button>
        </th>
      `;
    })
    .join("");
}

function renderRows(rows) {
  const visible = getVisibleColumns();
  if (!rows.length) {
    elements.rows.innerHTML = `<tr><td colspan="${visible.length}" class="empty">No states matched. Try broadening the filters or clearing a watchlist.</td></tr>`;
    return;
  }

  elements.rows.innerHTML = rows
    .map((row) => {
      const mainCells = visible
        .map((column) => `<td data-label="${escapeHtml(column.label)}" data-column="${column.key}">${column.render(row)}</td>`)
        .join("");
      const isExpanded = expandedState === row.state;
      const detailRow = isExpanded
        ? `<tr class="detail-row" data-row-kind="detail"><td colspan="${visible.length}">${buildInlineBrief(row)}</td></tr>`
        : "";
      return `
        <tr class="data-row${isExpanded ? " is-expanded" : ""}" data-row-kind="main" data-state="${escapeHtml(row.state)}">
          ${mainCells}
        </tr>
        ${detailRow}
      `;
    })
    .join("");

  elements.rows.querySelectorAll('tr[data-row-kind="main"]').forEach((rowElement) => {
    rowElement.addEventListener("click", (event) => {
      if (event.target.closest("a, button, input, select, label, summary, details")) return;
      const state = rowElement.dataset.state;
      expandedState = expandedState === state ? null : state;
      renderRows(lastRenderedRows);
    });
  });
}

function setKpiState(valueElement, metaElement, valueText, metaText, isEmpty = false) {
  valueElement.textContent = valueText;
  metaElement.textContent = metaText;
  valueElement.closest(".kpi")?.classList.toggle("is-empty", isEmpty);
}

function renderKPIs(rows) {
  const liveBudgetRows = rows.filter((row) => row.fanaticsSportsbook && row.online && row.sports === "legal");
  const highTaxBudgetRows = liveBudgetRows.filter((row) => HIGH_TAX_THRESHOLD.has(row.taxBand));
  const measurementCalibrationStates = rows.filter((row) => row.measurement_candidate);
  const attributionRiskStates = rows.filter((row) => row.high_attribution_drift_risk);
  const totalBudgetProxy = liveBudgetRows.reduce((sum, row) => sum + row.media_budget_proxy, 0);
  const highTaxBudgetProxy = highTaxBudgetRows.reduce((sum, row) => sum + row.media_budget_proxy, 0);
  const highTaxBudgetShare = totalBudgetProxy ? `${Math.round((highTaxBudgetProxy / totalBudgetProxy) * 100)}%` : "—";

  if (!rows.length) {
    elements.kpiNarrative.textContent = "No states match the current view.";
    setKpiState(elements.highTaxBudgetShare, elements.highTaxBudgetShareMeta, "—", "No states in current view.", true);
    setKpiState(elements.negativeContributionCount, elements.negativeContributionMeta, "—", "No states in current view.", true);
    setKpiState(elements.measurementCalibrationCount, elements.measurementCalibrationMeta, "—", "No states in current view.", true);
    setKpiState(elements.attributionRiskCount, elements.attributionRiskMeta, "—", "No states in current view.", true);
  } else {
    elements.kpiNarrative.textContent =
      "Directional governance read only. Use these as review signals for budget governance, attribution stability, and measurement design before feeding commercial models.";

    setKpiState(
      elements.highTaxBudgetShare,
      elements.highTaxBudgetShareMeta,
      highTaxBudgetShare,
      totalBudgetProxy
        ? `${highTaxBudgetRows.length} live market${highTaxBudgetRows.length === 1 ? "" : "s"} in the current slice sit in high or extreme tax bands.`
        : "No live-state media budget proxy available in the current view.",
      totalBudgetProxy === 0
    );
    setKpiState(
      elements.negativeContributionCount,
      elements.negativeContributionMeta,
      "TBD",
      "Placeholder until CAC and promo assumptions are tied into Christjan's commercial model.",
      false
    );
    setKpiState(
      elements.measurementCalibrationCount,
      elements.measurementCalibrationMeta,
      String(measurementCalibrationStates.length),
      measurementCalibrationStates.length
        ? `${measurementCalibrationStates.filter((row) => row.measurement_suitability === "Prime for geo-holdouts").length} geo-holdout candidate state${measurementCalibrationStates.filter((row) => row.measurement_suitability === "Prime for geo-holdouts").length === 1 ? "" : "s"} in view.`
        : "No measurement-calibration states in current view.",
      measurementCalibrationStates.length === 0
    );
    setKpiState(
      elements.attributionRiskCount,
      elements.attributionRiskMeta,
      String(attributionRiskStates.length),
      attributionRiskStates.length
        ? `${attributionRiskStates.filter((row) => HIGH_TAX_THRESHOLD.has(row.taxBand)).length} of them also sit in high or extreme tax states.`
        : "No high attribution continuity risk states in current view.",
      attributionRiskStates.length === 0
    );
  }
}

function renderPolicyBrief(rows) {
  const selectedState = elements.stateBriefSelect.value;
  elements.stateBriefSelect.innerHTML = rows.map((row) => `<option value="${row.state}">${row.state}</option>`).join("");
  if (!rows.length) {
    elements.briefSnapshot.textContent = "No states in view.";
    elements.briefUpdate.textContent = "";
    elements.briefWhy.textContent = "";
    elements.briefExecNarrative.textContent = "";
    elements.briefLinks.innerHTML = "";
    return;
  }

  const targetState = rows.find((row) => row.state === selectedState) || rows[0];
  elements.stateBriefSelect.value = targetState.state;
  const brief = getBriefForRow(targetState);
  elements.briefSnapshot.textContent = brief.snapshot;
  elements.briefUpdate.textContent = `${brief.update} Data last verified: ${targetState.last_verified}.`;
  elements.briefWhy.textContent = brief.why;
  elements.briefExecNarrative.textContent = brief.execNarrative;
  elements.briefLinks.innerHTML = brief.links.map((link) => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a></li>`).join("");
}

function getCurrentSliceLabel() {
  if (activePreset !== "none") {
    const activeButton = [...elements.presetButtons].find((button) => button.dataset.preset === activePreset);
    if (activeButton) return activeButton.textContent.trim();
  }
  return elements.activeFilterText.textContent || "Custom filtered view";
}

function buildHandoffSummary(rows) {
  const sliceLabel = getCurrentSliceLabel();
  const stateLines = rows.length
    ? rows
        .map(
          (row) =>
            `- ${row.state}: tax band ${row.taxBand}; handle tier ${row.handleBand}; attribution risk ${row.attribution_continuity_risk}; measurement tag ${getMeasurementSuitabilityLabel(row.measurement_suitability)}`
        )
        .join("\n")
    : "- No states in the current watchlist";

  return [`Filter slice: ${sliceLabel}`, "Watchlist states:", stateLines].join("\n");
}

function renderHandoffSummary(rows) {
  elements.handoffSummary.value = buildHandoffSummary(rows);
}

function composeHandoffCopyText() {
  return [
    elements.handoffSummary.value,
    "",
    `Notes to Christjan / commercial team: ${elements.handoffNotes.value || "None added."}`,
    "Checklist:",
    `${elements.handoffChannelCheck.checked ? "[x]" : "[ ]"} Sense-checked with channel leads`,
    `${elements.handoffMeasurementCheck.checked ? "[x]" : "[ ]"} Aligned with attribution / MMM team`,
    `${elements.handoffRiskCheck.checked ? "[x]" : "[ ]"} Key risks and assumptions flagged`
  ].join("\n");
}

async function copyHandoffSummary() {
  try {
    await navigator.clipboard.writeText(composeHandoffCopyText());
    elements.copyHandoffBtn.textContent = "Copied";
    showCopyToast("Commercial model handoff copied to clipboard.");
    setTimeout(() => {
      elements.copyHandoffBtn.textContent = "Copy handoff summary";
    }, 1200);
  } catch {
    elements.copyHandoffBtn.textContent = "Clipboard blocked";
    showCopyToast("Clipboard access is blocked in this browser.", true);
    setTimeout(() => {
      elements.copyHandoffBtn.textContent = "Copy handoff summary";
    }, 1200);
  }
}

function renderActionShortlist(rows) {
  const shortlist = [...rows]
    .filter((row) => row.sports === "legal" || row.measurement_candidate || row.high_attribution_drift_risk)
    .sort((a, b) => {
      const byPriority = compareValues(getReviewPriorityScore(a), getReviewPriorityScore(b), "desc");
      if (byPriority !== 0) return byPriority;
      const byRisk = compareValues(getAttributionRiskRank(a), getAttributionRiskRank(b), "asc");
      if (byRisk !== 0) return byRisk;
      const byMeasurement = compareValues(getMeasurementSuitabilityRank(a), getMeasurementSuitabilityRank(b), "asc");
      if (byMeasurement !== 0) return byMeasurement;
      const byTier = compareValues(getSortValue(a, "handleTier"), getSortValue(b, "handleTier"), "asc");
      if (byTier !== 0) return byTier;
      const byTax = compareValues(a.tax ?? -1, b.tax ?? -1, "desc");
      if (byTax !== 0) return byTax;
      return compareValues(a.state, b.state, "asc");
    })
    .slice(0, 5);

  if (!shortlist.length) {
    lastWatchlistRows = [];
    elements.actionSummary.textContent = "No review items surfaced in the current view.";
    elements.actionShortlist.innerHTML = `<div class="action-empty">Broaden the filters or switch presets to rebuild a governance or measurement watchlist.</div>`;
    renderHandoffSummary(lastWatchlistRows);
    return;
  }

  lastWatchlistRows = shortlist;
  elements.actionSummary.textContent =
    "Discussion queue for budget-review and experiment-design conversations — not a directive for immediate budget changes. Share with Christjan before acting.";

  elements.actionShortlist.innerHTML = shortlist
    .map(
      (row) => `
        <article class="action-item">
          <div class="action-item-head">
            <h4>${row.state}</h4>
            ${row.high_attribution_drift_risk ? displayAttributionRisk(row) : displayMeasurementSuitability(row)}
          </div>
          <p class="action-item-meta">${escapeHtml(getWatchlistReason(row))}</p>
          <p class="action-item-qualifier">Sense-check with commercial model before adjusting spend here.</p>
        </article>
      `
    )
    .join("");

  renderHandoffSummary(lastWatchlistRows);
}

function renderPresetNarrative() {
  elements.presetNarrative.textContent = presetDetails[activePreset] || presetDetails.none;
}

function renderTableSummary(rows) {
  const visible = getVisibleColumns();
  const highTax = rows.filter((row) => HIGH_TAX_THRESHOLD.has(row.taxBand)).length;
  const openCommercial = rows.filter((row) => row.licensingModel === "Open commercial").length;
  const highRisk = rows.filter((row) => row.high_attribution_drift_risk).length;
  const primeGeo = rows.filter((row) => row.measurement_suitability === "Prime for geo-holdouts").length;
  const mmmOnly = rows.filter((row) => row.measurement_suitability === "MMM calibration only").length;
  const viewLabel = presetLabels[activePreset] || presetLabels.none;

  elements.tableSummaryRow.innerHTML = `<td colspan="${visible.length}"><strong>${viewLabel}</strong> • Jurisdictions: ${rows.length} • Open commercial: ${openCommercial} • High / extreme tax: ${highTax} • High attribution risk: ${highRisk} • Geo-holdout candidates: ${primeGeo} • MMM anchors: ${mmmOnly}</td>`;
}

function renderMajorPolicyCallout(rows) {
  const updates = rows.filter((row) => row.majorPolicyUpdate).map((row) => `${row.state}: ${row.majorPolicyUpdate}`);
  elements.majorPolicyCallout.textContent = updates.length ? `Policy watchlist: ${updates.slice(0, 2).join(" | ")}` : "";
}

function compareValues(a, b, direction = "asc") {
  if (a === b) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;
  if (a < b) return direction === "asc" ? -1 : 1;
  return direction === "asc" ? 1 : -1;
}

function getSortValue(row, key) {
  if (key === "state") return row.state;
  if (key === "licensingModel") return { "Open commercial": 0, "Casino-tethered": 1, "Tribal exclusive": 2, "State monopoly": 3, "Not yet authorized": 4 }[row.licensingModel] ?? 5;
  if (key === "region") return row.region;
  if (key === "sports") return { legal: 0, limited: 1, illegal: 2 }[row.sports];
  if (key === "online") return row.online ? 0 : 1;
  if (key === "igaming") return row.igaming ? 0 : row.igamingStatus === "pending" ? 1 : 2;
  if (key === "fanaticsSportsbook") return row.fanaticsSportsbook ? 0 : 1;
  if (key === "fanaticsCasino") return row.fanaticsCasino ? 0 : 1;
  if (key === "tax") return row.tax;
  if (key === "handleTier") return { Mega: 0, Major: 1, Mid: 2, "Small / pre-launch": 3 }[row.handleBand] ?? 4;
  if (key === "attribution_continuity_risk") return getAttributionRiskRank(row);
  if (key === "measurement_suitability") return getMeasurementSuitabilityRank(row);
  if (key === "promo_intensity") return { High: 0, Medium: 1, Low: 2 }[row.promo_intensity] ?? 3;
  if (key === "dominant_competitor_model") return { "Search-heavy": 0, "CTV-heavy": 1, "Affiliate-heavy": 2, "Constrained access": 3 }[row.dominant_competitor_model] ?? 4;
  if (key === "fanatics_launch_date") return row.fanatics_launch_date === "—" ? "ZZZ" : row.fanatics_launch_date;
  return row.state;
}

function applySort(rows) {
  const data = [...rows];

  if (!activeSort.key) return data;

  return data.sort((a, b) => {
    const primary = compareValues(getSortValue(a, activeSort.key), getSortValue(b, activeSort.key), activeSort.direction);
    if (primary !== 0) return primary;
    return compareValues(a.state, b.state, "asc");
  });
}

function bindHeaderSortButtons() {
  elements.headerRow.querySelectorAll(".sort-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.sortKey;
      if (activeSort.key !== key) {
        activeSort = { key, direction: "asc" };
      } else if (activeSort.direction === "asc") {
        activeSort = { key, direction: "desc" };
      } else {
        activeSort = { key: null, direction: "asc" };
      }
      activePreset = "none";
      render();
    });
  });
}

function buildFilterPills(filters) {
  const pills = [];
  if (filters.search) pills.push({ key: "search", label: `State: ${filters.search}` });
  if (filters.sportsStatus !== "all") pills.push({ key: "sportsStatus", label: `Sports: ${capitalize(filters.sportsStatus)}` });
  if (filters.igamingStatus !== "all") pills.push({ key: "igamingStatus", label: `iGaming: ${filters.igamingStatus === "yes" ? "Live" : filters.igamingStatus === "pending" ? "Pending" : "Not legal"}` });
  if (filters.licensingModel !== "all") pills.push({ key: "licensingModel", label: `Licensing: ${filters.licensingModel === "accessible" ? "Open or casino-tethered" : filters.licensingModel}` });
  if (filters.taxBand !== "all") pills.push({ key: "taxBand", label: `Tax band: ${filters.taxBand === "High+" ? "High or extreme" : filters.taxBand === "Workable" ? "Low or mid" : filters.taxBand}` });
  if (filters.handleTier !== "all") pills.push({ key: "handleTier", label: `Handle: ${filters.handleTier === "Scaled" ? "Mega or major" : filters.handleTier}` });
  if (filters.measurementCandidate !== "all") pills.push({ key: "measurementCandidate", label: `Measurement candidate: ${filters.measurementCandidate === "yes" ? "Yes" : "No"}` });
  if (filters.measurementSuitability !== "all") pills.push({ key: "measurementSuitability", label: `Measurement tag: ${getMeasurementSuitabilityLabel(filters.measurementSuitability)}` });
  if (filters.highAttributionRisk !== "all") pills.push({ key: "highAttributionRisk", label: `High attribution risk: ${filters.highAttributionRisk === "yes" ? "Yes" : "No"}` });
  return pills;
}

function clearFilter(key) {
  if (key === "search") elements.search.value = defaultFilters.search;
  if (key === "sportsStatus") elements.sportsStatus.value = defaultFilters.sportsStatus;
  if (key === "igamingStatus") elements.igamingStatus.value = defaultFilters.igamingStatus;
  if (key === "licensingModel") {
    elements.licensingModel.value = defaultFilters.licensingModel;
    hiddenFilters.licensingModel = defaultFilters.licensingModel;
  }
  if (key === "taxBand") {
    elements.taxBand.value = defaultFilters.taxBand;
    hiddenFilters.taxBand = defaultFilters.taxBand;
  }
  if (key === "handleTier") {
    elements.handleTier.value = defaultFilters.handleTier;
    hiddenFilters.handleTier = defaultFilters.handleTier;
  }
  if (key === "measurementCandidate") elements.measurementCandidate.value = defaultFilters.measurementCandidate;
  if (key === "highAttributionRisk") elements.highAttributionRisk.value = defaultFilters.highAttributionRisk;
  if (key === "measurementSuitability") hiddenFilters.measurementSuitability = defaultFilters.measurementSuitability;
  activePreset = "none";
  render();
}

function renderFilterText(filters) {
  const pills = buildFilterPills(filters);
  const parts = pills.map((pill) => pill.label);
  const filterText = parts.length ? parts.join(" • ") : "All 51 jurisdictions (50 states + DC) in view.";
  elements.activeFilterText.textContent = filterText;
  elements.printFilterSummary.textContent = filterText;
  elements.activeFilterChips.innerHTML = pills.length
    ? pills
        .map(
          (pill) => `
            <span class="filter-chip">
              ${escapeHtml(pill.label)}
              <button type="button" class="chip-clear" data-clear-filter="${pill.key}" aria-label="Clear ${escapeHtml(pill.label)}">×</button>
            </span>
          `
        )
        .join("")
    : `<span class="filter-chip muted">No filters applied</span>`;
}

function renderColumnToggleMenu() {
  elements.columnToggleMenu.innerHTML = columnDefinitions
    .map(
      (column) => `
        <label class="column-toggle-option">
          <input type="checkbox" data-column-key="${column.key}" ${visibleColumns[column.key] !== false ? "checked" : ""} />
          <span>${column.selectorLabel || column.label}</span>
        </label>
      `
    )
    .join("");
}

function renderCompetitiveSection(rows) {
  elements.competitiveBody.hidden = competitiveCollapsed;
  renderCompetitiveToggleButton();

  if (!rows.length) {
    elements.competitiveStateSelect.innerHTML = "";
    elements.competitivePromoIntensity.textContent = "";
    elements.dominantCompetitorModel.textContent = "";
    elements.competitiveDeploymentNote.textContent = "";
    elements.channelMixImplication.textContent = "";
    elements.competitiveVerified.textContent = "";
    elements.competitiveSources.innerHTML = "";
    return;
  }

  if (!rows.some((row) => row.state === selectedCompetitiveState)) {
    selectedCompetitiveState = rows[0].state;
  }

  elements.competitiveStateSelect.innerHTML = rows.map((row) => `<option value="${row.state}">${row.state}</option>`).join("");
  elements.competitiveStateSelect.value = selectedCompetitiveState;

  const row = rows.find((candidate) => candidate.state === selectedCompetitiveState) || rows[0];
  selectedCompetitiveState = row.state;

  elements.competitivePromoIntensity.innerHTML = displayPromoIntensity(row.promo_intensity);
  elements.dominantCompetitorModel.innerHTML = displayCompetitorModel(row.dominant_competitor_model);
  elements.competitiveDeploymentNote.textContent = row.media_deployment_note;
  elements.channelMixImplication.textContent = row.channel_mix_implication;
  elements.competitiveVerified.textContent = `Data last verified: ${row.last_verified}.`;
  elements.competitiveSources.innerHTML = [
    { label: "AGA state tracker", url: "https://www.americangaming.org/resources/state-gaming-map/" },
    { label: "Legal Sports Report", url: "https://www.legalsportsreport.com/" },
    { label: "Sports Handle", url: `https://sportshandle.com/${row.sports_handle_slug}/` }
  ]
    .map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a>`)
    .join(" • ");
}

function updateUrl(filters) {
  const params = new URLSearchParams();
  if (filters.search) params.set("state", filters.search);
  if (filters.sportsStatus !== "all") params.set("sports", filters.sportsStatus);
  if (filters.igamingStatus !== "all") params.set("igaming", filters.igamingStatus);
  if (filters.licensingModel !== "all") params.set("licensing", filters.licensingModel);
  if (filters.taxBand !== "all") params.set("tax_band", filters.taxBand);
  if (filters.handleTier !== "all") params.set("handle", filters.handleTier);
  if (filters.measurementCandidate !== "all") params.set("measurement", filters.measurementCandidate);
  if (filters.measurementSuitability !== "all") params.set("measurement_tag", filters.measurementSuitability);
  if (filters.highAttributionRisk !== "all") params.set("attr_risk", filters.highAttributionRisk);
  if (activeSort.key) params.set("sort", `${activeSort.key}:${activeSort.direction}`);
  const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
}

function loadFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const filters = { ...defaultFilters };
  if (params.has("state")) filters.search = params.get("state");
  if (params.has("sports")) filters.sportsStatus = params.get("sports");
  if (params.has("igaming")) filters.igamingStatus = params.get("igaming");
  if (params.has("licensing")) filters.licensingModel = params.get("licensing");
  if (params.has("tax_band")) filters.taxBand = params.get("tax_band");
  if (params.has("handle")) filters.handleTier = params.get("handle");
  if (params.has("measurement")) filters.measurementCandidate = params.get("measurement");
  if (params.has("measurement_tag")) filters.measurementSuitability = params.get("measurement_tag");
  if (params.has("attr_risk")) filters.highAttributionRisk = params.get("attr_risk");

  if (params.has("sort")) {
    const [key, direction] = params.get("sort").split(":");
    activeSort = normalizeSort({ key: key || "state", direction: direction || "asc" });
  }

  return normalizeFilters(filters);
}

function render() {
  const filters = getFilters();
  activeSort = normalizeSort(activeSort);
  const filtered = runFilter(stateData, filters);
  const sorted = applySort(filtered);
  const selectedStates = new Set(sorted.map((row) => row.state));
  if (expandedState && !selectedStates.has(expandedState)) expandedState = null;

  renderColumnToggleMenu();
  renderHeaderRow();
  renderRows(sorted);
  bindHeaderSortButtons();
  renderKPIs(sorted);
  renderFilterText(filters);
  renderPresetNarrative();
  renderTableSummary(sorted);
  renderMajorPolicyCallout(sorted);
  renderPolicyBrief(sorted);
  renderCompetitiveSection(sorted);
  renderActionShortlist(sorted);
  updateLastUpdatedDisplay();
  lastRenderedRows = sorted;
  updateUrl(filters);
}

function setFilters(newFilters) {
  const filters = normalizeFilters(newFilters);
  hiddenFilters.licensingModel = filters.licensingModel;
  hiddenFilters.taxBand = filters.taxBand;
  hiddenFilters.handleTier = filters.handleTier;
  hiddenFilters.measurementSuitability = filters.measurementSuitability;
  elements.search.value = filters.search;
  elements.sportsStatus.value = filters.sportsStatus;
  elements.igamingStatus.value = filters.igamingStatus;
  elements.licensingModel.value = ["accessible"].includes(filters.licensingModel) ? "all" : filters.licensingModel;
  elements.taxBand.value = ["High+", "Workable"].includes(filters.taxBand) ? "all" : filters.taxBand;
  elements.handleTier.value = ["Scaled"].includes(filters.handleTier) ? "all" : filters.handleTier;
  elements.measurementCandidate.value = filters.measurementCandidate;
  elements.highAttributionRisk.value = filters.highAttributionRisk;
  render();
}

function applyPreset(name) {
  activePreset = name;
  const presets = {
    "governance-watchlist": { ...defaultFilters, sportsStatus: "legal", taxBand: "High+", handleTier: "Scaled" },
    "launch-ready-tests": { ...defaultFilters, sportsStatus: "legal", licensingModel: "accessible", taxBand: "Workable", measurementCandidate: "yes", highAttributionRisk: "no" },
    "continuity-risk": { ...defaultFilters, highAttributionRisk: "yes" },
    "geo-holdout": { ...defaultFilters, measurementCandidate: "yes", measurementSuitability: "Prime for geo-holdouts" }
  };

  if (name === "governance-watchlist") activeSort = { key: "tax", direction: "desc" };
  if (name === "launch-ready-tests") activeSort = { key: "measurement_suitability", direction: "asc" };
  if (name === "continuity-risk") activeSort = { key: "attribution_continuity_risk", direction: "asc" };
  if (name === "geo-holdout") activeSort = { key: "measurement_suitability", direction: "asc" };

  setFilters(presets[name] || defaultFilters);
}

function showCopyToast(message, isError = false) {
  elements.copyToast.textContent = message;
  elements.copyToast.classList.toggle("error", isError);
  elements.copyToast.classList.add("show");
  clearTimeout(copyToastTimeout);
  copyToastTimeout = setTimeout(() => {
    elements.copyToast.classList.remove("show");
  }, 1500);
}

async function copySummary() {
  const filters = getFilters();
  const filtered = runFilter(stateData, filters);
  const liveBudgetRows = filtered.filter((row) => row.fanaticsSportsbook && row.online && row.sports === "legal");
  const totalBudgetProxy = liveBudgetRows.reduce((sum, row) => sum + row.media_budget_proxy, 0);
  const highTaxBudgetShare = totalBudgetProxy
    ? `${Math.round((liveBudgetRows.filter((row) => HIGH_TAX_THRESHOLD.has(row.taxBand)).reduce((sum, row) => sum + row.media_budget_proxy, 0) / totalBudgetProxy) * 100)}%`
    : "N/A";
  const measurementStates = filtered.filter((row) => row.measurement_candidate).length;
  const attributionRiskStates = filtered.filter((row) => row.high_attribution_drift_risk).length;
  const shortlist = filtered
    .sort((a, b) => compareValues(getReviewPriorityScore(a), getReviewPriorityScore(b), "desc") || compareValues(a.state, b.state, "asc"))
    .slice(0, 3)
    .map((row) => row.state)
    .join(", ");
  const summary = `View: ${elements.activeFilterText.textContent}. High-tax budget proxy share: ${highTaxBudgetShare}. Negative contribution states: TBD pending CAC/promo assumptions. Measurement calibration states: ${measurementStates}. Attribution continuity risk states: ${attributionRiskStates}.${shortlist ? ` Review watchlist: ${shortlist}.` : ""}`;

  try {
    await navigator.clipboard.writeText(summary);
    elements.copyBtn.textContent = "Copied";
    showCopyToast("View summary copied to clipboard.");
    setTimeout(() => {
      elements.copyBtn.textContent = "Copy view summary";
    }, 1200);
  } catch {
    elements.copyBtn.textContent = "Clipboard blocked";
    showCopyToast("Clipboard access is blocked in this browser.", true);
    setTimeout(() => {
      elements.copyBtn.textContent = "Copy view summary";
    }, 1200);
  }
}

function getMarkdownTable() {
  const visible = getVisibleColumns();
  const headers = visible.map((column) => column.label);
  const separator = visible.map(() => "---");
  const rows = lastRenderedRows.map((row) => visible.map((column) => sanitizeMarkdownCell(column.exportValue(row))));
  return [
    `| ${headers.join(" | ")} |`,
    `| ${separator.join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`)
  ].join("\n");
}

function sanitizeMarkdownCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

async function copyTable() {
  try {
    await navigator.clipboard.writeText(getMarkdownTable());
    elements.copyTableBtn.textContent = "Copied";
    showCopyToast("Markdown table copied to clipboard.");
    setTimeout(() => {
      elements.copyTableBtn.textContent = "Copy table";
    }, 1200);
  } catch {
    elements.copyTableBtn.textContent = "Clipboard blocked";
    showCopyToast("Clipboard access is blocked in this browser.", true);
    setTimeout(() => {
      elements.copyTableBtn.textContent = "Copy table";
    }, 1200);
  }
}

function getWorkbookRows(rows) {
  const visible = getVisibleColumns();
  return {
    headers: visible.map((column) => column.label),
    rows: rows.map((row) => visible.map((column) => column.exportValue(row)))
  };
}

function columnName(index) {
  let current = index + 1;
  let label = "";
  while (current > 0) {
    const remainder = (current - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    current = Math.floor((current - 1) / 26);
  }
  return label;
}

function buildWorksheetXml(headers, rows) {
  const sheetRows = [headers, ...rows];
  const worksheetRows = sheetRows
    .map((cells, rowIndex) => {
      const cellXml = cells
        .map((value, columnIndex) => {
          const ref = `${columnName(columnIndex)}${rowIndex + 1}`;
          const styleIndex = rowIndex === 0 ? 1 : 0;
          return `<c r="${ref}" t="inlineStr" s="${styleIndex}"><is><t>${escapeXml(value)}</t></is></c>`;
        })
        .join("");
      return `<row r="${rowIndex + 1}">${cellXml}</row>`;
    })
    .join("");

  const lastColumn = columnName(Math.max(headers.length - 1, 0));
  const lastRow = Math.max(sheetRows.length, 1);
  const filterRange = `A1:${lastColumn}${lastRow}`;
  const cols = headers
    .map((_, index) => `<col min="${index + 1}" max="${index + 1}" width="${index === 0 ? 18 : index === 7 ? 28 : 16}" customWidth="1"/>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews>
    <sheetView workbookViewId="0">
      <pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>
      <selection pane="bottomLeft" activeCell="A2" sqref="A2"/>
    </sheetView>
  </sheetViews>
  <sheetFormatPr defaultRowHeight="15"/>
  <cols>${cols}</cols>
  <sheetData>${worksheetRows}</sheetData>
  <autoFilter ref="${filterRange}"/>
</worksheet>`;
}

function buildWorkbookXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="State Market View" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`;
}

function buildWorkbookRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function buildRootRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
}

function buildContentTypesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
}

function buildStylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Calibri"/><family val="2"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/><family val="2"/></font>
  </fonts>
  <fills count="2">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
  </fills>
  <borders count="1">
    <border><left/><right/><top/><bottom/><diagonal/></border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
  </cellXfs>
  <cellStyles count="1">
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
  </cellStyles>
</styleSheet>`;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let crc = index;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
    table[index] = crc >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createZip(files) {
  let localSize = 0;
  let centralSize = 0;
  files.forEach((file) => {
    localSize += 30 + file.nameBytes.length + file.data.length;
    centralSize += 46 + file.nameBytes.length;
  });

  const output = new Uint8Array(localSize + centralSize + 22);
  const view = new DataView(output.buffer);
  let offset = 0;
  let centralOffset = localSize;

  files.forEach((file) => {
    file.localOffset = offset;
    view.setUint32(offset, 0x04034b50, true);
    view.setUint16(offset + 4, 20, true);
    view.setUint16(offset + 6, 0, true);
    view.setUint16(offset + 8, 0, true);
    view.setUint16(offset + 10, 0, true);
    view.setUint16(offset + 12, 0, true);
    view.setUint32(offset + 14, file.crc, true);
    view.setUint32(offset + 18, file.data.length, true);
    view.setUint32(offset + 22, file.data.length, true);
    view.setUint16(offset + 26, file.nameBytes.length, true);
    view.setUint16(offset + 28, 0, true);
    output.set(file.nameBytes, offset + 30);
    output.set(file.data, offset + 30 + file.nameBytes.length);
    offset += 30 + file.nameBytes.length + file.data.length;
  });

  files.forEach((file) => {
    view.setUint32(centralOffset, 0x02014b50, true);
    view.setUint16(centralOffset + 4, 20, true);
    view.setUint16(centralOffset + 6, 20, true);
    view.setUint16(centralOffset + 8, 0, true);
    view.setUint16(centralOffset + 10, 0, true);
    view.setUint16(centralOffset + 12, 0, true);
    view.setUint16(centralOffset + 14, 0, true);
    view.setUint32(centralOffset + 16, file.crc, true);
    view.setUint32(centralOffset + 20, file.data.length, true);
    view.setUint32(centralOffset + 24, file.data.length, true);
    view.setUint16(centralOffset + 28, file.nameBytes.length, true);
    view.setUint16(centralOffset + 30, 0, true);
    view.setUint16(centralOffset + 32, 0, true);
    view.setUint16(centralOffset + 34, 0, true);
    view.setUint16(centralOffset + 36, 0, true);
    view.setUint32(centralOffset + 38, 0, true);
    view.setUint32(centralOffset + 42, file.localOffset, true);
    output.set(file.nameBytes, centralOffset + 46);
    centralOffset += 46 + file.nameBytes.length;
  });

  view.setUint32(centralOffset, 0x06054b50, true);
  view.setUint16(centralOffset + 4, 0, true);
  view.setUint16(centralOffset + 6, 0, true);
  view.setUint16(centralOffset + 8, files.length, true);
  view.setUint16(centralOffset + 10, files.length, true);
  view.setUint32(centralOffset + 12, centralSize, true);
  view.setUint32(centralOffset + 16, localSize, true);
  view.setUint16(centralOffset + 20, 0, true);

  return output;
}

function createWorkbookBlob(rows) {
  const encoder = new TextEncoder();
  const workbook = getWorkbookRows(rows);
  const files = [
    { name: "[Content_Types].xml", content: buildContentTypesXml() },
    { name: "_rels/.rels", content: buildRootRelsXml() },
    { name: "xl/workbook.xml", content: buildWorkbookXml() },
    { name: "xl/_rels/workbook.xml.rels", content: buildWorkbookRelsXml() },
    { name: "xl/styles.xml", content: buildStylesXml() },
    { name: "xl/worksheets/sheet1.xml", content: buildWorksheetXml(workbook.headers, workbook.rows) }
  ].map((file) => {
    const data = encoder.encode(file.content);
    return {
      ...file,
      data,
      nameBytes: encoder.encode(file.name),
      crc: crc32(data)
    };
  });

  return new Blob([createZip(files)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function makeExportFilename() {
  const stamp = new Date().toISOString().slice(0, 10);
  return `state-market-view-${stamp}.xlsx`;
}

function downloadWorkbook() {
  try {
    const workbook = createWorkbookBlob(lastRenderedRows);
    downloadBlob(workbook, makeExportFilename());
    elements.downloadBtn.textContent = "Downloaded";
    showCopyToast(`Workbook downloaded for ${lastRenderedRows.length} row${lastRenderedRows.length === 1 ? "" : "s"}.`);
    setTimeout(() => {
      elements.downloadBtn.textContent = "Download XLSX";
    }, 1200);
  } catch {
    elements.downloadBtn.textContent = "Download failed";
    showCopyToast("Workbook export failed in this browser.", true);
    setTimeout(() => {
      elements.downloadBtn.textContent = "Download XLSX";
    }, 1200);
  }
}

[
  elements.search,
  elements.sportsStatus,
  elements.igamingStatus,
  elements.licensingModel,
  elements.taxBand,
  elements.handleTier,
  elements.measurementCandidate,
  elements.highAttributionRisk
].forEach((element) => {
  element.addEventListener("input", () => {
    activePreset = "none";
    hiddenFilters.licensingModel = elements.licensingModel.value;
    hiddenFilters.taxBand = elements.taxBand.value;
    hiddenFilters.handleTier = elements.handleTier.value;
    hiddenFilters.measurementSuitability = defaultFilters.measurementSuitability;
    render();
  });
  element.addEventListener("change", () => {
    activePreset = "none";
    hiddenFilters.licensingModel = elements.licensingModel.value;
    hiddenFilters.taxBand = elements.taxBand.value;
    hiddenFilters.handleTier = elements.handleTier.value;
    hiddenFilters.measurementSuitability = defaultFilters.measurementSuitability;
    render();
  });
});

elements.resetBtn.addEventListener("click", () => {
  activeSort = { key: "state", direction: "asc" };
  activePreset = "none";
  expandedState = null;
  setFilters(defaultFilters);
});
elements.copyBtn.addEventListener("click", copySummary);
elements.copyTableBtn.addEventListener("click", copyTable);
elements.downloadBtn.addEventListener("click", downloadWorkbook);
elements.copyHandoffBtn.addEventListener("click", copyHandoffSummary);

elements.activeFilterChips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-clear-filter]");
  if (!button) return;
  clearFilter(button.dataset.clearFilter);
});

function handleColumnToggle(event) {
  const input = event.target.closest("[data-column-key]");
  if (!input) return;
  visibleColumns[input.dataset.columnKey] = input.checked;
  if (!Object.values(visibleColumns).some(Boolean)) {
    visibleColumns.state = true;
  }
  saveVisibleColumns();
  render();
}

elements.columnToggleMenu.addEventListener("input", handleColumnToggle);
elements.columnToggleMenu.addEventListener("change", handleColumnToggle);

elements.presetButtons.forEach((button) => {
  const presetName = button.dataset.preset;
  button.title = presetDetails[presetName] || presetDetails.none;
  button.addEventListener("click", () => applyPreset(presetName));
});

elements.stateBriefSelect.addEventListener("change", () => renderPolicyBrief(lastRenderedRows));
elements.competitiveStateSelect.addEventListener("change", () => {
  selectedCompetitiveState = elements.competitiveStateSelect.value;
  renderCompetitiveSection(lastRenderedRows);
});
elements.toggleCompetitiveBtn.addEventListener("click", () => {
  competitiveCollapsed = !competitiveCollapsed;
  saveCompetitiveCollapsed();
  renderCompetitiveSection(lastRenderedRows);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && expandedState) {
    expandedState = null;
    renderRows(lastRenderedRows);
  }
});

updateLastUpdatedDisplay();

stateData
  .map((row) => row.state)
  .sort((a, b) => a.localeCompare(b))
  .forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    elements.search.appendChild(option);
  });

const initialFilters = loadFiltersFromUrl();
setFilters(initialFilters);

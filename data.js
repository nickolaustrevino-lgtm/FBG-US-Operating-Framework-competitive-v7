const dataLastUpdated = "March 21, 2026";

const stateData = [
  { state: "Alabama", region: "South", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Alaska", region: "West", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Arizona", region: "West", sports: "legal", online: true, igaming: false, tax: 10, handleTier: "T2", college: "Allowed" },
  { state: "Arkansas", region: "South", sports: "legal", online: true, igaming: false, tax: 51, taxNote: "effective revenue share", handleTier: "T3", college: "Allowed" },
  { state: "California", region: "West", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Colorado", region: "West", sports: "legal", online: true, igaming: false, tax: 10, handleTier: "T2", college: "Restricted props" },
  { state: "Connecticut", region: "Northeast", sports: "legal", online: true, igaming: true, tax: 13.75, handleTier: "T3", college: "Restricted in-state" },
  { state: "Delaware", region: "Northeast", sports: "legal", online: true, igaming: true, tax: 50, handleTier: "T3", college: "Restricted in-state" },
  { state: "Florida", region: "South", sports: "limited", sportsNote: "single-operator mobile", online: true, onlineNote: "Hard Rock only", igaming: false, tax: 15, handleTier: "T3", college: "Allowed" },
  { state: "Georgia", region: "South", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Hawaii", region: "West", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Idaho", region: "West", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Illinois", region: "Midwest", sports: "legal", online: true, igaming: false, tax: 45, taxNote: "tiered; ~40-50% effective", handleTier: "T1", college: "Restricted in-state", majorPolicyUpdate: "Tiered tax structure remains a major paid-media margin constraint for scaled operators." },
  { state: "Indiana", region: "Midwest", sports: "legal", online: true, igaming: false, tax: 9.5, handleTier: "T3", college: "Restricted props" },
  { state: "Iowa", region: "Midwest", sports: "legal", online: true, igaming: false, tax: 6.75, handleTier: "T3", college: "Restricted props" },
  { state: "Kansas", region: "Midwest", sports: "legal", online: true, igaming: false, tax: 10, handleTier: "T3", college: "Restricted props" },
  { state: "Kentucky", region: "South", sports: "legal", online: true, igaming: false, tax: 14.25, handleTier: "T3", college: "Allowed" },
  { state: "Louisiana", region: "South", sports: "legal", online: true, igaming: false, tax: 15, handleTier: "T3", college: "Allowed" },
  { state: "Maine", region: "Northeast", sports: "legal", online: true, igaming: false, igamingStatus: "pending", tax: 16, handleTier: "T3", college: "Restricted in-state", majorPolicyUpdate: "January 2026 iGaming legalization opened a new pathway; launch timing remains a watchpoint." },
  { state: "Maryland", region: "South", sports: "legal", online: true, igaming: false, tax: 20, handleTier: "T2", college: "Restricted props" },
  { state: "Massachusetts", region: "Northeast", sports: "legal", online: true, igaming: false, tax: 20, handleTier: "T2", college: "Tournament only" },
  { state: "Michigan", region: "Midwest", sports: "legal", online: true, igaming: true, tax: 8.4, handleTier: "T3", college: "Restricted props" },
  { state: "Minnesota", region: "Midwest", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Mississippi", region: "South", sports: "limited", sportsNote: "retail only", online: false, igaming: false, tax: 12, college: "Restricted props" },
  { state: "Missouri", region: "Midwest", sports: "legal", online: false, onlineNote: "Launch pending", igaming: false, tax: 10, handleTier: "T3", college: "Restricted in-state", majorPolicyUpdate: "Authorized market remains pre-launch; do not treat Missouri as a live online sportsbook state." },
  { state: "Montana", region: "West", sports: "limited", sportsNote: "lottery-run only", online: false, igaming: false, tax: 20, college: "Allowed" },
  { state: "Nebraska", region: "Midwest", sports: "limited", sportsNote: "retail only", online: false, igaming: false, tax: 20, college: "Restricted in-state" },
  { state: "Nevada", region: "West", sports: "legal", online: true, igaming: false, tax: 6.75, handleTier: "T2", college: "Allowed" },
  { state: "New Hampshire", region: "Northeast", sports: "legal", online: true, igaming: false, tax: 51, taxNote: "effective revenue share", handleTier: "T3", college: "Restricted in-state" },
  { state: "New Jersey", region: "Northeast", sports: "legal", online: true, igaming: true, tax: 19.75, handleTier: "T1", college: "Restricted props" },
  { state: "New Mexico", region: "West", sports: "limited", sportsNote: "tribal retail only", online: false, igaming: false, tax: 10, college: "Allowed" },
  { state: "New York", region: "Northeast", sports: "legal", online: true, igaming: false, tax: 51, handleTier: "T1", college: "Restricted in-state", majorPolicyUpdate: "Renewed iGaming budget debate could materially shift paid-media scale assumptions." },
  { state: "North Carolina", region: "South", sports: "legal", online: true, igaming: false, tax: 18, handleTier: "T2", college: "Restricted props" },
  { state: "North Dakota", region: "Midwest", sports: "limited", sportsNote: "tribal retail only", online: false, igaming: false, tax: 10, college: "Restricted in-state" },
  { state: "Ohio", region: "Midwest", sports: "legal", online: true, igaming: false, tax: 20, handleTier: "T2", college: "Restricted props" },
  { state: "Oklahoma", region: "South", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Oregon", region: "West", sports: "limited", sportsNote: "state-run only", online: true, onlineNote: "State-run only", igaming: false, tax: 51, taxNote: "effective revenue share", handleTier: "T3", college: "No college betting" },
  { state: "Pennsylvania", region: "Northeast", sports: "legal", online: true, igaming: true, tax: 36, handleTier: "T2", college: "Restricted props" },
  { state: "Rhode Island", region: "Northeast", sports: "legal", online: true, igaming: true, tax: 51, taxNote: "effective revenue share", handleTier: "T3", college: "Restricted in-state" },
  { state: "South Carolina", region: "South", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "South Dakota", region: "Midwest", sports: "limited", sportsNote: "Deadwood retail only", online: false, igaming: false, tax: 10, college: "Restricted in-state" },
  { state: "Tennessee", region: "South", sports: "legal", online: true, igaming: false, tax: 22, taxNote: "~1.85% handle tax / low-20s effective", handleTier: "T3", college: "Restricted props" },
  { state: "Texas", region: "South", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Utah", region: "West", sports: "illegal", online: false, igaming: false, tax: null, college: "N/A" },
  { state: "Vermont", region: "Northeast", sports: "legal", online: true, igaming: false, tax: 20, handleTier: "T3", college: "Restricted props" },
  { state: "Virginia", region: "South", sports: "legal", online: true, igaming: false, tax: 15, handleTier: "T2", college: "Restricted in-state", majorPolicyUpdate: "iGaming discussion remains active in policy circles and warrants media-planning monitoring." },
  { state: "Washington", region: "West", sports: "limited", sportsNote: "tribal retail only", online: false, igaming: false, tax: 10, college: "Allowed" },
  { state: "Washington D.C.", region: "Mid-Atlantic", sports: "legal", online: true, igaming: false, tax: 20, handleTier: "T3", college: "Restricted props" },
  { state: "West Virginia", region: "South", sports: "legal", online: true, igaming: true, tax: 10, handleTier: "T3", college: "Restricted props" },
  { state: "Wisconsin", region: "Midwest", sports: "limited", sportsNote: "tribal retail only", online: false, igaming: false, tax: 10, college: "Allowed" },
  { state: "Wyoming", region: "West", sports: "legal", online: true, igaming: false, tax: 10, handleTier: "T3", college: "Allowed" }
];

const fanaticsSportsbookStates = new Set([
  "Arizona",
  "Colorado",
  "Connecticut",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "New Jersey",
  "New York",
  "North Carolina",
  "Ohio",
  "Pennsylvania",
  "Tennessee",
  "Vermont",
  "Virginia",
  "Washington D.C.",
  "West Virginia",
  "Wyoming"
]);

const fanaticsCasinoStates = new Set(["Michigan", "New Jersey", "Pennsylvania", "West Virginia"]);
const handleShareOverrides = {
  "New York": 16.0,
  Illinois: 9.5,
  "New Jersey": 7.4
};

const quarterlyVerifiedDate = dataLastUpdated;

const taxTrendOverrides = {
  Illinois: "up",
  Maine: "unknown",
  Missouri: "unknown",
  Alabama: "unknown",
  Alaska: "unknown",
  California: "unknown",
  Georgia: "unknown",
  Hawaii: "unknown",
  Idaho: "unknown",
  Minnesota: "unknown",
  Oklahoma: "unknown",
  "South Carolina": "unknown",
  Texas: "unknown",
  Utah: "unknown"
};

const fanaticsLaunchDateOverrides = {
  Arizona: "Q2 2024",
  Colorado: "Q2 2024",
  Connecticut: "Q4 2023",
  Illinois: "Q4 2023",
  Indiana: "Q4 2023",
  Iowa: "Q1 2024",
  Kansas: "Q1 2024",
  Kentucky: "Q4 2023",
  Louisiana: "Q1 2024",
  Maryland: "Q4 2023",
  Massachusetts: "Q4 2023",
  Michigan: "Q4 2023",
  "New Jersey": "Q4 2023",
  "New York": "Q4 2023",
  "North Carolina": "Q1 2024",
  Ohio: "Q1 2024",
  Pennsylvania: "Q4 2023",
  Tennessee: "Q4 2024",
  Vermont: "Q1 2024",
  Virginia: "Q1 2024",
  "Washington D.C.": "Q1 2024",
  "West Virginia": "Q4 2023",
  Wyoming: "Q2 2024"
};

const fanduelSportsbookLiveStates = new Set([
  "Arizona",
  "Colorado",
  "Connecticut",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Nevada",
  "New Jersey",
  "New York",
  "North Carolina",
  "Ohio",
  "Pennsylvania",
  "Tennessee",
  "Vermont",
  "Virginia",
  "Washington D.C.",
  "West Virginia",
  "Wyoming"
]);

const draftkingsSportsbookLiveStates = new Set([
  "Arizona",
  "Colorado",
  "Connecticut",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New York",
  "North Carolina",
  "Ohio",
  "Pennsylvania",
  "Tennessee",
  "Vermont",
  "Virginia",
  "Washington D.C.",
  "West Virginia",
  "Wyoming"
]);

const fanduelCasinoLiveStates = new Set(["Michigan", "New Jersey", "Pennsylvania", "West Virginia"]);
const draftkingsCasinoLiveStates = new Set(["Michigan", "New Jersey", "Pennsylvania", "West Virginia"]);
const competitiveCasinoUnknownStates = new Set(["Connecticut", "Delaware", "Rhode Island"]);
const competitiveSportsbookUnknownStates = new Set(["Arkansas", "Delaware", "Rhode Island"]);

const tribalExclusiveStates = new Set(["Florida", "Maine", "New Mexico", "North Dakota", "South Dakota", "Washington", "Wisconsin"]);
const stateMonopolyStates = new Set(["Delaware", "Montana", "New Hampshire", "Oregon", "Rhode Island"]);
const casinoTetheredStates = new Set([
  "Arizona",
  "Arkansas",
  "Connecticut",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Michigan",
  "Mississippi",
  "Missouri",
  "Nebraska",
  "Nevada",
  "New Jersey",
  "Pennsylvania",
  "West Virginia"
]);

const attributionContinuityRiskOverrides = {
  Illinois: "High",
  Michigan: "High",
  "New Jersey": "High",
  "New York": "High",
  Ohio: "High",
  Pennsylvania: "High",
  Arizona: "Medium",
  Colorado: "Medium",
  Connecticut: "Medium",
  Louisiana: "Medium",
  Maryland: "Medium",
  Massachusetts: "Medium",
  "North Carolina": "Medium",
  Tennessee: "Medium",
  Virginia: "Medium",
  "Washington D.C.": "Medium",
  "West Virginia": "Medium"
};

const measurementSuitabilityOverrides = {
  Arizona: "MMM calibration only",
  Colorado: "Prime for geo-holdouts",
  Connecticut: "MMM calibration only",
  Illinois: "MMM calibration only",
  Indiana: "Prime for geo-holdouts",
  Iowa: "Prime for geo-holdouts",
  Kansas: "Prime for geo-holdouts",
  Kentucky: "Prime for geo-holdouts",
  Louisiana: "Prime for geo-holdouts",
  Maryland: "Prime for geo-holdouts",
  Massachusetts: "MMM calibration only",
  Michigan: "MMM calibration only",
  "New Jersey": "MMM calibration only",
  "New York": "MMM calibration only",
  "North Carolina": "MMM calibration only",
  Ohio: "MMM calibration only",
  Pennsylvania: "MMM calibration only",
  Tennessee: "MMM calibration only",
  Vermont: "Prime for geo-holdouts",
  Virginia: "Prime for geo-holdouts",
  "Washington D.C.": "Prime for geo-holdouts",
  "West Virginia": "Prime for geo-holdouts",
  Wyoming: "Prime for geo-holdouts"
};

const promoIntensityOverrides = {
  "New York": "High",
  Illinois: "High",
  "New Jersey": "High",
  Pennsylvania: "High",
  Michigan: "High",
  Ohio: "High",
  Massachusetts: "High",
  "North Carolina": "High",
  Virginia: "High",
  Colorado: "Medium",
  Arizona: "Medium",
  Maryland: "Medium",
  Indiana: "Medium",
  Iowa: "Medium",
  Kansas: "Medium",
  Kentucky: "Medium",
  Louisiana: "Medium",
  Tennessee: "Medium",
  Vermont: "Low",
  Wyoming: "Low",
  "West Virginia": "Low",
  Nevada: "Medium",
  Connecticut: "Medium",
  "New Hampshire": "Medium",
  "Washington D.C.": "Medium"
};

const dominantCompetitorModelOverrides = {
  Arizona: "CTV-heavy",
  Colorado: "CTV-heavy",
  Connecticut: "Search-heavy",
  Illinois: "CTV-heavy",
  Indiana: "Affiliate-heavy",
  Iowa: "Affiliate-heavy",
  Kansas: "Affiliate-heavy",
  Kentucky: "Affiliate-heavy",
  Louisiana: "Affiliate-heavy",
  Maryland: "Search-heavy",
  Massachusetts: "CTV-heavy",
  Michigan: "Search-heavy",
  Nevada: "Search-heavy",
  "New Hampshire": "Search-heavy",
  "New Jersey": "Search-heavy",
  "New York": "Search-heavy",
  "North Carolina": "CTV-heavy",
  Ohio: "Search-heavy",
  Pennsylvania: "CTV-heavy",
  Tennessee: "Affiliate-heavy",
  Vermont: "Affiliate-heavy",
  Virginia: "Search-heavy",
  "Washington D.C.": "Search-heavy",
  "West Virginia": "Affiliate-heavy",
  Wyoming: "Affiliate-heavy"
};

const competitiveSourceSlugOverrides = {
  "Washington D.C.": "washington-dc"
};

function deriveCompetitiveStatus(row, liveSet, unknownSet, kind) {
  if (liveSet.has(row.state)) return "Live";
  if (unknownSet.has(row.state)) return "Unknown";
  if (row.sports === "illegal") return "Not Live";
  if (kind === "casino" && !row.igaming && row.igamingStatus !== "pending") return "Not Live";
  if (kind === "sportsbook" && (!row.online || row.sports !== "legal")) return "Not Live";
  return "Not Live";
}

function deriveCompetitiveIntensity(row) {
  const fdLive = row.fanduel_sportsbook === "Live";
  const dkLive = row.draftkings_sportsbook === "Live";
  if (fdLive && dkLive) return "High";
  if (fdLive || dkLive) return "Medium";
  return "Low";
}

function deriveLicensingModel(row) {
  if (row.sports === "illegal") return "Not yet authorized";
  if (tribalExclusiveStates.has(row.state)) return "Tribal exclusive";
  if (stateMonopolyStates.has(row.state)) return "State monopoly";
  if (casinoTetheredStates.has(row.state)) return "Casino-tethered";
  return "Open commercial";
}

function deriveTaxBand(tax) {
  if (tax === null) return "N/A";
  if (tax < 10) return "Low";
  if (tax < 20) return "Mid";
  if (tax < 35) return "High";
  return "Extreme";
}

function deriveHandleBand(row) {
  if (row.handleTier === "T1") return "Mega";
  if (row.handleTier === "T2") return "Major";
  if (row.handleTier === "T3") return "Mid";
  return "Small / pre-launch";
}

function deriveAttributionContinuityRisk(row) {
  if (attributionContinuityRiskOverrides[row.state]) return attributionContinuityRiskOverrides[row.state];
  if (row.fanaticsSportsbook && (row.handleTier === "T1" || row.handleTier === "T2")) return "Medium";
  return "Low";
}

function deriveMeasurementSuitability(row) {
  if (measurementSuitabilityOverrides[row.state]) return measurementSuitabilityOverrides[row.state];
  if (row.sports !== "legal" || !row.online || !row.fanaticsSportsbook) return "Don't test here";
  return row.handleTier === "T2" ? "MMM calibration only" : "Don't test here";
}

function derivePromoIntensity(row) {
  if (promoIntensityOverrides[row.state]) return promoIntensityOverrides[row.state];
  if (row.competitive_intensity === "High") return row.handleTier === "T1" || row.handleTier === "T2" ? "High" : "Medium";
  if (row.competitive_intensity === "Medium") return row.handleTier === "T1" || row.handleTier === "T2" ? "Medium" : "Low";
  return "Low";
}

function deriveDominantCompetitorModel(row) {
  if (row.sports !== "legal" || !row.online) return "Constrained access";
  if (dominantCompetitorModelOverrides[row.state]) return dominantCompetitorModelOverrides[row.state];
  if (row.handleTier === "T1") return "Search-heavy";
  if (row.handleTier === "T2") return "CTV-heavy";
  return "Affiliate-heavy";
}

function deriveMediaDeploymentNote(row) {
  if (row.dominant_competitor_model === "Affiliate-heavy") return "Affiliate discipline and promo terms likely change efficiency fastest here.";
  if (row.dominant_competitor_model === "CTV-heavy") return "Expect more upper-funnel pressure, so direct-response reads can drift faster.";
  if (row.dominant_competitor_model === "Search-heavy") return "Protect branded search capture and watch last-click bias closely.";
  return "Access structure matters more than channel mix in this market.";
}

function deriveChannelMixImplication(row) {
  if (row.dominant_competitor_model === "CTV-heavy") return "Competitors are heavy on CTV — validate lift with MMM before scaling TV spend.";
  if (row.dominant_competitor_model === "Search-heavy") return "Search is the primary competitor channel — protect branded terms, test incrementality.";
  if (row.dominant_competitor_model === "Affiliate-heavy") return "Affiliate-driven market — lower promo pressure but harder MMM attribution.";
  return "Access structure matters more than channel mix here — no media planning needed yet.";
}

function deriveFbgEcosystemFit(row) {
  if (row.fanaticsCasino) return "Active ecosystem — casino";
  if (row.fanaticsSportsbook) return "Active ecosystem";
  if (row.sports === "legal" && row.online) return "Entry opportunity";
  return "No current ecosystem";
}

function derivePmgTransitionRisk(row) {
  if (["New York", "Illinois", "Pennsylvania", "New Jersey", "Ohio", "Michigan"].includes(row.state)) return "HIGH";
  if (row.attribution_continuity_risk === "Medium") return "MEDIUM";
  return "LOW";
}

function stateSlug(row) {
  return competitiveSourceSlugOverrides[row.state] || row.state.toLowerCase().replaceAll(".", "").replaceAll(" ", "-");
}

stateData.forEach((row) => {
  row.fanaticsSportsbook = fanaticsSportsbookStates.has(row.state);
  row.fanaticsCasino = fanaticsCasinoStates.has(row.state);
  if (!row.online || row.sports !== "legal") {
    row.handleShare = 0;
  } else if (handleShareOverrides[row.state] !== undefined) {
    row.handleShare = handleShareOverrides[row.state];
  } else {
    row.handleShare = row.handleTier === "T2" ? 4 : row.handleTier === "T3" ? 1 : 0;
  }

  row.taxTrend = taxTrendOverrides[row.state] || (row.tax === null ? "unknown" : "stable");
  row.fanatics_launch_date = row.fanaticsSportsbook ? fanaticsLaunchDateOverrides[row.state] || "Estimated" : "—";
  row.last_verified = quarterlyVerifiedDate;
  row.fanduel_sportsbook = deriveCompetitiveStatus(row, fanduelSportsbookLiveStates, competitiveSportsbookUnknownStates, "sportsbook");
  row.fanduel_casino = deriveCompetitiveStatus(row, fanduelCasinoLiveStates, competitiveCasinoUnknownStates, "casino");
  row.draftkings_sportsbook = deriveCompetitiveStatus(row, draftkingsSportsbookLiveStates, competitiveSportsbookUnknownStates, "sportsbook");
  row.draftkings_casino = deriveCompetitiveStatus(row, draftkingsCasinoLiveStates, competitiveCasinoUnknownStates, "casino");
  row.competitive_intensity = deriveCompetitiveIntensity(row);
  row.licensingModel = deriveLicensingModel(row);
  row.taxBand = deriveTaxBand(row.tax);
  row.handleBand = deriveHandleBand(row);
  row.attribution_continuity_risk = deriveAttributionContinuityRisk(row);
  row.measurement_suitability = deriveMeasurementSuitability(row);
  row.measurement_candidate = row.measurement_suitability !== "Don't test here";
  row.high_attribution_drift_risk = row.attribution_continuity_risk === "High";
  row.media_budget_proxy = row.fanaticsSportsbook ? row.handleShare || (row.handleTier === "T1" ? 8 : row.handleTier === "T2" ? 4 : 1) : 0;
  row.promo_intensity = derivePromoIntensity(row);
  row.dominant_competitor_model = deriveDominantCompetitorModel(row);
  row.media_deployment_note = deriveMediaDeploymentNote(row);
  row.channel_mix_implication = deriveChannelMixImplication(row);
  row.fbg_ecosystem_fit = deriveFbgEcosystemFit(row);
  row.pmg_transition_risk = derivePmgTransitionRisk(row);
  row.sports_handle_slug = stateSlug(row);
});

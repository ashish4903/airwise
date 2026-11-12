export const AREA_ACTION_SOURCES = [
  {
    label: "WHO: policies that reduce outdoor air pollution",
    url: "https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health",
  },
  {
    label: "India CPCB: National Clean Air Programme portal",
    url: "https://prana.cpcb.gov.in/",
  },
  {
    label: "European Environment Agency: transport and mobility",
    url: "https://www.eea.europa.eu/en/topics/in-depth/air-pollution/transport-and-mobility",
  },
  {
    label: "China air-pollution action-plan evaluation (PubMed)",
    url: "https://pubmed.ncbi.nlm.nih.gov/35738375/",
  },
];

const ACTIONS = {
  sourceAudit: {
    id: "source-audit",
    category: "START HERE",
    title: "Check what is actually polluting this area",
    action: "Ask ward and pollution-control teams to inspect likely sources around busy roads, construction sites, generators, and waste-burning locations. Compare the model clue with nearby official monitor readings and on-the-ground observations before choosing a control.",
    owner: "Ward office and Maharashtra Pollution Control Board (MPCB)",
    measure: "Publish the source-check findings and record which confirmed sources receive a corrective action.",
  },
  traffic: {
    id: "cleaner-transport",
    category: "TRAFFIC & TRANSPORT",
    title: "Make short trips and busy corridors cleaner",
    action: "Prioritize reliable buses, safe walking and cycling links, and smoother traffic at identified bottlenecks. Enforce anti-idling near schools, hospitals, and bus stops; check high-emitting vehicles and delivery schedules where monitoring confirms a problem.",
    owner: "Pune traffic police, transport teams, and bus operators",
    measure: "Count peak-hour vehicles and idling events on the same road before and after changes; track bus service and walking/cycling use.",
  },
  dust: {
    id: "dust-controls",
    category: "ROAD & CONSTRUCTION DUST",
    title: "Stop dust escaping from roads and worksites",
    action: "Inspect active construction and demolition sites, uncovered material loads, and dusty road shoulders. Require covered transport, effective site barriers, wheel cleaning, prompt debris removal, and suitable mechanized road cleaning.",
    owner: "Municipal ward teams, site owners, and contractors",
    measure: "Track inspected sites, repeat violations, resolved complaints, and dust readings at fixed locations.",
  },
  waste: {
    id: "waste-burning",
    category: "WASTE & OPEN BURNING",
    title: "Prevent garbage and leaf burning",
    action: "Make waste collection dependable, provide a clear way to report burning, and respond quickly. Separate green waste for composting or other approved processing instead of burning it in streets or vacant plots.",
    owner: "Municipal sanitation teams and local waste contractors",
    measure: "Track reported fires, response time, collection gaps, and green waste sent for safe processing.",
  },
  greenery: {
    id: "urban-greenery",
    category: "LONG-TERM GREENING",
    title: "Plan trees where they can thrive",
    action: "Map available planting space and existing canopy first, then choose locally suitable species and protect them through establishment. Prioritize shade along walking routes and places with little canopy. Trees are a long-term urban benefit, not a substitute for controlling emissions or a quick AQI fix.",
    owner: "Municipal parks and tree teams, with residents and local ecologists",
    measure: "Set a planting count only after the site survey; report survival and canopy cover over time, not just saplings planted.",
  },
  ozone: {
    id: "regional-precursors",
    category: "CITY & REGIONAL COORDINATION",
    title: "Address ozone-forming pollution across the region",
    action: "Compare ozone at different times of day with official monitoring, then coordinate controls on nitrogen oxides and volatile organic compounds from transport, fuel use, and industry. Ozone can form downwind, so one neighbourhood's tree or vehicle count cannot predict its level.",
    owner: "MPCB and city, industrial, and transport authorities",
    measure: "Review monitored ozone and precursor trends across locations and seasons alongside the actions taken.",
  },
  monitor: {
    id: "measure-progress",
    category: "CHECK WHAT WORKS",
    title: "Measure progress before claiming success",
    action: "Use official monitoring where available and keep the location, time, and method consistent. Compare longer-term readings before and after a change, and account for weather and regional pollution; a short-term model estimate is not proof that an intervention worked.",
    owner: "MPCB, municipal teams, and independent monitoring partners",
    measure: "Share a regular progress update with monitor locations, dates, pollutant levels, and known limitations.",
  },
};

const PRIORITY_ACTION_BY_SIGNAL = {
  pm2_5: "sourceAudit",
  pm10: "dust",
  nitrogen_dioxide: "traffic",
  ozone: "ozone",
};

const AREA_CONTEXTS = {
  "Pune city": {
    label: "City-wide coordination",
    context: "At city scale, air pollution can come from several sectors and travel across ward boundaries. A Pune-wide plan needs coordinated measurement and follow-through by transport, construction, waste, industrial, and environmental teams.",
    actions: ["cityTransport", "cityWorks"],
  },
  Kothrud: {
    label: "Residential neighbourhood and busy connectors",
    context: "Use a residential-neighbourhood lens: check commute traffic and idling on connecting roads, alongside active redevelopment or road works near homes, schools, and walking routes.",
    actions: ["schoolRoutes", "redevelopment"],
  },
  Shivajinagar: {
    label: "Central transit and civic district",
    context: "Focus checks around central bus and rail interchanges, civic destinations, and busy commercial streets. Queueing, idling, deliveries, and pedestrian access are practical issues to investigate at specific junctions.",
    actions: ["interchange", "centralStreets"],
  },
  Aundh: {
    label: "Residential-commercial corridor",
    context: "Check commuter queues and roadside activity on the main connecting corridors, while inspecting any active building or road work near residential streets.",
    actions: ["corridorJunctions", "worksites"],
  },
  Baner: {
    label: "Growth and construction corridor",
    context: "As development continues, prioritize dust controls at active sites and road works, plus protection of existing mature trees and usable green space. Verify current site activity and canopy gaps on the ground.",
    actions: ["growthDust", "canopy"],
  },
  Hadapsar: {
    label: "Employment, logistics, and residential mix",
    context: "Separate possible industrial, freight, and commuter contributions instead of assuming one source. Check road-side exposure where heavy vehicles pass residential or employment areas.",
    actions: ["freight", "industrial"],
  },
  "Koregaon Park": {
    label: "Residential and hospitality streets",
    context: "Prioritize peak-hour parking, deliveries, and through-traffic on local streets. Protect established shade trees where they exist, and identify any specific gaps before proposing planting.",
    actions: ["localTraffic", "canopy"],
  },
  "Viman Nagar": {
    label: "Airport-access and commercial district",
    context: "Check road traffic, taxis, buses, and goods movement on airport-access and commercial corridors. A neighborhood model reading alone cannot identify aircraft or any other specific source.",
    actions: ["airportAccess", "commercialDeliveries"],
  },
  "Pimpri-Chinchwad": {
    label: "Industrial and freight network",
    context: "Coordinate industrial-emissions checks with truck and freight-route monitoring. Compare readings near industrial edges and residential areas before choosing controls.",
    actions: ["industrial", "freight"],
  },
  Wakad: {
    label: "Fast-growing residential and highway links",
    context: "Check construction dust and traffic queues on major commuter links, while mapping which residential streets need safer walking connections and protection from through-traffic.",
    actions: ["growthDust", "corridorJunctions"],
  },
  Katraj: {
    label: "Highway access and hill-edge growth",
    context: "Inspect freight-road dust and active construction near highway access. Protect existing hill-edge vegetation and identify suitable planting sites through a local survey rather than assuming a tree count.",
    actions: ["freightDust", "hillGreen"],
  },
  Warje: {
    label: "Arterial roads and hill-edge neighbourhoods",
    context: "Check queues and heavy vehicles on arterial approaches, alongside dust from road or building works. Identify and protect existing hill-edge and street greenery where confirmed.",
    actions: ["corridorJunctions", "hillGreen"],
  },
  Yerawada: {
    label: "Airport-access and mixed-use corridors",
    context: "Investigate ground transport and freight on major access roads, and compare readings across residential, commercial, and employment streets. Do not assign a model reading to airport activity without source evidence.",
    actions: ["airportAccess", "industrial"],
  },
};

const AREA_ACTIONS = {
  cityTransport: {
    id: "city-transport-links",
    category: "CITY-WIDE TRANSPORT",
    title: "Connect cleaner trips across Pune",
    action: "Coordinate bus reliability, safe walking and cycling links, anti-idling enforcement, and bottleneck fixes across wards. Choose priority corridors using traffic counts and official air monitoring.",
    owner: "Pune transport teams, traffic police, and bus operators",
    measure: "Track bus frequency and use, vehicle queues, idling events, and roadside pollutant trends on selected corridors.",
  },
  cityWorks: {
    id: "city-works-and-waste",
    category: "CITY-WIDE OPERATIONS",
    title: "Make construction, road, and waste controls consistent",
    action: "Use common dust-control checks at construction sites, improve road-dust management, and prevent open waste burning through dependable collection and response.",
    owner: "Municipal ward teams, site owners, sanitation teams, and MPCB",
    measure: "Report inspections, repeat violations, dust-related complaints, waste-burning reports, and resolution times by ward.",
  },
  schoolRoutes: {
    id: "school-walking-routes",
    category: "STREETS & DAILY TRIPS",
    title: "Make school and local walking routes cleaner",
    action: "Identify school gates and walking routes on busy roads. Reduce vehicle idling and unsafe pick-up queues there, and connect nearby homes to bus stops with continuous, shaded footpaths where space allows.",
    owner: "Ward office, traffic police, and school administrations",
    measure: "Count idling vehicles at chosen school gates and inspect footpath continuity and shade before and after changes.",
  },
  redevelopment: {
    id: "redevelopment-dust",
    category: "BUILDING & ROAD WORK",
    title: "Check redevelopment sites street by street",
    action: "Map active demolition, excavation, and road works near homes. Require covered debris transport, site barriers, wheel cleaning, prompt cleanup, and a public contact for dust complaints.",
    owner: "Ward engineering teams, building-permission teams, and contractors",
    measure: "Publish site inspections, dust complaints, repeat violations, and corrective-action completion.",
  },
  interchange: {
    id: "transit-interchange",
    category: "TRANSIT & TRAFFIC",
    title: "Reduce idling around bus and rail interchanges",
    action: "Observe bus, auto-rickshaw, taxi, and private pick-up queues at interchange approaches. Separate pick-up zones from bus movement, enforce no-idling rules, and improve convenient transfers.",
    owner: "Transit operators, traffic police, and interchange managers",
    measure: "Record queue length, idling events, bus delay, and roadside readings at the same times each week.",
  },
  centralStreets: {
    id: "central-street-management",
    category: "CENTRAL STREETS",
    title: "Keep loading and deliveries off the busiest periods",
    action: "Audit curbside loading, double parking, and delivery stops on busy commercial streets. Test timed loading windows and clear walking routes where observations show recurring obstruction or congestion.",
    owner: "Ward office, traffic police, and local businesses",
    measure: "Track blocked-lane events, congestion duration, and pedestrian access during comparable peak periods.",
  },
  corridorJunctions: {
    id: "corridor-junctions",
    category: "COMMUTER CORRIDORS",
    title: "Fix the specific junctions where traffic queues",
    action: "Map peak-hour queues and idling at corridor junctions before changing signal timing or curb use. Pair traffic-flow changes with safer walking and bus access so vehicles are not simply diverted onto residential streets.",
    owner: "Traffic police, transport planners, and ward engineers",
    measure: "Compare queue duration and traffic counts on the junction and nearby streets before and after a trial.",
  },
  worksites: {
    id: "local-worksite-checks",
    category: "ACTIVE WORKSITES",
    title: "Inspect construction and road work near homes",
    action: "Ask residents and ward teams to map active worksites and report uncovered materials, dusty exits, and debris. Prioritize repeat checks where complaints and site activity overlap.",
    owner: "Ward engineering teams, contractors, and residents",
    measure: "Track locations checked, repeat dust complaints, and time to correct confirmed violations.",
  },
  growthDust: {
    id: "growth-corridor-dust",
    category: "GROWTH & CONSTRUCTION",
    title: "Make dust control part of every active project",
    action: "Create a current map of demolition, construction, and road projects. Apply covered transport, barriers, wheel washing, and prompt road cleanup; preserve mature trees when reviewing project layouts.",
    owner: "Municipal building and road teams, developers, and contractors",
    measure: "Track active-site compliance, repeat dust complaints, mature trees retained, and corrective actions completed.",
  },
  canopy: {
    id: "canopy-and-shade",
    category: "TREES & SHADE",
    title: "Fill verified shade gaps and protect existing canopy",
    action: "Walk the selected area's main footpaths and public spaces to record shade gaps, utilities, and available planting sites. Protect mature trees first; choose locally suitable species only after confirming site space, water, and long-term care.",
    owner: "Municipal tree and parks teams, local ecologists, and resident groups",
    measure: "Map canopy gaps and report mature-tree retention, planted-site survival, and canopy cover over time—not just sapling totals.",
  },
  freight: {
    id: "freight-route-check",
    category: "FREIGHT & HEAVY VEHICLES",
    title: "Keep heavy-vehicle routes away from sensitive streets where possible",
    action: "Use traffic counts and roadside checks to identify recurring heavy-vehicle queues. Review delivery windows, route signage, vehicle condition, and anti-idling enforcement with affected residents and businesses.",
    owner: "Traffic police, transport teams, MPCB, and freight operators",
    measure: "Count heavy vehicles and idling events on selected roads and compare nearby readings across matched times.",
  },
  industrial: {
    id: "industrial-source-check",
    category: "INDUSTRIAL SOURCE CHECK",
    title: "Verify industrial sources with monitoring and inspections",
    action: "Where industrial activity is nearby, compare official monitor trends and inspection records with wind direction and operating schedules. Direct compliance checks at confirmed emitters instead of inferring an industrial source from a neighborhood model.",
    owner: "MPCB and relevant industrial operators",
    measure: "Publish inspection follow-up, compliance actions, and pollutant trends at suitable upwind and downwind locations.",
  },
  localTraffic: {
    id: "local-street-traffic",
    category: "LOCAL STREET MANAGEMENT",
    title: "Reduce avoidable traffic on residential streets",
    action: "Observe parking, restaurant pick-up, deliveries, and through-traffic at the busiest times. Test loading zones and pedestrian-priority periods with local businesses before considering wider restrictions.",
    owner: "Ward office, traffic police, hospitality businesses, and residents",
    measure: "Track idling and blocked-lane events, walking access, and traffic on neighboring streets during a time-limited trial.",
  },
  airportAccess: {
    id: "airport-access-traffic",
    category: "AIRPORT-ACCESS ROADS",
    title: "Improve ground transport to reduce road-side queues",
    action: "Check taxi, bus, staff, and delivery queues on airport-access roads. Improve shared transit and pick-up management and enforce anti-idling; treat aircraft emissions as unverified unless dedicated source data supports that conclusion.",
    owner: "Traffic police, airport ground-transport teams, and bus operators",
    measure: "Count road-side queues and idling at selected access points and track bus/shared-trip use.",
  },
  commercialDeliveries: {
    id: "commercial-delivery-windows",
    category: "COMMERCIAL DISTRICT",
    title: "Organize deliveries around busy commute periods",
    action: "Map delivery stops and double parking near commercial buildings. Test off-peak delivery windows and shared loading areas where businesses agree and traffic observations show a benefit.",
    owner: "Commercial property managers, businesses, ward office, and traffic police",
    measure: "Track delivery-related blockages and peak-hour queue duration before and after the trial.",
  },
  freightDust: {
    id: "freight-road-dust",
    category: "HIGHWAY DUST & FREIGHT",
    title: "Check dust along highway approaches and construction edges",
    action: "Inspect heavy-vehicle routes for uncovered loads, dusty shoulders, and construction debris. Enforce load covering and site cleanup, and use suitable road-dust controls without simply shifting traffic into residential lanes.",
    owner: "Traffic police, road agencies, ward engineers, and contractors",
    measure: "Track uncovered loads, dust complaints, road inspections, and heavy-vehicle queues on selected approaches.",
  },
  hillGreen: {
    id: "hill-edge-green-space",
    category: "HILL-EDGE GREEN SPACE",
    title: "Protect existing hillside vegetation and map safe planting sites",
    action: "Ask local teams to identify vegetation under pressure, erosion and construction edges, and publicly accessible planting sites. Protect existing cover first; plant only where ecological, utility, and water checks support it.",
    owner: "Municipal tree teams, local ecologists, land managers, and residents",
    measure: "Map verified green-space boundaries and track habitat condition and survival of approved plantings.",
  },
};

export function generateAreaActionSuggestions(areaName, signalId) {
  const normalizedAreaName = areaName.trim().toLowerCase();
  const matchedAreaName = Object.keys(AREA_CONTEXTS).find((name) =>
    normalizedAreaName === name.toLowerCase()
    || normalizedAreaName.startsWith(`${name.toLowerCase()},`)
    || normalizedAreaName.endsWith(`, ${name.toLowerCase()}`));
  const context = AREA_CONTEXTS[matchedAreaName] ?? {
    label: "Local street and land-use check",
    context: "A verified land-use or tree-cover profile is not available for this place. Start with a short local walk-through and ward-level data check before assuming that traffic, construction, or a lack of greenery is the main issue.",
    actions: ["schoolRoutes", "worksites"],
  };
  const priorityId = PRIORITY_ACTION_BY_SIGNAL[signalId] ?? "sourceAudit";
  const priorityAction = ACTIONS[priorityId];
  return {
    context,
    items: [
      ...context.actions.map((id) => AREA_ACTIONS[id]),
      priorityAction,
      ACTIONS.monitor,
    ].filter((action, index, list) => list.findIndex((item) => item.id === action.id) === index),
  };
}

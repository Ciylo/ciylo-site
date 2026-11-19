/**
 * Interactive architecture diagrams (rendered by components/diagram/FlowDiagram).
 *
 * Positions are grid cells: `d` = [column, row] on desktop, `m` = [column, row]
 * on phones (2 columns; 0.5 centres a node). Edges are drawn between node
 * centres and packets flow from the first id to the second.
 * Copy describes capabilities only: no metrics, certifications or partners.
 */
export type Layer = "Hardware" | "Firmware" | "Connectivity" | "Cloud" | "AI" | "App" | "People";

export type IconName =
  | "sensor"
  | "plug"
  | "chip"
  | "radio"
  | "cloud"
  | "database"
  | "update"
  | "dashboard"
  | "bell"
  | "api"
  | "battery"
  | "heart"
  | "phone"
  | "brain"
  | "shield"
  | "hospital"
  | "card"
  | "touch"
  | "menu"
  | "users"
  | "chart"
  | "wrench"
  | "sun"
  | "gauge"
  | "flame"
  | "truck"
  | "factory"
  | "camera"
  | "leaf"
  | "droplet"
  | "kitchen"
  | "cart"
  | "boxes"
  | "pcb"
  | "code"
  | "pen"
  | "rocket";

export type DiagramNode = {
  id: string;
  label: string;
  sub: string;
  icon: IconName;
  layer: Layer;
  detail: string[];
  d: [number, number];
  m: [number, number];
  /** Optional deep link shown in the detail panel */
  href?: string;
  hrefLabel?: string;
};

export type Diagram = {
  id: string;
  title: string;
  caption: string;
  cols: number;
  rows: number;
  mrows: number;
  nodes: DiagramNode[];
  edges: [string, string][];
};

export const layerColor: Record<Layer, string> = {
  Hardware: "#a5f31e",
  Firmware: "#57d9bf",
  Connectivity: "#a9a9b3",
  Cloud: "#00c9a7",
  AI: "#00abbc",
  App: "#96e5d5",
  People: "#e2e2e8",
};

const remoteSite: Diagram = {
  id: "remote-site-monitoring",
  title: "How remote site monitoring fits together",
  caption: "From the sensor on site to the alert on your phone, all built and supported by one team.",
  cols: 5,
  rows: 3,
  mrows: 6,
  nodes: [
    { id: "sensors", label: "Site sensors", sub: "Power · fuel · temp · door", icon: "sensor", layer: "Hardware", d: [0, 0], m: [0, 0], detail: ["Current, voltage and fuel-level sensing", "Temperature, humidity and door contacts", "Chosen for the site's environment and power budget"] },
    { id: "plc", label: "Existing equipment", sub: "Modbus · PLC · meters", icon: "plug", layer: "Hardware", d: [0, 2], m: [1, 0], detail: ["Read generators, rectifiers and meters you already own", "Modbus RTU/TCP and analogue/digital I/O", "No rip-and-replace of working equipment"] },
    { id: "gateway", label: "Telemetry gateway", sub: "Edge firmware", icon: "chip", layer: "Firmware", d: [1, 1], m: [0.5, 1], detail: ["Rugged gateway running our edge firmware", "Buffers data locally when the link drops", "Local rules raise alarms even when offline"] },
    { id: "backhaul", label: "Backhaul", sub: "Cellular · LoRa · Wi-Fi", icon: "radio", layer: "Connectivity", d: [2, 1], m: [0.5, 2], detail: ["Picks the link that suits each site", "Encrypted transport end to end", "Store-and-forward for patchy coverage"] },
    { id: "ota", label: "OTA service", sub: "Signed firmware updates", icon: "update", layer: "Cloud", d: [3, 0], m: [1, 3], detail: ["Staged, signed firmware rollouts", "Roll back a bad build remotely", "Every unit's version visible at a glance"] },
    { id: "broker", label: "MQTT ingestion", sub: "Fleet-scale broker", icon: "cloud", layer: "Cloud", d: [3, 1], m: [0, 3], detail: ["Device identity and provisioning", "Scales from a pilot to the full fleet", "Hosted in your cloud account or ours"] },
    { id: "tsdb", label: "Time-series store", sub: "History & reports", icon: "database", layer: "Cloud", d: [3, 2], m: [0, 4], detail: ["Every reading kept for trend analysis", "Scheduled reports for maintenance planning", "Export to CSV or BI tools"] },
    { id: "dash", label: "Live dashboard", sub: "Map of every site", icon: "dashboard", layer: "App", d: [4, 0], m: [0, 5], detail: ["Live map with site health at a glance", "Drill into any site's history", "Web and mobile for field teams"] },
    { id: "alerts", label: "Alerts", sub: "SMS · email · push", icon: "bell", layer: "App", d: [4, 1], m: [1, 4], detail: ["Threshold and anomaly alerts", "Escalation rules per team and shift", "Acknowledge and track to resolution"] },
    { id: "api", label: "Your systems", sub: "APIs · ERP · ticketing", icon: "api", layer: "App", d: [4, 2], m: [1, 5], detail: ["REST and webhook APIs", "Push incidents into ticketing or ERP", "Single sign-on for your team"] },
  ],
  edges: [
    ["sensors", "gateway"],
    ["plc", "gateway"],
    ["gateway", "backhaul"],
    ["backhaul", "broker"],
    ["ota", "backhaul"],
    ["broker", "tsdb"],
    ["broker", "alerts"],
    ["broker", "dash"],
    ["tsdb", "api"],
  ],
};

const wearable: Diagram = {
  id: "wearable-health-monitoring",
  title: "How the wearable platform fits together",
  caption: "Signals travel from the wrist to the care team through one secure, engineered pipeline.",
  cols: 6,
  rows: 3,
  mrows: 6,
  nodes: [
    { id: "power", label: "Power & enclosure", sub: "Comfort · battery life", icon: "battery", layer: "Hardware", d: [0, 0], m: [1, 0], detail: ["Low-power architecture for long wear", "Enclosure designed for all-day comfort", "Charging and battery health monitoring"] },
    { id: "sensors", label: "Biosensors", sub: "ECG · PPG · IMU", icon: "heart", layer: "Hardware", d: [0, 2], m: [0, 0], detail: ["ECG, PPG and motion sensing", "Analogue front-end tuned for clean signals", "Sensor choice driven by the clinical goal"] },
    { id: "mcu", label: "On-device intelligence", sub: "DSP · fall detection", icon: "chip", layer: "Firmware", d: [1, 1], m: [0.5, 1], detail: ["Signal processing and feature extraction", "Fall and activity detection on the device", "Only meaningful data leaves the wrist"] },
    { id: "ble", label: "Secure BLE", sub: "Encrypted pairing", icon: "radio", layer: "Connectivity", d: [2, 1], m: [0.5, 2], detail: ["Bonded, encrypted Bluetooth LE", "Buffers readings while out of range", "Secure over-the-air firmware updates"] },
    { id: "phone", label: "Companion app", sub: "iOS & Android", icon: "phone", layer: "App", d: [3, 1], m: [0, 3], detail: ["Patient onboarding and pairing", "Daily insights patients understand", "Relays data to the cloud securely"] },
    { id: "cloud", label: "Health data cloud", sub: "Encrypted · role-based", icon: "cloud", layer: "Cloud", d: [4, 1], m: [1, 3], detail: ["Encryption in transit and at rest", "Role-based access for every user type", "Designed with health-data compliance in mind"] },
    { id: "ai", label: "Analytics & AI", sub: "Trends · risk signals", icon: "brain", layer: "AI", d: [4, 0], m: [0, 4], detail: ["Trend detection across days and weeks", "Models trained with your clinical team", "Explainable outputs for clinicians"] },
    { id: "audit", label: "Audit & consent", sub: "Access logs · privacy", icon: "shield", layer: "Cloud", d: [4, 2], m: [1, 4], detail: ["Consent captured and enforced", "Every access logged for audit", "Data retention rules you control"] },
    { id: "care", label: "Care-team dashboard", sub: "Alerts & reports", icon: "dashboard", layer: "App", d: [5, 0], m: [0, 5], detail: ["Patient list prioritised by risk", "Real-time alerts for falls and thresholds", "Clinician-friendly reports"] },
    { id: "ehr", label: "Clinical systems", sub: "EHR integration", icon: "hospital", layer: "App", d: [5, 2], m: [1, 5], detail: ["Integrates with existing clinical systems", "Standards-based data exchange", "No double entry for staff"] },
  ],
  edges: [
    ["power", "mcu"],
    ["sensors", "mcu"],
    ["mcu", "ble"],
    ["ble", "phone"],
    ["phone", "cloud"],
    ["cloud", "ai"],
    ["cloud", "audit"],
    ["ai", "care"],
    ["audit", "ehr"],
  ],
};

const kiosk: Diagram = {
  id: "kiosk-platform",
  title: "How the kiosk platform fits together",
  caption: "Hardware, touchscreen software, payments and fleet management, designed as one system.",
  cols: 5,
  rows: 3,
  mrows: 6,
  nodes: [
    { id: "peripherals", label: "Peripherals", sub: "Card · printer · scanner", icon: "card", layer: "Hardware", d: [0, 0], m: [0, 0], detail: ["Card terminal, receipt printer and scanner", "Optional cash, ID and NFC devices", "Selected for uptime and serviceability"] },
    { id: "unit", label: "Kiosk unit", sub: "Screen · PC · enclosure", icon: "touch", layer: "Hardware", d: [0, 2], m: [1, 0], detail: ["Touchscreen, compute and enclosure", "Floor, wall and counter form factors", "Designed for easy field maintenance"] },
    { id: "device", label: "Device layer", sub: "Drivers · lockdown", icon: "chip", layer: "Firmware", d: [1, 1], m: [0.5, 1], detail: ["Peripheral drivers and health checks", "Kiosk lockdown and auto-recovery", "Secure remote updates"] },
    { id: "customer", label: "Customers", sub: "Order · pay · check in", icon: "users", layer: "People", d: [2, 0], m: [1, 2], detail: ["Fast flows that cut queue time", "Accessible by design", "Multi-language out of the box"] },
    { id: "ui", label: "Touchscreen app", sub: "Brandable per location", icon: "menu", layer: "App", d: [2, 1], m: [0, 2], detail: ["Ordering, check-in or ticketing flows", "Upsells and combos that convert", "Works offline and syncs later"] },
    { id: "pos", label: "POS & payments", sub: "Your POS · gateway", icon: "card", layer: "Cloud", d: [3, 0], m: [0, 3], detail: ["Integrates with your existing POS", "Payment gateway of your choice", "Orders land where staff already work"] },
    { id: "content", label: "Content & menus", sub: "Per-location control", icon: "boxes", layer: "Cloud", d: [3, 1], m: [1, 3], detail: ["Update menus and prices centrally", "Schedule promotions by location", "Stock-aware item availability"] },
    { id: "fleet", label: "Fleet manager", sub: "Monitoring · OTA", icon: "update", layer: "Cloud", d: [3, 2], m: [0, 4], detail: ["Live health of every kiosk", "Remote restart and software updates", "Paper and peripheral alerts"] },
    { id: "analytics", label: "Sales analytics", sub: "Usage · conversion", icon: "chart", layer: "App", d: [4, 0], m: [1, 4], detail: ["Sales by kiosk, location and hour", "Funnel and drop-off analysis", "Export to your BI tools"] },
    { id: "ops", label: "Ops team", sub: "Alerts · remote fixes", icon: "wrench", layer: "People", d: [4, 2], m: [0.5, 5], detail: ["Alerts before customers notice", "Most fixes done remotely", "Fewer site visits for engineers"] },
  ],
  edges: [
    ["peripherals", "device"],
    ["unit", "device"],
    ["device", "ui"],
    ["customer", "ui"],
    ["ui", "pos"],
    ["content", "ui"],
    ["device", "fleet"],
    ["pos", "analytics"],
    ["fleet", "ops"],
  ],
};

/** Compact 4x3 industry diagram helper */
function industry(
  id: string,
  title: string,
  caption: string,
  n: Omit<DiagramNode, "m">[],
  m: Record<string, [number, number]>,
  edges: [string, string][],
): Diagram {
  return { id, title, caption, cols: 4, rows: 3, mrows: 5, nodes: n.map((x) => ({ ...x, m: m[x.id] })), edges };
}

const energy = industry(
  "energy",
  "A typical energy monitoring stack",
  "Assets, meters and gateways feeding one data platform your operations team can act on.",
  [
    { id: "assets", label: "Solar & storage", sub: "Inverters · BMS", icon: "sun", layer: "Hardware", d: [0, 0], detail: ["Read inverters and battery management systems", "Per-string and per-cell visibility", "Works with mixed vendors"] },
    { id: "meters", label: "Smart meters", sub: "Consumption · quality", icon: "gauge", layer: "Hardware", d: [0, 2], detail: ["Energy and power-quality metering", "Interval data for billing and planning", "Retrofit onto existing panels"] },
    { id: "gw", label: "Edge gateway", sub: "Modbus · buffering", icon: "chip", layer: "Firmware", d: [1, 1], detail: ["Protocol translation at the edge", "Local buffering through outages", "Secure remote updates"] },
    { id: "cloud", label: "Energy data platform", sub: "Ingest · store · model", icon: "cloud", layer: "Cloud", d: [2, 1], detail: ["Fleet-scale ingestion", "Time-series history per asset", "APIs for your existing tools"] },
    { id: "ai", label: "Forecasting & anomalies", sub: "Yield · faults", icon: "brain", layer: "AI", d: [2, 0], detail: ["Generation and load forecasting", "Early fault and degradation detection", "Models tuned on your own data"] },
    { id: "dash", label: "Operations dashboard", sub: "Every site live", icon: "dashboard", layer: "App", d: [3, 0], detail: ["Portfolio view across every site", "Drill down to a single device", "Web and mobile access"] },
    { id: "maint", label: "Maintenance alerts", sub: "Predictive work orders", icon: "wrench", layer: "App", d: [3, 2], detail: ["Alerts routed to the right crew", "Work orders raised automatically", "Fewer unplanned truck rolls"] },
  ],
  { assets: [0, 0], meters: [1, 0], gw: [0.5, 1], cloud: [0, 2], ai: [1, 2], dash: [0, 3], maint: [1, 3] },
  [["assets", "gw"], ["meters", "gw"], ["gw", "cloud"], ["cloud", "ai"], ["ai", "dash"], ["cloud", "maint"]],
);

const oilGas = industry(
  "oil-and-gas",
  "A typical oil & gas operations stack",
  "Field telemetry, safety signals and distribution data brought into one operational view.",
  [
    { id: "tanks", label: "Tank & line sensors", sub: "Level · pressure · flow", icon: "gauge", layer: "Hardware", d: [0, 0], detail: ["Level, pressure and flow sensing", "Rugged hardware for harsh sites", "Retrofit onto existing assets"] },
    { id: "safety", label: "Safety devices", sub: "Gas · leak detection", icon: "flame", layer: "Hardware", d: [0, 2], detail: ["Gas and leak detection inputs", "Local alarms that work offline", "Event logging for incident review"] },
    { id: "gw", label: "Rugged edge gateway", sub: "Cellular · satellite", icon: "radio", layer: "Firmware", d: [1, 1], detail: ["Store-and-forward for remote sites", "Edge rules for immediate response", "Remote configuration and updates"] },
    { id: "cloud", label: "Operations cloud", sub: "Telemetry · history", icon: "cloud", layer: "Cloud", d: [2, 1], detail: ["Central history for every site", "Role-based access for teams and partners", "Integrations with ERP and SCADA exports"] },
    { id: "fleet", label: "Distribution tracking", sub: "Deliveries · fleet", icon: "truck", layer: "App", d: [2, 2], detail: ["Track deliveries and vehicles", "Proof of delivery in the app", "Plan routes from live tank levels"] },
    { id: "control", label: "Control-room dashboard", sub: "Live site status", icon: "dashboard", layer: "App", d: [3, 0], detail: ["Live map of sites and alarms", "Shift handover views", "Mobile access for supervisors"] },
    { id: "alerts", label: "Safety alerts", sub: "Escalation rules", icon: "bell", layer: "App", d: [3, 2], detail: ["Instant alerts on safety events", "Escalation until acknowledged", "Full audit trail"] },
  ],
  { tanks: [0, 0], safety: [1, 0], gw: [0.5, 1], cloud: [0, 2], fleet: [1, 2], control: [0, 3], alerts: [1, 3] },
  [["tanks", "gw"], ["safety", "gw"], ["gw", "cloud"], ["cloud", "control"], ["cloud", "fleet"], ["cloud", "alerts"]],
);

const manufacturing = industry(
  "manufacturing",
  "A typical connected factory stack",
  "Machines, vision and edge AI feeding the systems your plant already runs on.",
  [
    { id: "plc", label: "Machines & PLCs", sub: "OPC UA · Modbus", icon: "factory", layer: "Hardware", d: [0, 0], detail: ["Connect legacy and modern machines", "OPC UA, Modbus and custom protocols", "No changes to safety-critical logic"] },
    { id: "vision", label: "Vision & sensors", sub: "Cameras · vibration", icon: "camera", layer: "Hardware", d: [0, 2], detail: ["Inspection cameras on the line", "Vibration and temperature sensing", "Custom fixtures and enclosures"] },
    { id: "edge", label: "Edge AI box", sub: "Inference on the line", icon: "brain", layer: "AI", d: [1, 1], detail: ["Defect detection in real time", "Runs without depending on the cloud", "Models retrained as products change"] },
    { id: "cloud", label: "Industrial data platform", sub: "Unified history", icon: "cloud", layer: "Cloud", d: [2, 1], detail: ["One history across lines and plants", "Secure remote access", "Open APIs"] },
    { id: "oee", label: "OEE dashboard", sub: "Availability · quality", icon: "dashboard", layer: "App", d: [3, 0], detail: ["Live OEE by line and shift", "Downtime reasons captured", "Screens on the shop floor"] },
    { id: "pm", label: "Predictive maintenance", sub: "Fix before failure", icon: "wrench", layer: "AI", d: [2, 2], detail: ["Anomaly detection on machine data", "Maintenance planned, not reactive", "Spare-parts forecasting"] },
    { id: "erp", label: "ERP / MES", sub: "Orders · inventory", icon: "api", layer: "App", d: [3, 2], detail: ["Production data flows into ERP/MES", "Work orders created automatically", "Custom ERP modules where needed"], href: "/services#erp-crm", hrefLabel: "ERP & CRM service" },
  ],
  { plc: [0, 0], vision: [1, 0], edge: [0.5, 1], cloud: [0, 2], pm: [1, 2], oee: [0, 3], erp: [1, 3] },
  [["plc", "edge"], ["vision", "edge"], ["edge", "cloud"], ["cloud", "oee"], ["cloud", "pm"], ["pm", "erp"]],
);

const agriculture = industry(
  "agriculture",
  "A typical smart-farm stack",
  "Long-range sensing and automated control that save water, labour and guesswork.",
  [
    { id: "field", label: "Field sensors", sub: "Soil · weather · water", icon: "leaf", layer: "Hardware", d: [0, 0], detail: ["Soil moisture, weather and water levels", "Solar-powered, low-maintenance nodes", "Built for dust, heat and rain"] },
    { id: "equip", label: "Pumps & valves", sub: "Actuated control", icon: "droplet", layer: "Hardware", d: [0, 2], detail: ["Remote control of pumps and valves", "Manual override always available", "Retrofit onto existing irrigation"] },
    { id: "gw", label: "LoRa gateway", sub: "Long range · low power", icon: "radio", layer: "Connectivity", d: [1, 1], detail: ["Kilometres of coverage per gateway", "Battery-friendly radio links", "Cellular backhaul to the cloud"] },
    { id: "cloud", label: "Farm data cloud", sub: "History · rules", icon: "cloud", layer: "Cloud", d: [2, 1], detail: ["Per-field history and maps", "Automation rules and schedules", "Data you own and can export"] },
    { id: "ai", label: "Irrigation AI", sub: "When and how much", icon: "brain", layer: "AI", d: [2, 0], detail: ["Irrigation advice from soil and weather", "Yield and risk insights", "Tuned to each crop and field"] },
    { id: "app", label: "Farmer app", sub: "Alerts · control", icon: "phone", layer: "App", d: [3, 0], detail: ["Simple mobile app in local language", "Alerts for dry soil or pump faults", "Control irrigation from anywhere"] },
    { id: "auto", label: "Automated control", sub: "Closed loop", icon: "update", layer: "Cloud", d: [3, 2], detail: ["Rules switch pumps automatically", "Every action logged", "Safe fallbacks if links drop"] },
  ],
  { field: [0, 0], equip: [1, 0], gw: [0.5, 1], cloud: [0, 2], ai: [1, 2], app: [0, 3], auto: [1, 3] },
  [["field", "gw"], ["gw", "cloud"], ["cloud", "ai"], ["ai", "app"], ["cloud", "auto"], ["auto", "equip"]],
);

const restaurants = industry(
  "restaurants",
  "A typical restaurant tech stack",
  "Kiosks, POS, kitchen screens and online ordering, all talking to each other.",
  [
    { id: "kiosk", label: "Self-order kiosks", sub: "Order · pay · upsell", icon: "touch", layer: "Hardware", d: [0, 0], detail: ["Self-service ordering and payment", "Upsells that lift average order", "Brandable per location"], href: "/solutions/kiosk-platform", hrefLabel: "Kiosk Platform solution" },
    { id: "online", label: "Online & delivery", sub: "Web · app · aggregators", icon: "phone", layer: "App", d: [0, 2], detail: ["Branded web and mobile ordering", "Aggregator orders in one queue", "Loyalty and offers"], href: "/services#ecommerce", hrefLabel: "E-commerce service" },
    { id: "platform", label: "Ordering platform", sub: "Menus · orders · payments", icon: "cloud", layer: "Cloud", d: [1, 1], detail: ["One menu across every channel", "Orders routed to the right kitchen", "Payments reconciled automatically"] },
    { id: "pos", label: "POS terminals", sub: "Counter & table", icon: "card", layer: "Hardware", d: [2, 0], detail: ["Integrates with your POS", "Table and counter service", "Works through internet drops"] },
    { id: "kds", label: "Kitchen display", sub: "Prep queues", icon: "kitchen", layer: "App", d: [2, 2], detail: ["Orders on screen, not paper", "Prep timers and bump bars", "Station-by-station routing"] },
    { id: "inv", label: "Inventory & ERP", sub: "Stock · suppliers", icon: "boxes", layer: "App", d: [3, 2], detail: ["Stock deducted as orders are made", "Low-stock alerts and purchase orders", "Multi-branch inventory"], href: "/services#erp-crm", hrefLabel: "ERP & CRM service" },
    { id: "owner", label: "Owner analytics", sub: "Sales · margins", icon: "chart", layer: "App", d: [3, 0], detail: ["Sales by item, channel and branch", "Peak-hour and staffing insights", "Daily summary on your phone"] },
  ],
  { kiosk: [0, 0], online: [1, 0], platform: [0.5, 1], pos: [0, 2], kds: [1, 2], owner: [0, 3], inv: [1, 3] },
  [["kiosk", "platform"], ["online", "platform"], ["platform", "pos"], ["platform", "kds"], ["pos", "owner"], ["kds", "inv"]],
);

/** Homepage: the CiyloCore stack, every layer linked to its service */
const core: Diagram = {
  id: "ciylocore",
  title: "One team across the whole stack",
  caption: "Tap any layer to see what we build there and jump to the service.",
  cols: 5,
  rows: 3,
  mrows: 6,
  nodes: [
    { id: "design", label: "Product & UX", sub: "Research · UI · prototypes", icon: "pen", layer: "People", d: [0, 0], m: [0, 0], detail: ["Discovery workshops and research", "UI/UX design and clickable prototypes", "Product strategy and roadmaps"], href: "/services#product-development", hrefLabel: "Product development" },
    { id: "pcb", label: "Electronics & PCB", sub: "Schematics · layout", icon: "pcb", layer: "Hardware", d: [0, 2], m: [1, 0], detail: ["Schematic capture and PCB layout", "Prototypes and bring-up in our lab", "Design for manufacture"], href: "/services#hardware", hrefLabel: "Hardware design" },
    { id: "fw", label: "Embedded firmware", sub: "RTOS · drivers · OTA", icon: "chip", layer: "Firmware", d: [1, 2], m: [0.5, 1], detail: ["Bare-metal and RTOS firmware", "Drivers, power management and OTA", "Production test tooling"], href: "/services#embedded", hrefLabel: "Embedded systems" },
    { id: "edge", label: "Edge AI & IoT", sub: "On-device intelligence", icon: "brain", layer: "AI", d: [2, 2], m: [0, 2], detail: ["Models optimised for microcontrollers and edge boxes", "Gateways and connectivity", "Fleet provisioning"], href: "/services#edge-ai", hrefLabel: "Edge AI" },
    { id: "cloud", label: "Cloud & data", sub: "APIs · pipelines · DevOps", icon: "cloud", layer: "Cloud", d: [3, 1], m: [1, 2], detail: ["Scalable APIs and event pipelines", "Data platforms and analytics", "CI/CD, monitoring and security"], href: "/services#cloud", hrefLabel: "Cloud & DevOps" },
    { id: "ai", label: "AI engineering", sub: "LLMs · agents · ML", icon: "brain", layer: "AI", d: [2, 0], m: [0, 3], detail: ["LLM features, agents and RAG", "Computer vision and ML models", "Evaluation and guardrails"], href: "/services#ai", hrefLabel: "AI engineering" },
    { id: "apps", label: "Web, mobile & SaaS", sub: "Products people use", icon: "code", layer: "App", d: [1, 0], m: [1, 3], detail: ["Web apps, SaaS and dashboards", "iOS and Android apps", "E-commerce, ERP and CRM"], href: "/services#software", hrefLabel: "Software development" },
    { id: "security", label: "Security", sub: "Device to cloud", icon: "shield", layer: "Cloud", d: [3, 2], m: [0, 4], detail: ["Secure boot and signed updates", "Penetration testing and hardening", "Security reviews before launch"], href: "/services#cybersecurity", hrefLabel: "Cyber security" },
    { id: "users", label: "Your users", sub: "Customers · teams", icon: "users", layer: "People", d: [4, 0], m: [1, 4], detail: ["One accountable team behind every layer", "Fewer hand-offs between vendors", "Faster fixes when something breaks"] },
    { id: "launch", label: "Launch & scale", sub: "Manufacturing · support", icon: "rocket", layer: "People", d: [4, 2], m: [0.5, 5], detail: ["Manufacturing support and certification readiness", "Ongoing releases and support", "We stay on after launch"], href: "/services#manufacturing", hrefLabel: "Manufacturing support" },
  ],
  edges: [
    ["design", "apps"],
    ["design", "pcb"],
    ["pcb", "fw"],
    ["fw", "edge"],
    ["edge", "cloud"],
    ["ai", "cloud"],
    ["apps", "ai"],
    ["cloud", "users"],
    ["edge", "security"],
    ["cloud", "security"],
    ["security", "launch"],
  ],
};

export const diagrams: Record<string, Diagram> = Object.fromEntries(
  [remoteSite, wearable, kiosk, energy, oilGas, manufacturing, agriculture, restaurants, core].map((d) => [d.id, d]),
);

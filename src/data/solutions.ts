/**
 * Solutions: packaged, ready-to-deploy offerings (hardware + firmware + app + cloud).
 * Deployment phases intentionally carry no durations until the owner confirms
 * typical timelines (see PROVIDE.md).
 */
export type Solution = {
  slug: string;
  name: string;
  short: string;
  hero: string;
  problem: string;
  pains: string[];
  included: { layer: "Hardware" | "Firmware" | "App" | "Cloud"; title: string; items: string[] }[];
  phases: { title: string; desc: string }[];
  industries: string[];
  services: string[];
  image: string;
};

export const solutions: Solution[] = [
  {
    slug: "remote-site-monitoring",
    name: "Remote Site Monitoring",
    short: "Telemetry hardware and a live dashboard for towers, plants, farms and remote assets.",
    hero: "Know what's happening at every site, without driving there.",
    problem:
      "Remote sites fail quietly. A generator runs dry, a cabinet overheats or a pump stops, and nobody knows until a customer complains or a crew is sent out to check.",
    pains: ["Truck rolls just to check status", "Outages discovered too late", "Data stuck in local panels", "No history to plan maintenance"],
    included: [
      { layer: "Hardware", title: "Telemetry unit", items: ["Rugged gateway with sensor inputs", "Power, temperature, door and fuel sensing", "Cellular, LoRa or Wi-Fi backhaul"] },
      { layer: "Firmware", title: "Edge firmware", items: ["Local buffering when offline", "Modbus and analogue/digital I/O", "Secure over-the-air updates"] },
      { layer: "App", title: "Dashboard & alerts", items: ["Live map of every site", "Threshold and anomaly alerts", "Mobile access for field teams"] },
      { layer: "Cloud", title: "Data platform", items: ["MQTT ingestion at fleet scale", "Time-series history and reports", "APIs into your existing tools"] },
    ],
    phases: [
      { title: "Site survey", desc: "Agree what to measure, where, and how data gets out." },
      { title: "Pilot", desc: "Install on a handful of sites and tune alerts with your team." },
      { title: "Rollout", desc: "Production units, provisioning and installer training." },
      { title: "Operate", desc: "Monitoring, firmware updates and new metrics as you grow." },
    ],
    industries: ["telecom", "energy", "oil-and-gas", "agriculture"],
    services: ["iot", "embedded", "cloud", "data"],
    image: "/images/lab/bench-2.webp",
  },
  {
    slug: "wearable-health-monitoring",
    name: "Wearable Health Monitoring",
    short: "A medical-grade wearable, companion app and care-team dashboard, engineered together.",
    hero: "Continuous health insight, from the wrist to the care team.",
    problem:
      "Spot checks miss what happens between appointments. Care teams need continuous, trustworthy signals, and patients need a device they'll actually wear.",
    pains: ["Gaps between clinical visits", "Falls and events detected too late", "Data scattered across devices", "Compliance and privacy concerns"],
    included: [
      { layer: "Hardware", title: "Wearable device", items: ["ECG, PPG and IMU sensing", "Low-power design for long battery life", "Enclosure designed for comfort"] },
      { layer: "Firmware", title: "On-device intelligence", items: ["Signal processing and features", "Fall and activity detection", "Secure BLE and OTA updates"] },
      { layer: "App", title: "Patient & care apps", items: ["Companion mobile app", "Care-team dashboard and alerts", "Clinician-friendly reports"] },
      { layer: "Cloud", title: "Secure health data", items: ["Encrypted device-to-cloud pipeline", "Role-based access", "Integration with clinical systems"] },
    ],
    phases: [
      { title: "Clinical definition", desc: "Signals, users and outcomes agreed with your clinical team." },
      { title: "Prototype", desc: "Working wearable, app and dashboard for early validation." },
      { title: "Pilot & readiness", desc: "Field pilot plus certification-readiness support." },
      { title: "Scale", desc: "Manufacturing support, fleet management and new features." },
    ],
    industries: ["healthcare"],
    services: ["wearables", "embedded", "edge-ai", "software", "cloud", "certification"],
    image: "/images/lab/embedded-desk.webp",
  },
  {
    slug: "kiosk-platform",
    name: "Kiosk Platform",
    short: "Self-service kiosk hardware, touchscreen software, payments and remote fleet management.",
    hero: "Self-service your customers enjoy and your team can manage.",
    problem:
      "Queues cost sales and staff time, but off-the-shelf kiosks are rigid, hard to integrate and painful to maintain across locations.",
    pains: ["Long queues at peak times", "Kiosks that don't talk to your POS", "Costly on-site maintenance", "Inconsistent content across sites"],
    included: [
      { layer: "Hardware", title: "Kiosk unit", items: ["Touchscreen, computer and enclosure", "Card terminal, printer and scanner", "Optional cash and ID devices"] },
      { layer: "Firmware", title: "Device layer", items: ["Peripheral drivers and health checks", "Kiosk lockdown and recovery", "Secure remote updates"] },
      { layer: "App", title: "Touchscreen experience", items: ["Fast, accessible ordering and check-in flows", "Brandable UI per location", "Multi-language support"] },
      { layer: "Cloud", title: "Fleet management", items: ["Remote monitoring and alerts", "Content and menu control", "Sales and usage analytics"] },
    ],
    phases: [
      { title: "Discovery", desc: "Journeys, peripherals and integrations defined." },
      { title: "Prototype unit", desc: "A working kiosk tested with real users." },
      { title: "Pilot location", desc: "Deploy, measure and refine on site." },
      { title: "Rollout", desc: "Manufacture, install and manage the fleet." },
    ],
    industries: ["retail", "restaurants", "healthcare"],
    services: ["kiosks", "mechanical", "software", "ecommerce", "cloud"],
    image: "/images/office/glass-room.webp",
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);

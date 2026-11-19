/**
 * Industries Ciylo serves. Each gets /industries/<slug>.
 * `services` are ids from src/data/services.ts, `work` are case-study slugs.
 * Only list case studies that genuinely belong to the industry.
 */
export type IndustryPage = {
  slug: string;
  name: string;
  /** Short line for lists */
  detail: string;
  hero: string;
  intro: string;
  /** What we typically build in this sector */
  focus: string[];
  services: string[];
  work: string[];
  image: string;
};

export const industryPages: IndustryPage[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    detail: "Telehealth, hospice, hospital systems, medical wearables",
    hero: "Technology that gives clinicians time back and patients better care.",
    intro:
      "From AI symptom assessment to voice-driven hospice documentation and medical wearables, we build secure, compliance-minded systems for providers, payers and health startups.",
    focus: ["Telehealth & remote consultations", "Clinical documentation with AI", "Hospital & practice management", "Medical wearables & remote monitoring", "Secure health-data pipelines"],
    services: ["wearables", "embedded", "ai", "software", "erp-crm", "cloud", "cybersecurity", "certification"],
    work: ["ai-medik", "i-hospice", "i-health"],
    image: "/images/work/ai-medik/cover.webp",
  },
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    detail: "Online pharmacy, prescriptions, refills, delivery",
    hero: "From script to doorstep, without the paperwork.",
    intro:
      "We build pharmacy platforms that digitise prescriptions with AI, handle refills and transfers, and track every order in real time, for patients and pharmacists alike.",
    focus: ["Online pharmacy & e-prescriptions", "AI prescription digitisation", "Refill, transfer & order tracking", "Inventory and fulfilment systems"],
    services: ["software", "ecommerce", "ai", "erp-crm", "data", "cybersecurity"],
    work: ["fireside-pharmacy"],
    image: "/images/work/fireside-pharmacy/cover.webp",
  },
  {
    slug: "energy",
    name: "Energy",
    detail: "Smart-grid analytics, solar, site telemetry",
    hero: "Visibility for every panel, meter and substation.",
    intro:
      "Connected sensors, gateways and dashboards that turn energy assets into live data, from solar sites to distribution networks.",
    focus: ["Site telemetry & remote monitoring", "Solar and battery monitoring", "Smart metering", "Predictive maintenance analytics"],
    services: ["iot", "embedded", "edge-ai", "data", "cloud", "cybersecurity"],
    work: [],
    image: "/images/lab/bench-wide.webp",
  },
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    detail: "Operations, safety and distribution",
    hero: "Safer operations and fewer surprises in the field.",
    intro:
      "Rugged sensing, industrial protocols and analytics that help operators monitor assets, improve safety and optimise distribution.",
    focus: ["Remote asset monitoring", "Safety and environmental sensing", "Distribution and logistics tracking", "Modbus and SCADA integration"],
    services: ["iot", "embedded", "data", "robotics", "cybersecurity", "certification"],
    work: [],
    image: "/images/lab/pcb-probe.webp",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Industry 4.0",
    detail: "PLC/SCADA integration, HMIs, robotics, test jigs",
    hero: "Bring your factory floor online without replacing what works.",
    intro:
      "We retrofit sensing and connectivity onto existing lines, integrate PLCs and SCADA, build operator HMIs and production test jigs, and add robotics where it pays off.",
    focus: ["Industry 4.0 retrofits", "PLC/SCADA and OPC-UA integration", "Operator HMIs", "Production test jigs", "Robotics and motion control"],
    services: ["iot", "robotics", "manufacturing", "mechanical", "data", "erp-crm"],
    work: [],
    image: "/images/lab/soldering.webp",
  },
  {
    slug: "agriculture",
    name: "Agriculture & AgTech",
    detail: "Dairy, livestock and field monitoring",
    hero: "Sensors in the field, insight in your pocket.",
    intro:
      "Low-power devices and long-range connectivity for farms, including dairy and livestock monitoring, with dashboards and alerts that farmers actually use.",
    focus: ["Dairy and livestock monitoring", "Soil, weather and water sensing", "LoRa and long-range networks", "Mobile dashboards and alerts"],
    services: ["iot", "embedded", "edge-ai", "mechanical", "data", "software"],
    work: [],
    image: "/images/lab/embedded-desk.webp",
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    detail: "Storefronts, marketplaces, kiosks, payments",
    hero: "Commerce that works on every screen and in every store.",
    intro:
      "Online stores, marketplaces and in-store self-service, connected to your inventory, payments and back office.",
    focus: ["Storefronts and marketplaces", "Self-service kiosks", "Payments and checkout", "Inventory and ERP integration"],
    services: ["ecommerce", "kiosks", "erp-crm", "data", "ai", "software"],
    work: ["splitmart", "fireside-pharmacy"],
    image: "/images/work/splitmart/cover.webp",
  },
  {
    slug: "restaurants",
    name: "Restaurants & Food Service",
    detail: "Ordering kiosks, online ordering, kitchen systems",
    hero: "Faster orders, shorter queues, happier kitchens.",
    intro:
      "Self-ordering kiosks, online ordering and the systems behind them, integrated with payments, printers and your POS.",
    focus: ["Self-ordering kiosks", "Online ordering and delivery", "Kitchen display and printers", "Loyalty and analytics"],
    services: ["kiosks", "ecommerce", "software", "erp-crm", "data"],
    work: [],
    image: "/images/office/meeting.webp",
  },
  {
    slug: "telecom",
    name: "Telecom",
    detail: "Remote site monitoring, AI voice",
    hero: "Every tower and cabinet, monitored from one screen.",
    intro:
      "Remote site monitoring for telecom infrastructure, from power and environment sensing to secure telemetry and alerting, plus AI voice products built on telephony.",
    focus: ["Remote site monitoring", "Power and environment sensing", "Secure telemetry and alerting", "AI voice and telephony integration"],
    services: ["iot", "embedded", "cloud", "data", "cybersecurity", "ai"],
    work: ["callcom"],
    image: "/images/work/callcom/cover.webp",
  },
  {
    slug: "education",
    name: "Education",
    detail: "Tutoring, virtual classrooms, scheduling",
    hero: "Learning that fits around real lives.",
    intro:
      "Tutoring platforms, virtual classrooms and scheduling tools that make academic support flexible, secure and accessible from anywhere.",
    focus: ["Tutoring marketplaces", "Virtual classrooms", "Scheduling and messaging", "Learning analytics"],
    services: ["software", "ai", "consulting", "product-development"],
    work: ["verited"],
    image: "/images/work/verited/cover.webp",
  },
  {
    slug: "proptech-fintech",
    name: "PropTech & FinTech",
    detail: "Rent-now-pay-later, payments, portfolios",
    hero: "Money and property, made simple.",
    intro:
      "Payment flows, instalment products and portfolio tools for property owners, tenants and investors, built with security and reporting at the core.",
    focus: ["Rent and instalment payments", "Portfolio monitoring and valuation", "Lease and tenant management", "Secure digital payments"],
    services: ["software", "ecommerce", "erp-crm", "data", "cybersecurity"],
    work: ["keyper"],
    image: "/images/work/keyper/cover.webp",
  },
  {
    slug: "field-service",
    name: "Field Service & Facilities",
    detail: "Work orders, crews, photo logs, analytics",
    hero: "Every job assigned, documented and done.",
    intro:
      "Work-order platforms that give managers control and crews simple tools, with photo evidence, QR codes and analytics built in.",
    focus: ["Work orders and scheduling", "Photo evidence and checklists", "Client and vendor communication", "Operational analytics"],
    services: ["erp-crm", "software", "data", "iot"],
    work: ["tarea"],
    image: "/images/work/tarea/cover.webp",
  },
];

export const getIndustry = (slug: string) => industryPages.find((i) => i.slug === slug);

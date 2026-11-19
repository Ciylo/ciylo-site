export type ServiceGroup = "Hardware" | "Software" | "Consulting" | "Advisory";

export type Service = {
  id: string;
  group: ServiceGroup;
  name: string;
  /** One-line pitch used on cards and the header hover preview */
  short: string;
  tags: string[];
  intro: string;
  items: { title: string; desc: string }[];
  /** Optional second block inside the accordion panel */
  extra?: { title: string; items: { title: string; desc: string }[] };
  /** Short team name for "Talk to the … team" */
  team: string;
  /** Slugs of related case studies (src/data/work.ts). Empty = none published yet. */
  work: string[];
  /** Shown in the home "All" view (the full list lives on /services) */
  featured?: boolean;
};

export const serviceGroups: { id: ServiceGroup; label: string; blurb: string }[] = [
  { id: "Hardware", label: "Hardware & Edge", blurb: "Boards, firmware, machines and on-device intelligence." },
  { id: "Software", label: "Software & AI", blurb: "Apps, platforms, security and the AI inside them." },
  { id: "Consulting", label: "Strategy & Engagement", blurb: "Shape the product, then choose how we work." },
  { id: "Advisory", label: "Advisory", blurb: "Clear answers for founders, operators and investors." },
];

export const services: Service[] = [
  {
    id: "embedded",
    featured: true,
    group: "Hardware",
    name: "Embedded Systems & Firmware",
    short:
      "Production firmware for STM32, ESP32 and Nordic nRF, from board bring-up to secure over-the-air updates.",
    tags: ["FreeRTOS", "Zephyr", "BLE", "OTA"],
    intro: "Production firmware from first power-on to over-the-air updates in the field.",
    items: [
      { title: "MCU Firmware", desc: "C/C++ firmware for STM32, ESP32, Nordic nRF and more." },
      { title: "RTOS Development", desc: "FreeRTOS and Zephyr applications with clean task design." },
      { title: "Board Bring-Up & Drivers", desc: "BSPs, peripheral drivers and embedded Linux." },
      { title: "Low-Power & OTA", desc: "Battery-life optimisation and secure firmware updates." },
    ],
    team: "firmware",
    work: [],
  },
  {
    id: "wearables",
    group: "Hardware",
    name: "Medical Wearables & Biosignals",
    short:
      "Devices that capture ECG, PPG, IMU and sEMG and turn them into clinical insight for apps and care teams.",
    tags: ["Biosignals", "Fall detection", "Secure data"],
    intro: "Wearable health devices engineered from the sensor to the clinical insight.",
    items: [
      { title: "Biosignal Acquisition", desc: "ECG, PPG, IMU and sEMG front-ends and sampling." },
      { title: "Signal Processing & Features", desc: "Filtering, feature extraction and clinically meaningful metrics." },
      { title: "Event Detection", desc: "Falls and activity recognition running on the wrist." },
      { title: "Secure Health Data", desc: "Encrypted device-to-app-to-cloud pipelines for care teams." },
    ],
    team: "wearables",
    work: [],
  },
  {
    id: "hardware",
    featured: true,
    group: "Hardware",
    name: "Hardware & PCB Design",
    short: "Schematic, PCB layout, FPGA logic and lab bring-up, checked for manufacture before a production run.",
    tags: ["PCB", "Prototyping", "FPGA", "DFM"],
    intro: "Electronics that move from schematic to a board you can hold, then to a production run.",
    items: [
      { title: "Schematic & PCB Layout", desc: "Multi-layer boards with signal integrity and EMC in mind." },
      { title: "Rapid Prototyping", desc: "Quick-turn prototypes, assembly and bench validation." },
      { title: "FPGA & Digital Logic", desc: "Verilog design on Xilinx (AMD) FPGAs." },
      { title: "DFM & Lab Bring-Up", desc: "Manufacturability reviews and first-article testing." },
    ],
    team: "hardware",
    work: [],
  },
  {
    id: "edge-ai",
    featured: true,
    group: "Hardware",
    name: "Edge AI & TinyML",
    short: "Models that run on microcontrollers and NPUs, so products respond instantly and work offline.",
    tags: ["TFLite Micro", "Jetson", "RK3588"],
    intro: "Inference on the device itself: faster, offline-capable and private by design.",
    items: [
      { title: "TinyML on Microcontrollers", desc: "TFLite Micro and Edge Impulse models on STM32, ESP32 and nRF." },
      { title: "NPU & GPU Deployment", desc: "Optimised models on Jetson, RK3588 and Raspberry Pi class boards." },
      { title: "Sensor Fusion", desc: "IMU, PPG and environmental signals combined into reliable events." },
      { title: "Offline LLMs", desc: "Local language models for devices without a connection." },
    ],
    team: "edge AI",
    work: [],
  },
  {
    id: "iot",
    featured: true,
    group: "Hardware",
    name: "IoT, Connectivity & Industrial Automation",
    short: "BLE, Wi-Fi, LoRa, Modbus and OPC-UA wired into live dashboards, plus PLC/SCADA integration and operator HMIs.",
    tags: ["MQTT", "LoRa", "Modbus RTU"],
    intro: "Devices, gateways and dashboards connected end to end.",
    items: [
      { title: "Wireless Connectivity", desc: "Bluetooth LE, Wi-Fi and LoRa integration." },
      { title: "Industrial Protocols", desc: "Modbus RTU sensors and gateways for plants and remote sites." },
      { title: "Telemetry & MQTT", desc: "Reliable device-to-cloud messaging at fleet scale." },
      { title: "Remote Monitoring Dashboards", desc: "Live status, alerts and history for every device." },
    ],
    extra: {
      title: "Industrial Automation & HMI",
      items: [
        { title: "PLC & SCADA Integration", desc: "Connect existing PLCs and SCADA systems to modern data and control layers." },
        { title: "Modbus & OPC-UA Gateways", desc: "Bridge field devices to the cloud without replacing working equipment." },
        { title: "Operator HMIs", desc: "Clear, glove-friendly touch panels for the people running the line." },
        { title: "Industry 4.0 Retrofits", desc: "Add sensing, connectivity and dashboards to legacy machines." },
      ],
    },
    team: "IoT",
    work: [],
  },
  {
    id: "mechanical",
    group: "Hardware",
    name: "Mechanical & Enclosure Design",
    short: "Enclosures and mechanisms engineered around your electronics, from CAD to 3D-printed prototypes to tooling-ready parts.",
    tags: ["CAD", "Mechatronics", "3D printing", "DFM"],
    intro: "The physical shell matters as much as the board inside it. We design enclosures and mechanisms that protect the electronics, feel right in the hand and are ready for production.",
    items: [
      { title: "Enclosure CAD", desc: "Parametric enclosure design built around the PCB, connectors and thermals." },
      { title: "Mechatronics", desc: "Moving parts, actuators and sensors designed together with the electronics." },
      { title: "3D-Printed Prototypes", desc: "Fast physical iterations to test fit, feel and assembly." },
      { title: "Design for Injection Moulding", desc: "Draft angles, wall thickness and parting lines ready for tooling." },
    ],
    team: "mechanical",
    work: [],
  },
  {
    id: "robotics",
    group: "Hardware",
    name: "Robotics",
    short: "Motion control, ROS integration and sensor-driven automation for machines that move, sense and decide.",
    tags: ["Motion control", "ROS", "Sensors"],
    intro: "From a single actuated mechanism to an autonomous platform, we build the control, sensing and software layers that make robots dependable.",
    items: [
      { title: "Motion Control", desc: "Motor drivers, closed-loop control and trajectory planning." },
      { title: "ROS Integration", desc: "ROS-based architectures, nodes and simulation for faster development." },
      { title: "Sensor-Driven Automation", desc: "Vision, lidar, IMU and proximity sensing turned into reliable actions." },
      { title: "Teleoperation & Dashboards", desc: "Remote control, monitoring and logs for every machine." },
    ],
    team: "robotics",
    work: [],
  },
  {
    id: "kiosks",
    featured: true,
    group: "Hardware",
    name: "Self-Service Kiosks",
    short: "Kiosk hardware integration, touchscreen software and payment and printer peripherals, delivered as one working unit.",
    tags: ["Touchscreen", "Payments", "Printers", "Remote management"],
    intro: "Self-service that just works: we integrate the hardware, write the touchscreen experience and connect payments, printers and scanners into one reliable kiosk.",
    items: [
      { title: "Kiosk Hardware Integration", desc: "Screens, computers, enclosures and sensors chosen and assembled to spec." },
      { title: "Touchscreen Software", desc: "Fast, accessible kiosk interfaces built for walk-up users." },
      { title: "Payments & Peripherals", desc: "Card terminals, receipt printers, scanners and cash devices." },
      { title: "Fleet Management", desc: "Remote updates, health monitoring and content control across sites." },
    ],
    team: "kiosk",
    work: [],
  },
  {
    id: "manufacturing",
    group: "Hardware",
    name: "Manufacturing Support",
    short: "BOM optimisation, component sourcing, small-batch production and test jigs that get your device from prototype to product.",
    tags: ["BOM", "Sourcing", "Small batch", "Test jigs"],
    intro: "A working prototype is not a product yet. We help you build it repeatably, affordably and with the testing to prove every unit works.",
    items: [
      { title: "BOM Optimisation", desc: "Cost-down, second sources and lifecycle checks on every component." },
      { title: "Component Sourcing", desc: "Procurement support for parts that are hard to find or long lead." },
      { title: "Small-Batch Production", desc: "Pilot runs to validate assembly before scaling up." },
      { title: "Production Test Jigs", desc: "Fixtures and software that test every board on the line." },
    ],
    team: "manufacturing",
    work: [],
  },
  {
    id: "certification",
    group: "Hardware",
    name: "Certification Readiness",
    short: "Pre-compliance testing and documentation that prepare your device for CE/FCC and, for medical devices, IEC 60601 and ISO 13485.",
    tags: ["CE", "FCC", "IEC 60601", "ISO 13485"],
    intro: "We get your product and paperwork ready before it reaches an accredited lab, reducing surprises and repeat test cycles. Certification itself is issued by accredited test houses and notified bodies; we support you through it.",
    items: [
      { title: "Pre-Compliance Testing", desc: "Early EMC and safety checks to catch issues before formal testing." },
      { title: "CE & FCC Readiness", desc: "Design reviews and technical files prepared for CE and FCC submissions." },
      { title: "Medical Device Readiness", desc: "Support toward IEC 60601 and ISO 13485 expectations for medical products." },
      { title: "Documentation Support", desc: "Risk files, test reports and design history organised for auditors." },
    ],
    team: "compliance",
    work: [],
  },
  {
    id: "ai",
    featured: true,
    group: "Software",
    name: "AI Engineering",
    short: "Generative AI, computer vision and predictive models built into your product, from PoC to production.",
    tags: ["LLMs", "Vision", "NLP", "Agents"],
    intro: "AI built into the core of your product, from a quick proof of concept to models in production.",
    items: [
      { title: "Generative AI & LLM Apps", desc: "Assistants, RAG search and agents grounded in your data." },
      { title: "Computer Vision", desc: "Detection, inspection and tracking from camera feeds." },
      { title: "Natural Language Processing", desc: "Classification, extraction and summarisation." },
      { title: "ML / Deep Learning", desc: "Custom models trained, evaluated and deployed with MLOps." },
      { title: "Predictive Analytics", desc: "Forecasts and risk scores that drive decisions." },
      { title: "Chatbots & AI Agents", desc: "Conversational support and workflow automation." },
    ],
    team: "AI",
    work: ["callcom", "mirra", "ai-medik", "i-hospice", "fireside-pharmacy", "splitmart"],
  },
  {
    id: "software",
    featured: true,
    group: "Software",
    name: "Web, Mobile & SaaS",
    short: "Ciylo’s core: modern web apps, native and cross-platform mobile apps, and SaaS platforms built for scale.",
    tags: ["Web", "iOS", "Android", "SaaS"],
    intro: "Ciylo’s core: scalable, user-centred digital products.",
    items: [
      { title: "Custom Software", desc: "Tailored systems built around your business." },
      { title: "Web Development", desc: "Modern web apps built for scale." },
      { title: "Mobile Apps", desc: "Native and cross-platform iOS and Android apps." },
      { title: "SaaS Products", desc: "From concept to launch and beyond." },
      { title: "Quality Assurance", desc: "Manual and automated testing across devices." },
      { title: "Enterprise Software", desc: "ERP-style internal tools that fit how your teams actually work." },
      { title: "Operations Dashboards", desc: "Live views of orders, assets, people and performance." },
      { title: "Systems Integration", desc: "Connect the tools you already pay for into one flow." },
    ],
    team: "software",
    work: ["fireside-pharmacy", "keyper", "verited", "splitmart", "tarea", "i-health", "callcom", "mirra"],
  },
  {
    id: "ecommerce",
    featured: true,
    group: "Software",
    name: "E-commerce & Marketplaces",
    short:
      "Online stores, multi-vendor marketplaces and booking platforms with checkout, payments and order tracking built in.",
    tags: ["Storefronts", "Marketplaces", "Payments", "Checkout"],
    intro: "Commerce experiences that turn browsers into buyers, on the web and in the app.",
    items: [
      { title: "Online Stores", desc: "Custom storefronts and headless commerce, fast on every device." },
      { title: "Multi-Vendor Marketplaces", desc: "Seller onboarding, listings, reviews and commissions." },
      { title: "Checkout & Payments", desc: "Cards, wallets, instalments and secure payment gateways." },
      { title: "Orders & Fulfilment", desc: "Real-time order tracking, notifications and inventory sync." },
      { title: "Bookings & Subscriptions", desc: "Appointment booking, memberships and recurring billing." },
    ],
    team: "e-commerce",
    work: ["fireside-pharmacy", "splitmart", "keyper"],
  },
  {
    id: "erp-crm",
    group: "Software",
    name: "ERP, CRM & Business Systems",
    short:
      "Custom ERP, CRM and operations platforms that replace spreadsheets, connect teams and integrate with the tools you already use.",
    tags: ["ERP", "CRM", "Workflows", "Integrations"],
    intro: "Systems of record built around how your business actually runs, not the other way round.",
    items: [
      { title: "Custom ERP", desc: "Operations, inventory, scheduling, billing and reporting in one platform." },
      { title: "CRM & Sales Automation", desc: "Pipelines, lead management and automated follow-ups." },
      { title: "Industry Management Systems", desc: "Hospital, property, field-service and practice management." },
      { title: "Workflow Automation", desc: "Approvals, recurring tasks and notifications without the manual chasing." },
      { title: "Integrations & Migration", desc: "Connect Salesforce, HubSpot, Zoho, accounting tools and legacy data." },
    ],
    team: "business systems",
    work: ["i-health", "tarea", "keyper", "callcom"],
  },
  {
    id: "cloud",
    group: "Software",
    name: "Cloud & DevOps",
    short: "Cloud architecture, CI/CD and containers that keep products fast, reliable and easy to ship.",
    tags: ["Cloud", "CI/CD", "Containers"],
    intro: "Infrastructure and delivery pipelines that keep products fast and reliable.",
    items: [
      { title: "Cloud Architecture & Migration", desc: "Design and move workloads to the right cloud." },
      { title: "CI/CD & DevOps", desc: "Automated builds, tests and releases, firmware included." },
      { title: "Containers & Orchestration", desc: "Docker and Kubernetes for scalable services." },
      { title: "Managed Cloud", desc: "Monitoring, cost control and on-call support." },
    ],
    team: "cloud",
    work: ["i-hospice", "callcom", "i-health"],
  },
  {
    id: "data",
    group: "Software",
    name: "Data Engineering",
    short: "Pipelines, analytics and time-series storage that turn device telemetry and product data into decisions.",
    tags: ["Pipelines", "Time-series", "BI"],
    intro: "Turn device telemetry and product data into decisions.",
    items: [
      { title: "Data Pipelines", desc: "Ingest, clean and store data from apps and devices." },
      { title: "Analytics & BI", desc: "Dashboards and reports your team will use." },
      { title: "Time-Series Data", desc: "Storage and processing for high-frequency sensor data." },
    ],
    team: "data",
    work: ["tarea", "keyper", "i-health"],
  },
  {
    id: "cybersecurity",
    featured: true,
    group: "Software",
    name: "Cyber Security",
    short: "Security reviews for devices and apps, secure boot and OTA, penetration testing and hardened cloud configuration.",
    tags: ["Pen testing", "Secure boot", "Secure OTA", "Cloud security"],
    intro: "Security designed in from the chip to the cloud, then tested the way an attacker would.",
    items: [
      { title: "Device & App Security Reviews", desc: "Threat modelling and code review across firmware, mobile and web." },
      { title: "Secure Boot & Secure OTA", desc: "Signed firmware, encrypted updates and rollback protection." },
      { title: "Penetration Testing", desc: "Hands-on testing of apps, APIs and connected devices." },
      { title: "Secure Cloud Configuration", desc: "Identity, network and data protection set up correctly from day one." },
    ],
    team: "security",
    work: [],
  },
  {
    id: "product-development",
    featured: true,
    group: "Consulting",
    name: "Product Development & MVP",
    short:
      "Complete ownership of your product: UI/UX, software, cloud and hardware in one package, from first sketch to MVP to scale.",
    tags: ["End-to-end", "MVP", "UI/UX → Cloud → Hardware"],
    intro:
      "Hand us the whole product. One Ciylo team takes complete ownership, from research and UI/UX to software, cloud and the hardware itself, and runs it through a proven MVP pipeline so you launch fast and keep scaling.",
    items: [
      { title: "Discovery & Product Definition", desc: "Workshops, user research and a costed scope that pins down the MVP." },
      { title: "UI/UX & Prototyping", desc: "Clickable prototypes and industrial-grade interface design, tested with real users." },
      { title: "Software & Cloud Build", desc: "Web, mobile, backend and cloud infrastructure delivered in two-week sprints." },
      { title: "Hardware & Firmware", desc: "PCBs, firmware and device prototypes built in parallel, not after." },
      { title: "MVP Launch", desc: "Store releases, pilot deployments and investor-ready demos." },
      { title: "Scale & Iterate", desc: "Analytics, feedback loops and a roadmap from MVP to version 2 and beyond." },
    ],
    team: "product",
    work: ["callcom", "mirra", "fireside-pharmacy", "ai-medik", "splitmart", "verited"],
  },
  {
    id: "consulting",
    group: "Consulting",
    name: "Product Strategy & UI/UX",
    short: "Strategy, research and interface design so hardware and software feel like one product.",
    tags: ["Strategy", "UX research", "UI design"],
    intro: "Shape the right product before a line of code or a board is made.",
    items: [
      { title: "Product Strategy", desc: "Roadmaps, scoping and feasibility for new products." },
      { title: "UI/UX Design", desc: "Interfaces users actually love, on screens and devices." },
      { title: "Digital Transformation", desc: "Modernise legacy systems and workflows." },
      { title: "Support & Maintenance", desc: "Ongoing maintenance and evolution after launch." },
    ],
    team: "strategy",
    work: ["ai-medik", "verited", "splitmart", "mirra", "fireside-pharmacy"],
  },
  {
    id: "product-market-fit",
    group: "Advisory",
    name: "Product–Market Fit Sprint",
    short: "Segmentation, competitor analysis, SWOT and value-proposition work, tested with real users before you build more.",
    tags: ["Segmentation", "Competitors", "SWOT", "User feedback"],
    intro: "Before you spend on features, make sure you're building the right thing for the right people. A focused sprint that turns assumptions into evidence.",
    items: [
      { title: "Market Segmentation", desc: "Find the segments where your product wins first." },
      { title: "Competitor Analysis", desc: "A clear map of alternatives, gaps and positioning." },
      { title: "SWOT", desc: "Strengths, weaknesses, opportunities and threats, made actionable." },
      { title: "Value-Proposition Refinement", desc: "Sharpen what you promise and to whom." },
      { title: "User Feedback Loop", desc: "Interviews and tests that keep the roadmap honest." },
    ],
    team: "advisory",
    work: [],
  },
  {
    id: "product-rescue",
    group: "Advisory",
    name: "Product Rescue & Turnaround",
    short: "For stalled or struggling products: a technical audit, a go-to-market reset and a roadmap you can actually deliver.",
    tags: ["Tech audit", "GTM reset", "Roadmap triage"],
    intro: "When a product is late, over budget or not landing with users, we step in, find out why and get it moving again.",
    items: [
      { title: "Technical Audit", desc: "Code, firmware, hardware and infrastructure reviewed for risk and debt." },
      { title: "Go-to-Market Reset", desc: "Re-examine audience, pricing and positioning." },
      { title: "Roadmap Triage", desc: "Cut, fix or keep: a realistic plan to the next release." },
      { title: "Hands-On Recovery", desc: "Ciylotrons join to stabilise and ship." },
    ],
    team: "advisory",
    work: [],
  },
  {
    id: "due-diligence",
    group: "Advisory",
    name: "Technical Due Diligence",
    short: "For investors and acquirers: technology and business risk analysis across code, firmware and hardware, with a clear report.",
    tags: ["Risk analysis", "Code review", "V&V", "ROM estimate"],
    intro: "An independent, engineering-led view of what you're investing in or acquiring, across software, firmware and hardware.",
    items: [
      { title: "Technology & Business Risk", desc: "Where the product, team and architecture could fail." },
      { title: "Code, Firmware & Hardware Review", desc: "Quality, maintainability, security and scalability." },
      { title: "Verification & Validation", desc: "Does it do what it claims, reliably?" },
      { title: "Feasibility Study", desc: "Can the roadmap be delivered with this foundation?" },
      { title: "ROM Estimate", desc: "A rough order-of-magnitude cost for fixes and next steps." },
    ],
    team: "advisory",
    work: [],
  },
  {
    id: "feasibility",
    group: "Advisory",
    name: "Feasibility & ROM Estimate",
    short: "A paid discovery that tells you whether your idea can be built, how, and roughly what it will cost.",
    tags: ["Discovery", "Feasibility", "ROM estimate"],
    intro: "A standalone discovery engagement for new ideas: we test the technical risk, outline the architecture and give you a rough order-of-magnitude estimate you can plan around.",
    items: [
      { title: "Technical Feasibility", desc: "Identify the hardest problems and how to solve them." },
      { title: "Architecture Outline", desc: "Hardware, firmware, software and cloud at a glance." },
      { title: "ROM Estimate", desc: "Rough cost and effort ranges for planning and fundraising." },
      { title: "Recommended Next Step", desc: "Usually a prototype or PoC, scoped and ready to start." },
    ],
    team: "discovery",
    work: [],
  },
];

/** The MVP pipeline shown with the Product Development offer. */
export const mvpPipeline = [
  { step: "01", title: "Define", desc: "Problem, users and a sharp MVP scope with costs." },
  { step: "02", title: "Design", desc: "UI/UX, system architecture and hardware specs." },
  { step: "03", title: "Build", desc: "Software, cloud, firmware and boards in parallel sprints." },
  { step: "04", title: "Validate", desc: "Bench, field and user testing before launch." },
  { step: "05", title: "Launch", desc: "Go live, ship to stores, deploy pilots." },
  { step: "06", title: "Scale", desc: "Measure, iterate and grow past the MVP." },
];

export const engagementModels = {
  columns: ["Prototype / PoC", "Dedicated team", "Full project delivery"],
  /** Optional entry point shown under each column header */
  entry: [
    { label: "Start with a Feasibility & ROM estimate", href: "/services#feasibility" },
    { label: "See the Ciylotrons", href: "/about/teams" },
    { label: "Our MVP pipeline", href: "/services#product-development" },
  ],
  highlight: 1,
  rows: [
    {
      label: "Best for",
      cells: [
        "Testing an idea with users, investors or a pilot site",
        "Teams that need firmware, hardware or AI skills in-house",
        "A complete product built to a fixed scope",
      ],
    },
    {
      label: "How it works",
      cells: [
        "A short, focused build of the riskiest part",
        "Ciylotrons join your tools and rituals",
        "We own delivery, requirements to deployment",
      ],
    },
    {
      label: "You get",
      cells: [
        "A working device or app and a build plan",
        "Extra capacity that scales up or down",
        "A launched product plus ongoing support",
      ],
    },
  ],
};

export const getService = (id: string) => services.find((s) => s.id === id);

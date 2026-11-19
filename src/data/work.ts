/**
 * Case studies. Copy is taken from Ciylo's Figma case-study decks and the
 * previous site. Do not add metrics that the client has not confirmed.
 * Images live in /public/images/work/<slug>/ (cover.webp + 01..NN.webp).
 */
export type Industry =
  | "Healthcare"
  | "Pharmacy"
  | "Education"
  | "PropTech & FinTech"
  | "Field Service"
  | "AI & Automation"
  | "Sales & Communication"
  | "Marketplaces";

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  industry: Industry;
  platforms: string[];
  /** Service ids from src/data/services.ts */
  services: string[];
  summary: string;
  intro: string;
  challenge: string;
  approach: string;
  features: { title: string; desc: string }[];
  highlights?: { value: string; label: string }[];
  screens: { src: string; title: string; desc?: string }[];
  cover: string;
  /** How the cover sits in its frame: device renders = contain, raw screenshots = cover */
  coverFit: "contain" | "cover";
  /** Product brand colour, used as a subtle accent on its page */
  accent: string;
  /** Dark or light stage behind device renders */
  stage: "dark" | "light";
  logo?: string;
  featured?: boolean;
};

const w = (slug: string, file: string) => `/images/work/${slug}/${file}.webp`;

export const work: CaseStudy[] = [
  {
    slug: "callcom",
    name: "Callcom",
    tagline: "The #1 platform for AI voice calls",
    industry: "Sales & Communication",
    platforms: ["Web app", "SaaS"],
    services: ["ai", "software", "erp-crm", "cloud", "product-development"],
    summary:
      "An AI calling platform whose voice agents run inbound and outbound calls, book meetings and sync every conversation to the CRM.",
    intro:
      "Callcom is an AI-powered calling platform that automates inbound and outbound phone calls using intelligent voice agents. It enables businesses to manage campaigns, handle conversations, book meetings and integrate with CRMs, streamlining communication at scale.",
    challenge:
      "Sales and support teams lose hours to repetitive calls, and every missed call is a missed booking. The goal was a platform where a business can spin up a voice agent, give it a goal and a voice, point it at a list of prospects and let it work, without a call centre.",
    approach:
      "We designed and built the full SaaS: agent creation from templates, campaign configuration for the agent's message, role and language, voice selection and cloning, prospect management with CRM and CSV import, telephony number management, a meeting calendar fed by booked calls, and subscription plans based on minutes and features.",
    features: [
      { title: "AI calling & conversation automation", desc: "Automated inbound and outbound calls with intelligent voice agents." },
      { title: "Campaign management", desc: "Define agent prompts, goals and conversation flows." },
      { title: "Agent & voice control", desc: "Choose or clone voice personalities for calls." },
      { title: "Prospect management", desc: "Import prospects via CRM and CSV, then organise and target contact lists." },
      { title: "Meeting & appointment tracking", desc: "A calendar view of meetings booked through calls." },
      { title: "Third-party integrations", desc: "Sync with CRM tools, calendars and other platforms." },
    ],
    screens: [
      { src: w("callcom", "02"), title: "Dashboard", desc: "Total calls, minutes used and appointments booked at a glance." },
      { src: w("callcom", "03"), title: "Campaign configuration", desc: "Define the agent's message, role and language." },
      { src: w("callcom", "04"), title: "Voice cloning", desc: "Create a realistic AI version of a real person's voice." },
      { src: w("callcom", "05"), title: "Agent creation", desc: "Pick a template, name the agent and go live." },
      { src: w("callcom", "06"), title: "Prospect management", desc: "Import, filter and organise prospects for every campaign." },
      { src: w("callcom", "07"), title: "Phone numbers", desc: "Purchase or import numbers and connect telephony providers." },
      { src: w("callcom", "08"), title: "Appointment scheduling", desc: "Meetings booked by AI calls land in a shared calendar." },
      { src: w("callcom", "09"), title: "CRM integrations", desc: "Automated data syncing, lead management and scheduling." },
      { src: w("callcom", "10"), title: "Demo call", desc: "Hear how the AI sounds and responds in real time." },
      { src: w("callcom", "01"), title: "Mobile landing" },
    ],
    cover: w("callcom", "cover"),
    coverFit: "contain",
    accent: "#6d5dfc",
    stage: "dark",
    logo: "/images/work/case-callcom-logo.svg",
    featured: true,
  },
  {
    slug: "fireside-pharmacy",
    name: "Fireside Pharmacy",
    tagline: "From script to doorstep",
    industry: "Pharmacy",
    platforms: ["iOS", "Android", "Web"],
    services: ["software", "ecommerce", "ai", "product-development"],
    summary:
      "Pharmacy care in the patient's pocket: new prescriptions, refills, transfers and real-time order tracking, with AI that reads prescription photos.",
    intro:
      "Fireside Pharmacy is a full digital solution for managing medications, allowing patients to order prescriptions, request refills, transfer prescriptions and track orders in real time. Its AI-driven prescription upload reads and converts prescription images into accurate digital data, making the process faster and error-free.",
    challenge:
      "Ordering, refilling and transferring prescriptions usually means phone calls, paper and waiting. Fireside wanted patients to handle all of it from their phone, with the pharmacy receiving clean, structured data instead of blurry photos and handwriting.",
    approach:
      "We built patient-facing mobile and web apps around a single dashboard, plus an AI pipeline that extracts patient, prescriber and medication details from an uploaded image and turns handwritten scripts into structured digital prescriptions. Checkout, refill and transfer flows were designed to take seconds.",
    features: [
      { title: "AI prescription digitisation", desc: "Instantly reads uploaded prescription images and converts them into structured, accurate digital data." },
      { title: "Refill management", desc: "Request refills on existing prescriptions in a couple of taps." },
      { title: "Order tracking", desc: "Real-time progress of each prescription order, from submission to delivery." },
      { title: "Transfer Rx", desc: "Move prescriptions from another pharmacy directly to Fireside." },
    ],
    screens: [
      { src: w("fireside-pharmacy", "02"), title: "AI prescription upload", desc: "Extracts patient, prescriber and medication details from a photo." },
      { src: w("fireside-pharmacy", "04"), title: "New Rx request", desc: "Handwritten scripts become structured digital prescriptions." },
      { src: w("fireside-pharmacy", "03"), title: "Dashboard", desc: "New prescriptions, transfers, refills and order status in one place." },
      { src: w("fireside-pharmacy", "01"), title: "Checkout", desc: "Order confirmation and checkout in a single flow." },
      { src: w("fireside-pharmacy", "05"), title: "Refill & transfer Rx" },
      { src: w("fireside-pharmacy", "06"), title: "Mobile app" },
    ],
    cover: w("fireside-pharmacy", "cover"),
    coverFit: "cover",
    accent: "#e5484d",
    stage: "light",
    featured: true,
  },
  {
    slug: "ai-medik",
    name: "AI Medik",
    tagline: "From symptoms to care",
    industry: "Healthcare",
    platforms: ["Web", "iOS", "Android"],
    services: ["ai", "software", "consulting", "product-development"],
    summary:
      "AI symptom assessment that guides people to the right care, with appointments, remote consultations and AI transcription of every visit.",
    intro:
      "AI Medik is a healthcare technology platform that uses AI to assess user-reported symptoms and guide people toward appropriate care, while also enabling appointment scheduling and remote consultations with medical professionals. It bridges the gap between initial health concerns and professional medical support, making healthcare more accessible, personalised and efficient without replacing real medical advice.",
    challenge:
      "Patients often don't know whether a symptom needs a doctor, and doctors lose context between visits. AI Medik needed to give people a trustworthy first step and carry that context into the consultation and the follow-up.",
    approach:
      "We designed and built AI health sessions that collect symptoms and health details and return preliminary insights, then connected them to specialist booking, virtual consultations and AI transcription that records and summarises each consultation for both patient and doctor.",
    features: [
      { title: "AI-powered symptom assessment", desc: "Users enter symptoms and health details, and AI provides preliminary insights and possible causes." },
      { title: "Appointment scheduling", desc: "Book appointments with relevant medical specialists directly." },
      { title: "Remote consultations", desc: "Virtual doctor visits so patients can consult professionals online." },
      { title: "AI transcription", desc: "Each consultation is recorded and summarised, then shared as context for the next follow-up." },
    ],
    screens: [
      { src: w("ai-medik", "02"), title: "Dashboard", desc: "Today's appointments, inbox and shortcuts to AI sessions, doctors and records." },
      { src: w("ai-medik", "04"), title: "AI sessions", desc: "Start a new AI health session or revisit previous symptom analyses." },
      { src: w("ai-medik", "05"), title: "Appointments", desc: "A calendar to see, track and manage medical visits." },
      { src: w("ai-medik", "06"), title: "My doctors", desc: "Connected healthcare providers in one place." },
      { src: w("ai-medik", "07"), title: "Transcription", desc: "Transcripts from a voice recording or plain text." },
      { src: w("ai-medik", "08"), title: "Personal health information", desc: "Lifestyle, medical, radiology and lab details for better AI analysis." },
      { src: w("ai-medik", "03"), title: "Mobile dashboard" },
      { src: w("ai-medik", "01"), title: "Desktop experience" },
    ],
    cover: w("ai-medik", "cover"),
    coverFit: "contain",
    accent: "#00c2b8",
    stage: "light",
    logo: "/images/work/case-ai-madic-logo.svg",
    featured: true,
  },
  {
    slug: "i-hospice",
    name: "I-Hospice",
    tagline: "Voice-first documentation for hospice nurses",
    industry: "Healthcare",
    platforms: ["iOS", "Android", "Cloud"],
    services: ["ai", "software", "cloud"],
    summary:
      "An AI documentation system that lets hospice nurses record vitals, assessments and care plans by voice, checked in real time and synced to their EMR.",
    intro:
      "I-Hospice is a comprehensive AI-powered documentation system designed to streamline hospice care operations, with modules for patient records, care plans, visit notes and team coordination.",
    challenge:
      "Hospice nurses spend a large part of every visit typing into forms. Documentation had to get dramatically faster without losing accuracy or compliance, and it had to fit into the EMR the agency already uses.",
    approach:
      "We built an interview-style mobile app where nurses can document manually or by voice. The AI extracts vital signs, assessments and care-plan details from short recordings, runs real-time quality assurance, and lets the nurse review and edit before syncing to the EMR of the agency's choice.",
    highlights: [
      { value: "<10 min", label: "Full visit documentation" },
      { value: "10 s", label: "To document vital signs" },
      { value: "2 min", label: "To document an assessment" },
      { value: "3 min", label: "To document a care plan" },
    ],
    features: [
      { title: "Voice-enabled interviews", desc: "Interview-style documentation, typed or spoken." },
      { title: "EMR integration", desc: "Real-time quality assurance before syncing with the EMR of your choice." },
      { title: "Referral intake", desc: "Directly ingest incoming referrals from physicians." },
      { title: "IDG care team", desc: "Shared care plans and coordination across the team." },
      { title: "Compliance built in", desc: "Patient data encryption and a low error rate thanks to AI quality checks." },
      { title: "Proactive scheduling", desc: "Cloud-based scheduling and real-time notifications." },
    ],
    screens: [
      { src: w("i-hospice", "cover"), title: "Manual or speech", desc: "Nurses choose how they document every visit." },
      { src: w("i-hospice", "01"), title: "Vital signs by voice", desc: "A 10-second recording fills in the vitals." },
      { src: w("i-hospice", "02"), title: "Recording saved" },
      { src: w("i-hospice", "03"), title: "Heart rate" },
      { src: w("i-hospice", "04"), title: "Blood pressure" },
      { src: w("i-hospice", "05"), title: "Assessment" },
      { src: w("i-hospice", "06"), title: "Care plan" },
      { src: w("i-hospice", "07"), title: "Patients" },
      { src: w("i-hospice", "08"), title: "Encounter form" },
      { src: w("i-hospice", "09"), title: "Care plan detail" },
    ],
    cover: w("i-hospice", "cover"),
    coverFit: "contain",
    accent: "#b0359c",
    stage: "light",
  },
  {
    slug: "verited",
    name: "VeritEd",
    tagline: "Tutoring that unlocks potential",
    industry: "Education",
    platforms: ["Web", "iOS", "Android"],
    services: ["software", "consulting", "product-development"],
    summary:
      "A one-to-one tutoring platform that matches students with tutors, handles booking and messaging, and hands live classes to an integrated virtual classroom.",
    intro:
      "VeritEd is an online tutoring platform that connects students with qualified tutors for personalised, one-on-one learning. It provides tools for booking sessions, real-time communication and virtual classrooms, making academic support flexible, secure and accessible from anywhere.",
    challenge:
      "Students, parents and tutors were juggling separate tools for finding a tutor, scheduling, messaging and running the lesson. VeritEd wanted one place for all of it.",
    approach:
      "We built a central dashboard, secure in-platform messaging, an integrated booking calendar that avoids clashes, and a BrainCert integration that switches users into a live classroom with whiteboards, screen sharing, chat and recordings when a class starts.",
    features: [
      { title: "Tutor–student matching", desc: "Connects students with suitable tutors based on subject needs and availability." },
      { title: "Virtual classroom", desc: "Live tutoring sessions with real-time interaction, powered by BrainCert." },
      { title: "Personalised learning", desc: "One-on-one tutoring tailored to each student's goals and level." },
      { title: "Progress & session management", desc: "Track sessions, learning activity and engagement." },
    ],
    screens: [
      { src: w("verited", "06"), title: "Dashboard", desc: "A real-time summary of tutoring activity and upcoming sessions." },
      { src: w("verited", "03"), title: "Communication", desc: "Secure messaging between students and tutors." },
      { src: w("verited", "05"), title: "Booking & scheduling", desc: "An integrated calendar that avoids scheduling conflicts." },
      { src: w("verited", "07"), title: "Classroom", desc: "Classes switch automatically into BrainCert's live classroom." },
      { src: w("verited", "01"), title: "Mobile app" },
      { src: w("verited", "04"), title: "Mobile chat" },
      { src: w("verited", "02"), title: "On the go" },
    ],
    cover: w("verited", "cover"),
    coverFit: "contain",
    accent: "#0aa5c0",
    stage: "light",
    logo: "/images/work/case-verited-logo.svg",
  },
  {
    slug: "mirra",
    name: "Mirra",
    tagline: "Meet your first AI employee",
    industry: "AI & Automation",
    platforms: ["Web app", "SaaS"],
    services: ["ai", "software", "consulting", "product-development"],
    summary:
      "A platform for building, training and selling AI agents that connect to your tools and take repetitive work off your plate.",
    intro:
      "Mirra is an AI-powered platform where you can create and use smart AI agents to automate everyday tasks and workflows. These agents connect with your tools, take actions for you and handle repetitive or time-consuming work, so you don't have to do everything manually.",
    challenge:
      "Automation tools are either too technical for most teams or too rigid to be useful. Mirra needed agent building that anyone can use, agents that learn a business's own knowledge, and a marketplace so good agents can be shared.",
    approach:
      "We built a visual workflow builder with triggers, actions, testing and publishing; agent training from PDFs, text files and voice recordings; integrations with Gmail, Slack, Google Calendar, LinkedIn and more; and a marketplace to buy, sell and share agents.",
    features: [
      { title: "AI agent builder", desc: "Build agents visually: define triggers, add actions, test and publish." },
      { title: "Automation & workflows", desc: "Chain triggers and logic into reliable automations." },
      { title: "Integrations", desc: "Connect external tools, APIs and data sources." },
      { title: "Marketplace", desc: "Buy, sell or share agents so creators can monetise their automations." },
      { title: "Knowledge-base training", desc: "Teach agents with documents or voice recordings." },
    ],
    screens: [
      { src: w("mirra", "03"), title: "Agent creation", desc: "Visual workflows with triggers, actions and testing." },
      { src: w("mirra", "02"), title: "Marketplace", desc: "Discover, buy or sell ready-made AI agents." },
      { src: w("mirra", "06"), title: "My agents", desc: "Manage, monitor and switch agents on or off." },
      { src: w("mirra", "04"), title: "Training & customisation", desc: "Agents learn from PDFs, text files or audio." },
      { src: w("mirra", "05"), title: "Integrations", desc: "Gmail, Slack, Google Calendar, LinkedIn and more." },
      { src: w("mirra", "01"), title: "Landing page" },
      { src: w("mirra", "07"), title: "Introduction" },
    ],
    cover: w("mirra", "cover"),
    coverFit: "contain",
    accent: "#5ee6b0",
    stage: "dark",
    logo: "/images/work/case-mirra-logo.svg",
  },
  {
    slug: "splitmart",
    name: "SplitMart",
    tagline: "Book local fitness & wellness sessions near you",
    industry: "Marketplaces",
    platforms: ["Web", "iOS", "Android"],
    services: ["ecommerce", "software", "ai", "product-development"],
    summary:
      "A marketplace connecting trusted local trainers with clients, from discovery and booking to video consultations, payment and review.",
    intro:
      "SplitMart is an all-in-one platform that connects trusted local service providers with clients, from discovery and booking to payment and review, seamlessly.",
    challenge:
      "Independent trainers struggle to be found and to manage bookings, while clients want to find someone nearby they can trust. Both sides needed one simple product.",
    approach:
      "We built location-based discovery with geospatial search, booking flows with active, completed and cancelled states, trainer listings with drafts and discounts, video consultations, and AI assistance that writes listing titles, descriptions and bios and helps create images.",
    features: [
      { title: "Service marketplace", desc: "Trusted local providers, listed and bookable in one place." },
      { title: "Video consultations", desc: "Meet trainers remotely before or instead of in person." },
      { title: "Location-based discovery", desc: "Geospatial search, with Google Calendar availability for creators." },
      { title: "Multi-channel notifications", desc: "Push notifications, SMS and email." },
      { title: "AI listing assistant", desc: "AI helps trainers write titles, descriptions and bios and create images." },
    ],
    screens: [
      { src: w("splitmart", "02"), title: "Session booking", desc: "Book a trainer by choosing the type of session you need." },
      { src: w("splitmart", "03"), title: "AI assistance", desc: "AI drafts listing titles, descriptions, images and bios." },
      { src: w("splitmart", "04"), title: "Bookings", desc: "Active, completed and cancelled sessions." },
      { src: w("splitmart", "05"), title: "Trainer listings", desc: "Active and draft listings, discounts and edits." },
      { src: w("splitmart", "06"), title: "Video consultation" },
      { src: w("splitmart", "01"), title: "Mobile app" },
    ],
    cover: w("splitmart", "cover"),
    coverFit: "contain",
    accent: "#ff7a45",
    stage: "light",
  },
  {
    slug: "keyper",
    name: "Keyper",
    tagline: "Rent now, pay later in Dubai",
    industry: "PropTech & FinTech",
    platforms: ["iOS", "Android", "Web"],
    services: ["software", "ecommerce", "erp-crm", "data"],
    summary:
      "Web and mobile platforms for Dubai's rent-now-pay-later leader: monthly rent for tenants, cash-outs and portfolio insight for owners.",
    intro:
      "Keyper is the smarter way to manage and rent property in Dubai. Property owners can cash out on their tenants' outstanding rent at any time and receive it digitally. Tenants can pay monthly, whatever the landlord's terms, and agents and portfolio managers grow their business on the same platform. Ciylo built features across Keyper's web and mobile platform.",
    challenge:
      "Dubai rents are traditionally paid in one or a few large cheques a year. Keyper's model needed apps that make monthly card payments simple for tenants while giving owners, agents and portfolio managers live visibility of their properties and income.",
    approach:
      "We built tenant and owner experiences across mobile and web: instant access to the portfolio and on-demand services, digital rent collection, rent-now-pay-later instalments by card, portfolio monitoring and valuation, property tracking during development, and listings for yearly rentals with monthly payments.",
    features: [
      { title: "Rent now, pay later", desc: "Tenants pay yearly rent in 12 card instalments." },
      { title: "Digital rent collection", desc: "Owners receive rent digitally and can cash out any time." },
      { title: "Portfolio monitoring", desc: "Real-time reporting and portfolio valuation." },
      { title: "Lease & tenant management", desc: "Leases, maintenance and refurbishment in one place." },
      { title: "Track property under development", desc: "Follow off-plan properties through to handover." },
    ],
    screens: [
      { src: w("keyper", "02"), title: "Rent payments", desc: "Monthly instalments, whatever the landlord's terms." },
      { src: w("keyper", "03"), title: "Portfolio", desc: "Portfolio monitoring and market insight for owners." },
      { src: w("keyper", "04"), title: "Property details" },
      { src: w("keyper", "05"), title: "Calendar" },
      { src: w("keyper", "06"), title: "Web listings", desc: "Yearly rentals, monthly payments." },
      { src: w("keyper", "07"), title: "Property page" },
      { src: w("keyper", "01"), title: "Pay by card" },
      { src: w("keyper", "08"), title: "Track your property" },
    ],
    cover: w("keyper", "cover"),
    coverFit: "contain",
    accent: "#2f6bff",
    stage: "light",
  },
  {
    slug: "tarea",
    name: "Tarea",
    tagline: "Work orders, without the chaos",
    industry: "Field Service",
    platforms: ["Web app", "SaaS"],
    services: ["software", "erp-crm", "data"],
    summary:
      "A work-order platform for field and facility teams: recurring tasks, photo logs, QR codes, vendor chat and clear analytics.",
    intro:
      "Tarea.io is a work-order and task-management platform for facility and field-service teams. Managers assign and schedule work, crews document it with photos and checklists, and clients and vendors stay in the loop inside each task.",
    challenge:
      "Field work lives across spreadsheets, WhatsApp threads and photos on personal phones, so overdue tasks slip and proof of work goes missing. Tarea needed one system of record that crews actually use.",
    approach:
      "We built a dashboard of daily and overdue tasks with assignment and recurrence, client calendars, work orders with photos, checklists, logs and downloadable QR codes, a time-stamped photo gallery, real-time client and vendor chat per task, search, and analytics segmented by date and status.",
    features: [
      { title: "Task dashboard", desc: "Daily and overdue tasks, assignment, recurrence and progress." },
      { title: "Work-order detail", desc: "Photos, checklists, logs, messages and a downloadable QR code." },
      { title: "Photo evidence", desc: "Every photo tagged with upload time and employee identity." },
      { title: "Client & vendor chat", desc: "Real-time messaging inside each task." },
      { title: "Analytics & reporting", desc: "Charts by date and status: in progress, done, overdue." },
    ],
    screens: [
      { src: w("tarea", "01"), title: "Analytics", desc: "Work segmented by date and status." },
      { src: w("tarea", "02"), title: "Calendar", desc: "A weekly agenda per client." },
      { src: w("tarea", "03"), title: "Work order", desc: "Photos, checklists, logs and a QR code." },
      { src: w("tarea", "04"), title: "Photo gallery", desc: "Tagged with upload time and employee." },
      { src: w("tarea", "05"), title: "Client & vendor chat" },
      { src: w("tarea", "06"), title: "Create work order" },
      { src: w("tarea", "07"), title: "Manage vendors" },
    ],
    cover: w("tarea", "cover"),
    coverFit: "cover",
    accent: "#3b82f6",
    stage: "light",
  },
  {
    slug: "i-health",
    name: "I-Health",
    tagline: "A holistic system for healthcare professionals",
    industry: "Healthcare",
    platforms: ["Web app", "Cloud"],
    services: ["software", "erp-crm", "ai", "data", "cloud"],
    summary:
      "A hospital management system for doctors, patients, departments and appointments, with an AI consultant and data-driven insights.",
    intro:
      "I-Health is a comprehensive hospital management system designed to streamline healthcare operations, with modules for doctors, appointments, patients and departments.",
    challenge:
      "Hospitals run on disconnected schedules, paper histories and phone-based booking. I-Health needed to bring doctors, patients and departments into one secure, cloud-based system.",
    approach:
      "We built physician schedules and profiles, complete patient records and histories, department management, appointment booking with proactive scheduling that avoids conflicts, invoices and mail, an AI consultant with symptom selection and video calls, and real-time notifications.",
    features: [
      { title: "Doctors", desc: "Streamlined management of physician schedules and profiles." },
      { title: "Patients", desc: "Comprehensive records, history and care plans." },
      { title: "Appointments", desc: "Efficient booking, tracking and reminders with proactive scheduling." },
      { title: "AI consultant", desc: "Symptom selection and video consultation inside the system." },
      { title: "Security & compliance", desc: "Patient data encryption and ongoing monitoring." },
    ],
    screens: [
      { src: w("i-health", "01"), title: "Doctors' calendar" },
      { src: w("i-health", "02"), title: "AI consultant", desc: "Symptom picker and video consultation." },
      { src: w("i-health", "03"), title: "Statistics" },
      { src: w("i-health", "04"), title: "Patient history" },
      { src: w("i-health", "05"), title: "Doctor profile" },
      { src: w("i-health", "06"), title: "Appointments" },
      { src: w("i-health", "07"), title: "Departments" },
      { src: w("i-health", "08"), title: "Book an appointment" },
    ],
    cover: w("i-health", "cover"),
    coverFit: "cover",
    accent: "#5b8c6e",
    stage: "light",
  },
];

export const getWork = (slug: string) => work.find((c) => c.slug === slug);
export const industries = Array.from(new Set(work.map((c) => c.industry)));

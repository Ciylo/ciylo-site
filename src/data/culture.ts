/**
 * Life at Ciylo. Captions are lifted from Ciylo's own social posters
 * (Annual Tour 2026 Skardu series, Fun Day series, celebration posts).
 */
export type Moment = { src: string; caption: string; tag: string; tall?: boolean };

const l = (f: string) => `/images/life/${f}.webp`;
const o = (f: string) => `/images/office/${f}.webp`;
const lab = (f: string) => `/images/lab/${f}.webp`;

export const moments: Moment[] = [
  { src: l("skardu-meadow"), caption: "Higher mountains. Stronger bonds.", tag: "Annual Tour 2026 · Skardu", tall: true },
  { src: l("funday-pool"), caption: "Fun. Flow. Freedom.", tag: "Fun Day at Ciylo" },
  { src: l("skardu-dinner"), caption: "The best views are shared.", tag: "Annual Tour 2026 · Skardu", tall: true },
  { src: l("funday-snooker"), caption: "Stress left the chat.", tag: "Fun Day at Ciylo" },
  { src: l("cupcake"), caption: "Sweet surprise at work.", tag: "Studio life", tall: true },
  { src: l("skardu-crew"), caption: "Adventure begins beyond the office.", tag: "Annual Tour 2026 · Skardu" },
  { src: l("funday-swing"), caption: "Smiles in every frame.", tag: "Fun Day at Ciylo", tall: true },
  { src: l("skardu-sunset-jeep"), caption: "Every mile, a new memory.", tag: "Annual Tour 2026 · Skardu", tall: true },
  { src: l("funday-cricket"), caption: "Who owns the pitch?", tag: "Voltage Vipers vs The Bug Slayers" },
  { src: l("birthday-huzaifa"), caption: "Happy birthday, Huzaifa.", tag: "Celebrations", tall: true },
  { src: l("skardu-lake"), caption: "Lost in nature, found together.", tag: "Annual Tour 2026 · Skardu", tall: true },
  { src: l("funday-tabletennis"), caption: "Refresh. Recharge. Reconnect.", tag: "Fun Day at Ciylo" },
  { src: l("funday-bbq"), caption: "Good people, great times.", tag: "Fun Day at Ciylo", tall: true },
  { src: l("skardu-jeep"), caption: "Collecting moments, not just miles.", tag: "Annual Tour 2026 · Skardu", tall: true },
];

export const studio = [
  { src: o("studio"), caption: "The new Ciylo studio, Lahore", wide: true },
  { src: o("glass-room"), caption: "Glass pods for deep work" },
  { src: o("meeting"), caption: "Where kickoffs happen" },
  { src: o("ideas-wall"), caption: "Ideas without limits" },
  { src: o("beanbag"), caption: "Work from wherever thinking is easiest" },
  { src: o("corridor"), caption: "Opening week, balloons included", wide: true },
];

/** Lab grid: one photo per person (columns take items 0,2,4 and 1,3). */
export const labShots = [
  { src: o("hassan-desk"), caption: "Embedded workstation" },
  { src: lab("embedded-desk"), caption: "Firmware meets hardware" },
  { src: lab("pcb-probe"), caption: "Probing a fresh board" },
  { src: lab("soldering"), caption: "PCB rework on the ESD bench" },
  { src: o("kaif-desk"), caption: "Simulation and layout" },
];

export const recognitions = [
  { title: "Performer of the Month", desc: "Every month the CiyloCore recognises Ciylotrons for outstanding performance, exceptional teamwork and consistently exceeding expectations." },
  { title: "Annual Tour", desc: "Once a year the whole team leaves the screens behind: six days in Skardu in 2026, peaks, valleys and stories worth telling." },
  { title: "Fun Days & leagues", desc: "Farmhouse fun days, snooker and table tennis, and a cricket rivalry between Voltage Vipers and The Bug Slayers." },
];

export const departments = ["Hardware", "Firmware", "Software", "AI", "Design", "Delivery", "Growth"] as const;
export type Department = (typeof departments)[number];

/** Roles from Ciylo's recent hiring posts. Confirm they are still open (PROVIDE.md). */
export const openRoles: { title: string; team: Department; experience: string; desc: string }[] = [
  {
    title: "Embedded Systems Engineer",
    team: "Firmware",
    experience: "1–3 years",
    desc: "Write production firmware for STM32, ESP32 and nRF, bring up new boards and work side by side with our PCB and app engineers.",
  },
  {
    title: "Hardware Engineer / PCB Designer",
    team: "Hardware",
    experience: "2–3 years",
    desc: "Own schematics and multi-layer layouts from concept to first article, and get your boards into real products.",
  },
  {
    title: "SEO Expert",
    team: "Growth",
    experience: "2–4 years",
    desc: "Grow Ciylo's visibility across search and AI answer engines, from technical SEO to content strategy.",
  },
];

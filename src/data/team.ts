/**
 * The CiyloCore (leadership) and the Ciylotrons (the team).
 * Names and roles come from Ciylo's welcome / performer-of-the-month posts.
 * Portraits: /public/images/team/<slug>.webp (background removed, cropped to 1:1.3).
 */
export type Discipline = "Hardware" | "Software" | "AI" | "Design" | "Growth";

export type Leader = {
  name: string;
  role: string;
  short: string;
  bio: string;
  photo: string;
  linkedin?: string;
  email?: string;
};

export type Ciylotron = {
  slug: string;
  name: string;
  role: string;
  discipline: Discipline;
  /** Recognition from Ciylo's performer / employee of the month posts */
  honours?: string[];
  /** "cutout" (default): background removed, sits on the gradient. "photo": regular photo, fills the card. */
  portrait?: "cutout" | "photo";
  /** Image file name in /public/images/team (without .webp) when it differs from the slug */
  image?: string;
};

export const leadership: Leader[] = [
  {
    name: "Noraiz Azam",
    role: "Chief Executive Officer",
    short: "CEO",
    bio: "Noraiz leads Ciylo’s strategy and technology direction, shaping secure, AI-native systems for sensitive domains like healthcare, and building the team and culture that let Ciylotrons take ownership of what they make.",
    photo: "/images/leadership/noraiz.webp",
    linkedin: "https://www.linkedin.com/in/noraiz-azam/",
    email: "noraiz@ciylo.com",
  },
  {
    name: "Tosin Omolewu",
    role: "Chief Product Officer",
    short: "CPO",
    bio: "A Fortune 10 product executive with more than two decades driving large-scale platform transformation across Amazon, Microsoft, Comcast and healthcare, Tosin brings enterprise-grade product strategy and operational discipline to every Ciylo build.",
    photo: "/images/leadership/tosin.webp",
    linkedin: "https://www.linkedin.com/in/tosin-omolewu/",
  },
];

export const ciylotrons: Ciylotron[] = [
  { slug: "hassan-ijaz", name: "Hassan Ijaz", role: "Embedded Systems Engineer", discipline: "Hardware", honours: ["Performer of the Month · Sep"] },
  { slug: "suleman-zafar", name: "Suleman Zafar", role: "PCB Engineer", discipline: "Hardware" },
  { slug: "taimoor-hassan", name: "Taimoor Hassan", role: "Hardware Design Engineer", discipline: "Hardware" },
  { slug: "muhammad-kaif", name: "Muhammad Kaif", role: "Embedded Systems Engineer", discipline: "Hardware", image: "muhammad-kaif-portrait-v2" },
  { slug: "asif-shahzad", name: "Asif Shahzad", role: "AI Engineer", discipline: "AI", honours: ["Performer of the Month · Aug"] },
  { slug: "muhammad-faizan", name: "Muhammad Faizan", role: "AI Engineer", discipline: "AI", honours: ["Performer of the Month · Aug"] },
  { slug: "asad-khalid", name: "Asad Khalid", role: "AI Developer", discipline: "AI", honours: ["Performer of the Month · Jun 2026"] },
  { slug: "hamza-tanveer", name: "Hamza Tanveer", role: "Software Team Lead", discipline: "Software", image: "hamza-tanveer-cutout" },
  { slug: "muhammad-abdullah", name: "Muhammad Abdullah", role: "Full Stack Developer", discipline: "Software", honours: ["Performer of the Month · Oct", "Employee of the Month · Mar 2025"] },
  { slug: "huzaifa", name: "Huzaifa", role: "React Native Developer", discipline: "Software", honours: ["Performer of the Month · Jul", "Employee of the Month · Oct 2025"] },
  { slug: "ashir-mehmood", name: "Ashir Mehmood", role: "Web Developer", discipline: "Software", honours: ["Performer of the Month · Sep", "Employee of the Month · Feb 2025"] },
  { slug: "zaid-tahir", name: "Zaid Tahir", role: "MERN Stack Developer", discipline: "Software", honours: ["Employee of the Month · Dec 2025"] },
  { slug: "mohsin-khan", name: "Mohsin Khan", role: "Software Engineer", discipline: "Software", honours: ["Employee of the Month · Jan 2026"] },
  { slug: "muhammad-ahmad", name: "Muhammad Ahmad", role: "MERN Stack Developer", discipline: "Software" },
  { slug: "abubakar-ahmed", name: "Abubakar Ahmed", role: "Full Stack Software Engineer", discipline: "Software", honours: ["Performer of the Month · Apr 2025"] },
  { slug: "raheel-niaz", name: "Raheel Niaz", role: "QA Software Engineer", discipline: "Software", honours: ["Performer of the Month · Apr 2025"] },
  { slug: "ahsan-ghurki", name: "Ahsan Ghurki", role: "UI/UX Designer", discipline: "Design" },
  { slug: "mubeen-nadeem", name: "Mubeen Nadeem", role: "UI/UX Designer", discipline: "Design" },
  { slug: "abuzar", name: "Abuzar", role: "Project Manager", discipline: "Growth" },
  { slug: "danish", name: "Danish", role: "Business Developer", discipline: "Growth" },
  { slug: "ahmad-shakeel", name: "Ahmad Shakeel", role: "Senior SEO & GEO Specialist", discipline: "Growth" },
];

export const disciplines: Discipline[] = ["Hardware", "Software", "AI", "Design", "Growth"];

/** What a Ciylotron is: used on About and Careers. */
export const ciylotronTraits = [
  {
    title: "Owns a domain",
    desc: "Every Ciylotron is the go-to person for something, whether that's PCB layout, React Native or SEO, and is trusted to make the calls in it.",
  },
  {
    title: "Thinks beyond the role",
    desc: "Firmware engineers sketch interfaces, designers read datasheets, developers sit in on client calls. Range is how one team ships the device, the data and the app.",
  },
  {
    title: "Leads from any seat",
    desc: "Ideas win on merit, not title. Ciylotrons pitch, prototype and lead their own initiatives, and the best ones become how we work.",
  },
  {
    title: "Shows up for the team",
    desc: "Bugs get squashed together, wins get celebrated together, and nobody climbs a mountain alone, literally, as the Skardu crew can tell you.",
  },
  {
    title: "Represents with pride",
    desc: "Ciylotrons present their work, their company and Pakistan on stages, at competitions and in front of international clients.",
  },
  {
    title: "Makes a difference",
    desc: "From a nurse documenting a visit in minutes to a patient refilling a prescription from bed, we care about the change our work makes.",
  },
];

import { site, clientCountries } from "@/data/site";
import { services, serviceGroups } from "@/data/services";
import { solutions } from "@/data/solutions";
import { work } from "@/data/work";
import { industryPages } from "@/data/industries";
import { leadership } from "@/data/team";

/** /llms.txt: a plain-text map of the site for AI assistants, generated from src/data. */

export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const s = site.stats.map((x) => `${x.value}${x.suffix}`);
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} (${site.legalName}) is an engineering company in ${site.address.city}, Pakistan that designs circuit boards, writes firmware, builds IoT and AI systems, and develops the web, mobile and cloud software on top, delivered by one team.`,
    "",
    `- Headquarters: ${site.address.street}, ${site.address.city} ${site.address.postalCode}, ${site.address.country}`,
    `- Team: ${site.teamSize} Ciylotrons across two divisions, Ciylo Software Studio and Ciylo Hardware Lab`,
    `- Leadership: ${leadership.map((l) => `${l.name} (${l.role})`).join(", ")}`,
    `- Clients in: ${clientCountries.map((c) => c.name).join(", ")}`,
    `- In ${s[0]} years Ciylo has shipped ${s[1]} products for ${s[2]} clients across ${s[3]} industries`,
    `- Contact: ${site.email}, ${site.phone} (reply within ${site.replyTime})`,
    "",
    "## Services",
    ...serviceGroups.flatMap((g) => [
      `### ${g.label}`,
      ...services.filter((x) => x.group === g.id).map((x) => `- [${x.name}](${u(`/services#${x.id}`)}): ${x.short}`),
    ]),
    "",
    "## Solutions",
    ...solutions.map((x) => `- [${x.name}](${u(`/solutions/${x.slug}`)}): ${x.short}`),
    "",
    "## Case studies",
    ...work.map((c) => `- [${c.name}](${u(`/work/${c.slug}`)}): ${c.summary}`),
    "",
    "## Industries",
    ...industryPages.map((i) => `- [${i.name}](${u(`/industries/${i.slug}`)}): ${i.detail}`),
    "",
    "## Company",
    `- [About](${u("/about")})`,
    `- [Divisions](${u("/about/divisions")})`,
    `- [Leadership](${u("/about/leadership")})`,
    `- [Teams](${u("/about/teams")})`,
    `- [Careers](${u("/careers")})`,
    `- [Contact](${u("/contact")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

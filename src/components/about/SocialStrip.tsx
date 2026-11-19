import { site } from "@/data/site";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const blurbs: Record<string, string> = {
  LinkedIn: "Company news, launches and open roles",
  Instagram: "Studio life, tours and team moments",
  Facebook: "Updates from the CiyloCore",
  X: "Engineering notes and quick takes",
};

export function SocialStrip() {
  return (
    <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {site.socials.map((s) => (
        <RevealItem key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full items-start gap-4 rounded-[20px] border border-ink-150 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500 hover:shadow-[0_20px_40px_-25px_rgb(0_90_75/0.4)]"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-900 text-white transition-colors group-hover:bg-teal-500 group-hover:text-ink-900">
              <SocialIcon name={s.label} className="size-[18px]" />
            </span>
            <span className="flex flex-col gap-1">
              <strong className="flex items-center gap-1.5">
                {s.label}
                <span aria-hidden className="text-teal-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </strong>
              <span className="text-sm text-ink-500">{blurbs[s.label]}</span>
              <span className="font-mono text-xs text-ink-400">@{new URL(s.href).pathname.split("/").filter(Boolean).pop()}</span>
            </span>
          </a>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

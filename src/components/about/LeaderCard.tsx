import { Img } from "@/components/ui/Img";
import { SocialIcon } from "@/components/layout/SocialIcon";
import type { Leader } from "@/data/team";

export function LeaderCard({ l }: { l: Leader }) {
  return (
    <article className="group grid overflow-hidden rounded-[28px] border border-ink-100 bg-white sm:grid-cols-[5fr_6fr]">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-100 sm:aspect-auto sm:min-h-[380px]">
        <Img
          src={l.photo}
          alt={`${l.name}, ${l.role} of Ciylo`}
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-ink-900 px-3 py-1 font-semibold text-xs text-teal-400">{l.short}</span>
      </div>
      <div className="flex flex-col gap-4 p-7">
        <p className="kicker text-teal-700">{l.role}</p>
        <h3 className="text-[28px] leading-tight font-extrabold tracking-[-0.03em]">{l.name}</h3>
        <p className="text-[15px] leading-relaxed text-ink-600">{l.bio}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {l.linkedin && (
            <a
              href={l.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-750"
            >
              <SocialIcon name="LinkedIn" className="size-3.5" /> Connect
            </a>
          )}
          {l.email && (
            <a
              href={`mailto:${l.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold hover:border-ink-900"
            >
              Email
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

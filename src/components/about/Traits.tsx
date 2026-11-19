import { ciylotronTraits } from "@/data/team";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";

const glyphs = ["◎", "⟡", "▲", "◈", "✦", "⬡"];

/** "What makes a Ciylotron" grid. */
export function Traits({ dark }: { dark?: boolean }) {
  return (
    <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ciylotronTraits.map((t, i) => (
        <RevealItem key={t.title} className="h-full">
          <Spotlight
            className={
              dark
                ? "h-full rounded-[22px] border border-ink-700 bg-ink-850 p-7 text-white"
                : "h-full rounded-[22px] border border-ink-100 bg-white p-7"
            }
          >
            <div className="flex h-full flex-col gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-teal-500 text-lg text-ink-900" aria-hidden>
                {glyphs[i]}
              </span>
              <strong className="text-xl tracking-[-0.01em]">{t.title}</strong>
              <p className={dark ? "text-[15px] leading-relaxed text-ink-200" : "text-[15px] leading-relaxed text-ink-600"}>{t.desc}</p>
            </div>
          </Spotlight>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

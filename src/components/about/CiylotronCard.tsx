import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";
import type { Ciylotron } from "@/data/team";

const tint: Record<Ciylotron["discipline"], string> = {
  Hardware: "from-teal-200 to-teal-50",
  Software: "from-[#cfe3ff] to-[#f1f6ff]",
  AI: "from-[#ddd6fe] to-[#f5f3ff]",
  Design: "from-[#fde2cf] to-[#fff6ef]",
  Growth: "from-[#d9f99d] to-[#f7fee7]",
};

/** Portrait card: background-removed cutout on a soft discipline gradient. */
export function CiylotronCard({ p, className, compact }: { p: Ciylotron; className?: string; compact?: boolean }) {
  return (
    <figure className={cn("group relative overflow-hidden rounded-[22px] bg-ink-75", className)}>
      <div className={cn("relative aspect-[4/5] overflow-hidden bg-gradient-to-b", tint[p.discipline])}>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(17 16 19 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(17 16 19 / 0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "linear-gradient(to top, #000, transparent)",
          }}
        />
        <Img
          src={`/images/team/${p.image ?? p.slug}.webp`}
          alt={`${p.name}, ${p.role} at Ciylo`}
          sizes={compact ? "220px" : "(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"}
          className={cn(
            "absolute transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]",
            p.portrait === "photo"
              ? "inset-0 h-full w-full object-cover object-top"
              : "inset-x-0 bottom-0 mx-auto h-[92%] w-auto max-w-none object-contain object-bottom",
          )}
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/80 px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink-900 uppercase backdrop-blur">
          {p.discipline}
        </span>
        {p.honours && p.honours.length > 0 && (
          <span
            title={p.honours.join(" · ")}
            className="absolute top-3 right-3 grid size-7 place-items-center rounded-full bg-ink-900 text-[13px] text-teal-400"
            aria-label={p.honours.join(", ")}
          >
            ★
          </span>
        )}
      </div>
      <figcaption className={cn("flex flex-col gap-0.5", compact ? "px-3.5 py-3" : "px-4 py-3.5")}>
        <span className={cn("font-bold tracking-[-0.01em]", compact ? "text-[15px]" : "text-base")}>{p.name}</span>
        <span className="text-[13px] text-ink-500">{p.role}</span>
      </figcaption>
    </figure>
  );
}

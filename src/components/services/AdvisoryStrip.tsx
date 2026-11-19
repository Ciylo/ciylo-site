import Link from "next/link";
import { getService } from "@/data/services";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { contactHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

/* Distinct line icons (24px grid, currentColor) */
const icons: Record<string, React.ReactNode> = {
  "product-market-fit": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path d="M21 3l-6.5 6.5" />
    </svg>
  ),
  "product-rescue": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
    </svg>
  ),
  "due-diligence": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-6">
      <path d="M9 3h6l1 2h3v16H5V5h3l1-2z" />
      <path d="M9 12l2 2 4-4" />
      <path d="M9 17h6" />
    </svg>
  ),
};

const ids = ["product-market-fit", "product-rescue", "due-diligence"];
const offsets = ["lg:mt-0", "lg:mt-10", "lg:mt-4"];

/** Three advisory offers with staggered heights, shown before the accordion. */
export function AdvisoryStrip() {
  return (
    <RevealGroup className="grid items-start gap-4 lg:grid-cols-3">
      {ids.map((id, i) => {
        const s = getService(id)!;
        return (
          <RevealItem key={id} className={offsets[i]}>
            <Spotlight
              className={cn(
                "rounded-[24px] border p-7",
                i === 1 ? "border-ink-900 bg-ink-900 text-white" : "border-ink-150 bg-white",
              )}
              color={i === 1 ? "rgb(0 201 167 / 0.22)" : "rgb(0 201 167 / 0.14)"}
            >
              <div className={cn("flex flex-col gap-4", i === 1 ? "min-h-[340px]" : i === 0 ? "min-h-[300px]" : "min-h-[320px]")}>
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-2xl",
                    i === 1 ? "bg-teal-500 text-ink-900" : "bg-teal-50 text-teal-800",
                  )}
                >
                  {icons[id]}
                </span>
                <p className={cn("kicker", i === 1 ? "text-teal-400" : "text-teal-700")}>Advisory · {String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-[22px] leading-tight font-bold tracking-[-0.02em]">{s.name}</h3>
                <p className={cn("text-[15px] leading-relaxed", i === 1 ? "text-ink-200" : "text-ink-600")}>{s.short}</p>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={contactHref({ inquiry: "advisory", service: id })}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      i === 1 ? "bg-teal-500 text-ink-900 hover:bg-teal-400" : "bg-ink-900 text-white hover:bg-ink-750",
                    )}
                  >
                    Get this service
                  </Link>
                  <a href={`#${id}`} className={cn("text-sm font-semibold hover:underline", i === 1 ? "text-teal-400" : "text-teal-700")}>
                    Details ↓
                  </a>
                </div>
              </div>
            </Spotlight>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

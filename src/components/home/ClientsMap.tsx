import { clientCountries } from "@/data/site";
import { cn } from "@/lib/cn";
import { Globe } from "./Globe";

/** "Clients in": interactive 3D globe with arcs from Lahore, plus the country list. */
export function ClientsMap({ dark = true }: { dark?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <Globe className="max-w-[560px]" />
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className={cn("kicker mr-1", dark ? "text-ink-300" : "text-ink-500")}>Clients in</span>
        {clientCountries.map((c) => (
          <span
            key={c.code}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors",
              dark ? "border-ink-600 bg-ink-850 text-white hover:border-teal-500" : "border-ink-150 bg-white text-ink-900 hover:border-teal-500",
            )}
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-teal-500 align-middle" />
            {c.name}
          </span>
        ))}
      </div>
      <p className={cn("text-xs", dark ? "text-ink-400" : "text-ink-500")}>Drag the globe to explore</p>
    </div>
  );
}

import Link from "next/link";
import { getService } from "@/data/services";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { contactHref, type ContactDefaults } from "@/lib/contact";

/** Grid of service cards (by id) with "View" and "Get this service" actions. */
export function ServiceCards({ ids, context = {} }: { ids: string[]; context?: ContactDefaults }) {
  const list = ids.map(getService).filter((s) => s !== undefined);
  return (
    <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <RevealItem key={s.id} className="h-full">
          <Spotlight className="h-full rounded-[22px] border border-ink-100 bg-white">
            <div className="flex h-full flex-col gap-3 p-6">
              <p className="kicker text-teal-700">{s.group === "Consulting" ? "Strategy" : s.group}</p>
              <strong className="text-lg tracking-[-0.01em]">{s.name}</strong>
              <p className="text-sm leading-relaxed text-ink-600">{s.short}</p>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href={contactHref({ ...context, service: s.id })}
                  className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-750"
                >
                  Get this service
                </Link>
                <Link href={`/services#${s.id}`} className="text-sm font-semibold text-teal-700 hover:underline">
                  View →
                </Link>
              </div>
            </div>
          </Spotlight>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

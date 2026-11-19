import { studio } from "@/data/culture";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** Office photo grid: one wide hero shot then a mosaic. */
export function Studio() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {studio.map((s, i) => (
        <Reveal
          key={s.src}
          delay={(i % 4) * 0.06}
          className={cn(i === 0 && "sm:col-span-2 lg:row-span-2", i === studio.length - 1 && "sm:col-span-2 lg:col-span-4")}
        >
          <figure className="group relative h-full overflow-hidden rounded-[22px] bg-ink-100">
            <Img
              src={s.src}
              alt={s.caption}
              sizes={i === 0 || i === studio.length - 1 ? "(min-width: 1024px) 1140px, 100vw" : "(min-width: 1024px) 290px, 50vw"}
              className={cn(
                "h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
                i === 0 ? "aspect-[4/3] lg:aspect-auto" : i === studio.length - 1 ? "aspect-[16/9] lg:aspect-[21/8]" : "aspect-[4/3]",
              )}
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[13px] font-medium backdrop-blur">
              {s.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

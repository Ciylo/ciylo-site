import { testimonials } from "@/data/testimonials";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { Img } from "@/components/ui/Img";
import { Tilt } from "@/components/ui/Tilt";

function Stars({ n }: { n: number }) {
  return (
    <span
      className="flex gap-0.5 text-teal-500"
      role="img"
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-[18px]"
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

/** Neutral person silhouette used until real client photos are supplied. */
function AvatarPlaceholder() {
  return (
    <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-b from-teal-100 to-teal-50 ring-2 ring-white">
      <svg
        viewBox="0 0 48 48"
        className="size-12 translate-y-1.5 text-teal-700/70"
        fill="currentColor"
        aria-hidden
      >
        <circle cx="24" cy="18" r="9" />
        <path d="M6 48c0-10 8-17 18-17s18 7 18 17z" />
      </svg>
    </span>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ink-50 py-24">
      <div className="wrap flex flex-col gap-10">
        <div className="flex max-w-[680px] flex-col gap-3">
          <p className="kicker text-teal-700">What clients say</p>
          <SplitHeading
            text="Trusted by the teams we build with."
            className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
          />
        </div>
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealItem key={t.name} className={i === 1 ? "md:mt-8" : ""}>
              <Tilt className="h-full rounded-[24px]" max={4}>
                <Spotlight className="h-full rounded-[24px] border border-ink-100 bg-white shadow-[0_20px_50px_-35px_rgb(17_16_19/0.35)]">
                  <figure className="flex h-full flex-col gap-5 p-7">
                    <Stars n={t.rating} />
                    <blockquote className="text-[17px] leading-relaxed font-medium tracking-[-0.01em] text-ink-800">
                      <span
                        aria-hidden
                        className="mr-1 font-serif text-3xl leading-none text-teal-500"
                      >
                        &ldquo;
                      </span>
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-auto flex items-center gap-3 border-t border-ink-100 pt-5">
                      {t.photo ? (
                        <Img
                          src={t.photo}
                          alt=""
                          sizes="48px"
                          className="size-12 rounded-full object-cover"
                        />
                      ) : (
                        <AvatarPlaceholder />
                      )}
                      <span className="flex flex-col">
                        <strong className="text-[15px]">{t.name}</strong>
                        <span className="text-sm text-ink-500">
                          {t.role ? `${t.role}, ` : ""}
                          {t.company}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Spotlight>
              </Tilt>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

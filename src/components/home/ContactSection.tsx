import { ContactForm } from "@/components/ContactForm";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

const steps = ["A short call to understand the idea", "A written scope with options and costs", "A kickoff with the Ciylotrons who'll build it"];

export function ContactSection({ id = "contact", heading = "Tell us what you're building." }: { id?: string; heading?: string }) {
  return (
    <section id={id} className="relative overflow-hidden bg-teal-50 py-24">
      <div aria-hidden className="grid-bg-light absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div className="wrap relative grid gap-12 lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col gap-6">
          <SplitHeading
            text={heading}
            className="text-[clamp(34px,4.4vw,50px)] leading-[1.04] font-extrabold tracking-[-0.035em]"
          />
          <p className="text-base leading-relaxed text-ink-600">
            A board, a band, an app or all three. We reply within {site.replyTime}.
          </p>
          <ol className="flex flex-col gap-3.5">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-[15px]">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink-900 text-[13px] font-bold text-teal-500">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-1.5 pt-2 text-[15px]">
            <a href={`mailto:${site.email}`} className="font-semibold text-teal-800 hover:underline">
              {site.email}
            </a>
            <a href={site.phoneHref} className="text-teal-800 hover:underline">
              {site.phone}
            </a>
            <p className="text-ink-500">
              {site.address.street}, {site.address.city} {site.address.postalCode}
            </p>
          </div>
        </div>
        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Img } from "@/components/ui/Img";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { labShots } from "@/data/culture";

const stack = ["STM32", "ESP32", "Nordic nRF", "FreeRTOS", "Zephyr", "Verilog", "Xilinx FPGA", "Raspberry Pi", "Jetson", "RK3588", "BLE", "LoRa", "MQTT", "Modbus", "TFLite Micro", "Edge Impulse"];

/** Hardware lab: parallax photo columns + capability chips. */
export function Lab() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const down = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 100]);

  const colA = labShots.filter((_, i) => i % 2 === 0);
  const colB = labShots.filter((_, i) => i % 2 === 1);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink-900 py-24 text-white">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-60" />
      <div className="wrap grid items-center gap-14 lg:grid-cols-[5fr_6fr]">
        <div className="flex flex-col gap-6">
          <p className="kicker text-teal-500">Inside the Ciylo lab</p>
          <SplitHeading
            text="From the ESD bench to the cloud dashboard."
            accent={["ESD", "bench"]}
            className="text-[clamp(32px,4.4vw,52px)] leading-[1.05] font-extrabold tracking-[-0.035em]"
          />
          <p className="max-w-[520px] text-[17px] leading-relaxed text-ink-200">
            Hardware has been part of Ciylo for years, and it is where we love getting our hands dirty. Our engineers design schematics, lay out
            multi-layer boards, bring up first articles on the bench and write the firmware that makes them sing, then hand
            the data straight to the software Ciylotrons sitting a few desks away.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Hardware stack">
            {stack.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="rounded-full border border-ink-600 bg-ink-850 px-3 py-1.5 font-mono text-xs text-ink-200 transition-colors hover:border-teal-500 hover:text-teal-400"
              >
                {s}
              </motion.li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/services#hardware" arrow>
              Hardware services
            </Button>
            <Button href="/contact" variant="ghost-dark">
              Book a lab visit
            </Button>
          </div>
        </div>

        <div className="grid h-[560px] grid-cols-2 gap-4 overflow-hidden rounded-[28px] sm:h-[640px]">
          <motion.div style={{ y: up }} className="flex flex-col gap-4">
            {colA.map((s) => (
              <figure key={s.src} className="group relative overflow-hidden rounded-[20px]">
                <Img src={s.src} alt={s.caption} sizes="(min-width: 1024px) 320px, 50vw" className="aspect-[3/4] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-ink-900/70 px-3 py-1.5 text-[12px] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </motion.div>
          <motion.div style={{ y: down }} className="-mt-24 flex flex-col gap-4">
            {colB.map((s) => (
              <figure key={s.src} className="group relative overflow-hidden rounded-[20px]">
                <Img src={s.src} alt={s.caption} sizes="(min-width: 1024px) 320px, 50vw" className="aspect-[3/4] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-ink-900/70 px-3 py-1.5 text-[12px] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

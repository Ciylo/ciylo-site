"use client";

import { useEffect, useRef, useState } from "react";
import { clientCountries } from "@/data/site";
import { cn } from "@/lib/cn";

const HQ = { name: "Lahore HQ", lat: 31.52, lng: 74.36 };
const D2R = Math.PI / 180;

type V3 = [number, number, number];
const toV = (lat: number, lng: number): V3 => {
  const la = lat * D2R;
  const ln = lng * D2R;
  return [Math.cos(la) * Math.sin(ln), Math.sin(la), Math.cos(la) * Math.cos(ln)];
};

/** Great-circle interpolation between two unit vectors */
function slerp(a: V3, b: V3, t: number): V3 {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  if (om < 1e-4) return a;
  const s = Math.sin(om);
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

/**
 * Interactive 3D dot globe (canvas 2D, orthographic). Drag to spin, with inertia.
 * Land dots load lazily from /data/globe.json; animation pauses off-screen and
 * the globe renders a single still frame for reduced-motion users.
 */
export function Globe({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pts: Float32Array | null = null;
    let raf = 0;
    let visible = false;
    let size = 0;
    let dpr = 1;
    // View: start looking at the Middle East so the US, Europe, Africa and Pakistan all show
    let rotY = -38 * D2R;
    let rotX = 18 * D2R;
    let vel = reduced ? 0 : 0.0016;
    const auto = reduced ? 0 : 0.0016;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let t0 = performance.now();
    const ff = getComputedStyle(cv).fontFamily;

    const hq = toV(HQ.lat, HQ.lng);
    const targets = clientCountries.map((c) => ({ name: c.name, v: toV(c.lat, c.lng) }));
    const arcs = targets.map((c, i) => {
      const N = 48;
      const dot = hq[0] * c.v[0] + hq[1] * c.v[1] + hq[2] * c.v[2];
      const lift = 0.08 + 0.32 * (Math.acos(dot) / Math.PI);
      const line: V3[] = [];
      for (let k = 0; k <= N; k++) {
        const t = k / N;
        const p = slerp(hq, c.v, t);
        const h = 1 + lift * Math.sin(Math.PI * t);
        line.push([p[0] * h, p[1] * h, p[2] * h]);
      }
      return { line, offset: i * 0.17 };
    });

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      size = el.clientWidth;
      cv.width = Math.round(size * dpr);
      cv.height = Math.round(size * dpr);
      cv.style.width = `${size}px`;
      cv.style.height = `${size}px`;
      draw(performance.now());
    };

    // Rotate around Y (spin) then X (tilt)
    const project = (v: V3, R: number, c: number) => {
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const x1 = v[0] * cy + v[2] * sy;
      const z1 = -v[0] * sy + v[2] * cy;
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const y2 = v[1] * cx - z1 * sx;
      const z2 = v[1] * sx + z1 * cx;
      return { x: c + x1 * R, y: c - y2 * R, z: z2, r2: x1 * x1 + y2 * y2 };
    };

    function draw(now: number) {
      if (!ctx) return;
      const S = size * dpr;
      const c = S / 2;
      const R = S * 0.4;
      ctx.clearRect(0, 0, S, S);

      // Atmosphere
      const glow = ctx.createRadialGradient(c, c, R * 0.9, c, c, R * 1.25);
      glow.addColorStop(0, "rgba(0,201,167,0.16)");
      glow.addColorStop(1, "rgba(0,201,167,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(c, c, R * 1.25, 0, Math.PI * 2);
      ctx.fill();
      // Sphere body
      const body = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      body.addColorStop(0, "#1e1d23");
      body.addColorStop(1, "#0b0a0d");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,201,167,0.25)";
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();

      // Land dots
      if (pts) {
        const d = 1.6 * dpr;
        for (let i = 0; i < pts.length; i += 3) {
          const p = project([pts[i], pts[i + 1], pts[i + 2]], R, c);
          if (p.z < -0.05) continue;
          const a = 0.18 + 0.7 * Math.max(0, p.z);
          ctx.fillStyle = `rgba(201,201,209,${a.toFixed(2)})`;
          ctx.fillRect(p.x - d / 2, p.y - d / 2, d, d);
        }
      }

      // Arcs with a travelling comet
      const time = (now - t0) / 1000;
      ctx.lineCap = "round";
      for (const arc of arcs) {
        const P = arc.line.map((v) => project(v, R, c));
        const shown = (p: { z: number; r2: number }) => p.z > 0 || p.r2 > 1;
        ctx.strokeStyle = "rgba(0,201,167,0.28)";
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        let pen = false;
        for (const p of P) {
          if (!shown(p)) {
            pen = false;
            continue;
          }
          if (pen) ctx.lineTo(p.x, p.y);
          else ctx.moveTo(p.x, p.y);
          pen = true;
        }
        ctx.stroke();
        const head = ((time * 0.35 + arc.offset) % 1.3) / 1.0;
        if (head <= 1.15) {
          const n = P.length - 1;
          const h = Math.min(n, Math.floor(head * n));
          const tail = Math.max(0, h - 10);
          for (let k = tail; k < h; k++) {
            const a = P[k];
            const b = P[k + 1];
            if (!shown(a) || !shown(b)) continue;
            ctx.strokeStyle = `rgba(87,217,191,${((k - tail) / 10).toFixed(2)})`;
            ctx.lineWidth = 2.2 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Pins + labels
      ctx.font = `600 ${11 * dpr}px ${ff}`;
      ctx.textAlign = "center";
      // Simple label collision avoidance: try above, below, right, left of the pin
      const placed: [number, number, number, number][] = [];
      const hit = (r: [number, number, number, number]) =>
        placed.some((q) => r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1]);
      for (const t of targets) {
        const p = project(t.v, R, c);
        if (p.z <= 0) continue;
        const pulse = (time * 0.9 + t.v[0]) % 1;
        ctx.strokeStyle = `rgba(0,201,167,${(0.6 * (1 - pulse)).toFixed(2)})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (3 + pulse * 9) * dpr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#00c9a7";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2 * dpr, 0, Math.PI * 2);
        ctx.fill();
        if (p.z > 0.25) {
          const w = ctx.measureText(t.name).width;
          const lh = 12 * dpr;
          const g = 8 * dpr;
          const spots: [number, number][] = [
            [p.x, p.y - g],
            [p.x, p.y + g + lh * 0.8],
            [p.x + g + w / 2, p.y + lh * 0.35],
            [p.x - g - w / 2, p.y + lh * 0.35],
          ];
          for (const [lx, ly] of spots) {
            const r: [number, number, number, number] = [lx - w / 2 - 2, ly - lh, lx + w / 2 + 2, ly + 2];
            if (hit(r)) continue;
            placed.push(r);
            ctx.fillStyle = `rgba(255,255,255,${Math.min(1, p.z * 1.4).toFixed(2)})`;
            ctx.fillText(t.name, lx, ly);
            break;
          }
        }
      }
      const h = project(hq, R, c);
      if (h.z > 0) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(h.x, h.y, 4.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,201,167,0.5)";
        ctx.lineWidth = 4 * dpr;
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.font = `700 ${12 * dpr}px ${ff}`;
        ctx.fillText(HQ.name, h.x, h.y + 20 * dpr);
      }
    }

    const loop = (now: number) => {
      if (!dragging) {
        rotY += vel;
        vel += (auto - vel) * 0.02; // ease back to the idle spin after a fling
      }
      draw(now);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) draw(performance.now());
      else raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !pts) {
          fetch("/data/globe.json")
            .then((r) => r.json())
            .then((flat: number[]) => {
              const out = new Float32Array((flat.length / 2) * 3);
              for (let i = 0, j = 0; i < flat.length; i += 2, j += 3) {
                const v = toV(flat[i], flat[i + 1]);
                out[j] = v[0];
                out[j + 1] = v[1];
                out[j + 2] = v[2];
              }
              pts = out;
              setReady(true);
              t0 = performance.now();
              start();
            })
            .catch(() => setReady(true));
        }
        if (visible) start();
        else cancelAnimationFrame(raf);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = 0;
      cv.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.006;
      rotX = Math.max(-0.9, Math.min(0.9, rotX + dy * 0.004));
      vel = dx * 0.006;
      if (reduced) draw(performance.now());
    };
    const up = () => {
      dragging = false;
    };
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div ref={wrap} className={cn("relative aspect-square w-full", className)}>
      {!ready && (
        <div aria-hidden className="absolute inset-[10%] animate-pulse rounded-full bg-gradient-to-br from-ink-800 to-ink-900 ring-1 ring-teal-500/20" />
      )}
      <canvas
        ref={canvas}
        role="img"
        aria-label={`Globe showing Ciylo's Lahore headquarters connected to clients in ${clientCountries.map((c) => c.name).join(", ")}. Drag to rotate.`}
        className={cn("relative cursor-grab touch-pan-y active:cursor-grabbing transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
}

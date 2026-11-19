import { layerColor, type Diagram } from "@/data/diagrams";
import { DiagramIcon } from "./icons";
import { cn } from "@/lib/cn";

/**
 * Static, server-rendered miniature of a FlowDiagram for cards.
 * Packets drift along the links (CSS/SMIL only, no JS); paused for reduced motion via CSS.
 */
export function DiagramThumb({
  diagram,
  className,
}: {
  diagram: Diagram;
  className?: string;
}) {
  const H = 62;
  const W = diagram.cols * 100;
  const VH = diagram.rows * H;
  const pos = new Map(
    diagram.nodes.map((n) => [
      n.id,
      { x: (n.d[0] + 0.5) * 100, y: (n.d[1] + 0.5) * H },
    ]),
  );
  const nw = 56;
  const nh = 40;

  return (
    <svg
      viewBox={`-10 -10 ${W + 20} ${VH + 20}`}
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      {diagram.edges.map(([a, b], i) => {
        const s = pos.get(a)!;
        const t = pos.get(b)!;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const d =
          Math.abs(dx) >= Math.abs(dy)
            ? `M${s.x} ${s.y} C${s.x + dx / 2} ${s.y} ${t.x - dx / 2} ${t.y} ${t.x} ${t.y}`
            : `M${s.x} ${s.y} C${s.x} ${s.y + dy / 2} ${t.x} ${t.y - dy / 2} ${t.x} ${t.y}`;
        return (
          <g key={`${a}-${b}`}>
            <path d={d} fill="none" stroke="#3a3942" strokeWidth={1.6} />
            <path
              d={d}
              fill="none"
              stroke="#00c9a7"
              strokeWidth={1.6}
              strokeDasharray="5 9"
              className="thumb-flow"
              opacity={0.7}
            />
            <circle r={3.2} fill="#00c9a7" className="motion-reduce:hidden">
              <animateMotion
                dur={`${2.4 + (i % 3) * 0.5}s`}
                begin={`${(i * 0.4) % 2}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          </g>
        );
      })}
      {diagram.nodes.map((n) => {
        const p = pos.get(n.id)!;
        const c = layerColor[n.layer];
        return (
          <g
            key={n.id}
            transform={`translate(${p.x - nw / 2} ${p.y - nh / 2})`}
          >
            <rect
              width={nw}
              height={nh}
              rx={11}
              fill="#16151a"
              stroke="#2e2d35"
              strokeWidth={1.4}
            />
            <rect width={nw} height={nh} rx={11} fill={c} opacity={0.08} />
            <g transform={`translate(${nw / 2 - 10} ${nh / 2 - 10})`} color={c}>
              <DiagramIcon name={n.icon} size={20} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

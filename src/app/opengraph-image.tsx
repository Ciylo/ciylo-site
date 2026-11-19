import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Ciylo: One team for the device, the data and the app";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/ciylo-logo-dark.svg"), "utf8");
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#111013",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(0,201,167,0.35), transparent 45%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 56px 56px, 56px 56px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={290} height={100} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, display: "flex", flexWrap: "wrap" }}>
            One team for the&nbsp;<span style={{ color: "#00c9a7" }}>device</span>, the&nbsp;
            <span style={{ color: "#00c9a7" }}>data</span>&nbsp;and the&nbsp;<span style={{ color: "#00c9a7" }}>app</span>.
          </div>
          <div style={{ fontSize: 28, color: "#c9c9d1" }}>Hardware · Firmware · AI · Web, Mobile & SaaS · Lahore, Pakistan</div>
        </div>
      </div>
    ),
    size,
  );
}

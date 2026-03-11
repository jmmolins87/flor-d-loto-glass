import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 18%, rgba(131,225,204,0.36), transparent 28%), radial-gradient(circle at 84% 14%, rgba(236,190,96,0.28), transparent 22%), linear-gradient(135deg, #fbf7f1 0%, #efe7dc 100%)",
          color: "#233128",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-80px",
            bottom: "-110px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "rgba(63,114,83,0.16)",
            filter: "blur(12px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.6)",
            borderRadius: "36px",
            padding: "48px",
            background: "rgba(255,255,255,0.48)",
            boxShadow: "0 30px 90px -45px rgba(47,60,76,0.35)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.72)",
                padding: "10px 18px",
                fontSize: "24px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#3f7253",
                background: "rgba(255,255,255,0.65)",
              }}
            >
              Floristeria en Segovia
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: "760px",
                fontSize: "76px",
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: "760px",
                fontSize: "32px",
                lineHeight: 1.35,
                color: "#46564d",
              }}
            >
              Ramos de temporada, flores frescas y encargos con una dirección visual cuidada.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "28px",
              color: "#3f7253",
            }}
          >
            <div style={{ display: "flex" }}>flordelotosegovia.com</div>
            <div style={{ display: "flex" }}>Entrega local y encargos a medida</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

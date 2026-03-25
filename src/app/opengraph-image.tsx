import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RepostAI — One Post. Every Platform. 10 Seconds.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f1a",
          backgroundImage:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: "#818cf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "white",
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#e2e8f0",
              display: "flex",
            }}
          >
            Repost
            <span style={{ color: "#818cf8" }}>AI</span>
          </div>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#e2e8f0",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>One Post. Every Platform.</span>
          <span style={{ color: "#818cf8" }}>10 Seconds.</span>
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
            display: "flex",
          }}
        >
          AI-powered content repurposing for Twitter, LinkedIn, Instagram,
          Reddit & more
        </div>
      </div>
    ),
    { ...size }
  );
}

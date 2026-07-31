import { ImageResponse } from "next/og";

export const alt = "Вадим Гуняков — разработка, AI, аналитика и автоматизация";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F7F3EE",
        color: "#222220",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "4px",
            borderRadius: "999px",
            backgroundColor: "#B45C47",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: "34px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          Вадим Гуняков
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "68px",
          fontWeight: 700,
          lineHeight: 1.04,
          letterSpacing: "-0.045em",
        }}
      >
        <div style={{ display: "flex" }}>Вникаю в задачу.</div>

        <div style={{ display: "flex" }}>Навожу порядок.</div>

        <div style={{ display: "flex" }}>Собираю решение.</div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "28px",
          borderTop: "2px solid #D8D1C9",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "25px",
            fontWeight: 500,
            color: "#68645F",
            letterSpacing: "-0.015em",
          }}
        >
          Разработка · AI · Аналитика · Интернет-маркетинг
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "21px",
            fontWeight: 600,
            color: "#B45C47",
          }}
        >
          vadimgunyakov.ru
        </div>
      </div>
    </div>,
    size,
  );
}

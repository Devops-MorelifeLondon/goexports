import { Star } from "./Icons";

export default function TopBanner() {
  return (
    <div
      style={{
        background: "#000000", color: "white", padding: "8px 24px",
        fontSize: 13, textAlign: "center", display: "flex",
        alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >
      <Star />
      <span>
        <strong>Get over $50K in potential incentives when you start selling with GoExports.</strong>{" "}
        <a href="#" style={{ color: "#E0E0E0", fontWeight: 600 }}>Learn how</a>
      </span>
    </div>
  );
}
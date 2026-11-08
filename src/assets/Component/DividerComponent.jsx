import { Typography } from "antd";
 
const { Title } = Typography;
 
// Judul seksi dengan garis aksen, props tetap sama: Teks
export default function DividerComponent({ Teks }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "22px 0 12px",
      }}
    >
      <span
        style={{
          width: 4,
          height: 22,
          borderRadius: 2,
          background: "#182b55",
          flexShrink: 0,
        }}
      />
      <Title level={5} style={{ margin: 0, color: "#182b55" }}>
        {Teks}
      </Title>
      <div style={{ flex: 1, height: 1, background: "#e6e9f0" }} />
    </div>
  );
}
 
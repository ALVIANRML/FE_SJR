import { Col } from "antd";

export default function SisaKreditLimit({ Bagian }) {
  return (
    <Col xs={2} sm={24} md={6} lg={8} xl={8}>
      <div
        style={{
          borderRight: Bagian !== "Kam" ? "1px solid black" : "none",
          paddingRight: "12px",
          height: "100%",
        }}
      >
        <h5 className="font-mono font-black" style={{ margin: 0 }}>
          {Bagian}
        </h5>
        <p className="font-mono">RP 5.000.000.000</p>
      </div>
    </Col>
  );
}

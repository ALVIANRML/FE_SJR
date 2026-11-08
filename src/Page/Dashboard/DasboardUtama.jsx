import { Row, Col, Button, Card, Typography, Grid } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
 
import DividerComponent from "../../assets/Component/DividerComponent";
import SisaKreditLimit from "../../assets/Component/SisaKreditLimit";
import CarouselComponent from "../../assets/Component/CarouselComponent";
 
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
 
const NAVY = "#182b55";
 
export default function DashboardUtama() {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
 
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 4 }}>
        <Title level={4} style={{ margin: 0, color: NAVY }}>
          Dashboard Utama
        </Title>
        <Text type="secondary">Ringkasan kredit limit dan stok.</Text>
      </div>
 
      {/* ===== Tebusan ===== */}
      <DividerComponent Teks="Tebusan" />
      <Card
        title="Sisa Kredit Limit"
        style={{
          borderRadius: 12,
          borderColor: "#e6e9f0",
          boxShadow: "0 1px 2px rgba(24, 43, 85, 0.05)",
        }}
        styles={{
          header: {
            background: "#f7f8fb",
            borderRadius: "12px 12px 0 0",
            color: NAVY,
            minHeight: 46,
          },
          body: { padding: 0 },
        }}
      >
        <Row>
          <SisaKreditLimit Bagian="Retail" />
          <SisaKreditLimit Bagian="Industri" />
          <SisaKreditLimit Bagian="Kam" last />
        </Row>
      </Card>
 
      {/* ===== Stok ===== */}
      <DividerComponent Teks="Stok" />
      <CarouselComponent judul="10 Stok Tertinggi Retail (SJR)" />
      <div style={{ height: 16 }} />
      <CarouselComponent judul="10 Stok Tertinggi Industri (SJR)" />
 
      <Row gutter={[12, 12]} style={{ marginTop: 8 }}>
        <Col xs={24} sm={12}>
          <Button
            type="primary"
            size="large"
            block
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            style={{ background: NAVY, height: isMobile ? 44 : 48 }}
          >
            Detail Stok Retail
          </Button>
        </Col>
        <Col xs={24} sm={12}>
          <Button
            type="primary"
            size="large"
            block
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            style={{ background: NAVY, height: isMobile ? 44 : 48 }}
          >
            Detail Stok Industri
          </Button>
        </Col>
      </Row>
    </div>
  );
}
 
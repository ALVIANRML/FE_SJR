import { Divider, Carousel, Row, Col, Button } from "antd";
import "../../assets/css/Carousel.css";

import DividerComponent from "../../assets/Component/DividerComponent";
import SisaKreditLimit from "../../assets/Component/SisaKreditLimit";
import CarouselComponent from "../../assets/Component/CarouselComponent";

export default function DashboardUtama() {
  return (
    <>
      <h1
        className="font-mono font-bold"
        style={{
          color: "black",
          textAlign: "left",
        }}
      >
        Dashboard Utama
      </h1>
      <div>
        <DividerComponent Teks="Tebusan" />

        <div
          style={{
            height: "auto",
            border: "2px solid black",
            borderRadius: "10px",
          }}
         
        >
          <div>
            <Row>
              <Col xs={2} sm={24} md={6} lg={8} xl={24}>
                <div>
                  <h3 className="font-mono font-bold" style={{ margin: 5 }}>
                    Sisa Kredit Limit
                  </h3>
                </div>
              </Col>
            </Row>
            <Divider style={{ border: "1px solid black", margin: "0" }} />
            <Row>
              <SisaKreditLimit Bagian="Retail" />
              <SisaKreditLimit Bagian="Industri" />
              <SisaKreditLimit Bagian="Kam" />
            </Row>
          </div>
        </div>
      </div>
      <div>
        <DividerComponent Teks="Stok" />
        <CarouselComponent />
        <CarouselComponent />
        <div>
          <Row gutter={16}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button style={{ height: "6vh" }} type="primary" block>
                Button Detail Stok Retail
              </Button>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button style={{ height: "6vh" }} type="primary" block>
                Button Detail Stok Industri
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

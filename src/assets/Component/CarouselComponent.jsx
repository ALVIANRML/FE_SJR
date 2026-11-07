import { Carousel, Row, Col } from "antd";
import BarChartComponent from "./BarChartComponent";

export default function CarouselComponent() {
  return (
    <div>
      <Carousel
        className="myCarousel"
        style={{ height: "auto" }}
        arrows
        infinite={false}
      >
        <div>
          <Row gutter={16}>
            <BarChartComponent />
            <BarChartComponent />
          </Row>
        </div>
        <div>
          <Row gutter={16}>
            <BarChartComponent />
            <BarChartComponent />
          </Row>
          <br />
        </div>
      </Carousel>
    </div>
  );
}
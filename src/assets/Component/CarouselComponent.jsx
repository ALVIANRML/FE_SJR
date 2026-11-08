import { Carousel, Row, Col, Grid } from "antd";
import { createStyles } from "antd-style";
import BarChartComponent from "./BarChartComponent";
 
const { useBreakpoint } = Grid;
 
const useStyles = createStyles(({ css }) => ({
  carousel: css`
    .slick-dots li button {
      background: #9aa3b8;
    }
    .slick-dots li.slick-active button {
      background: #182b55;
    }
    .slick-dots {
      bottom: 0;
    }
 
    /* Panah prev/next: hitam, dengan lingkaran putih supaya terlihat di atas grafik */
    .slick-arrow.slick-prev,
    .slick-arrow.slick-next {
      z-index: 2;
      width: 32px !important;
      height: 32px !important;
      color: #000 !important;
      background: rgba(255, 255, 255, 0.95) !important;
      border: 1px solid #d9d9d9 !important;
      border-radius: 50% !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      opacity: 1 !important;
      transition: box-shadow 0.2s, background 0.2s;
    }
    .slick-arrow.slick-prev:hover,
    .slick-arrow.slick-next:hover,
    .slick-arrow.slick-prev:focus,
    .slick-arrow.slick-next:focus {
      color: #000 !important;
      background: #fff !important;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
    }
    .slick-arrow.slick-prev {
      inset-inline-start: 6px !important;
    }
    .slick-arrow.slick-next {
      inset-inline-end: 6px !important;
    }
    /* Lingkaran sejajar vertikal dengan kartu (kompensasi padding bawah slide) */
    .slick-arrow.slick-prev,
    .slick-arrow.slick-next {
      top: calc(50% - 14px) !important;
      margin-top: 0 !important;
      padding: 0 !important;
      transform: translateY(-50%) !important;
    }
    /* Chevron dipusatkan tepat di tengah lingkaran */
    .slick-arrow.slick-prev::before,
    .slick-arrow.slick-next::before {
      display: none !important;
    }
    .slick-arrow.slick-prev::after,
    .slick-arrow.slick-next::after {
      content: "" !important;
      position: absolute !important;
      inset: auto !important;
      top: 50% !important;
      left: 50% !important;
      width: 8px !important;
      height: 8px !important;
      margin: 0 !important;
      border: solid #000 !important;
      border-width: 2px 0 0 2px !important;
    }
    .slick-arrow.slick-prev::after {
      transform: translate(-30%, -50%) rotate(-45deg) !important;
    }
    .slick-arrow.slick-next::after {
      border-width: 2px 2px 0 0 !important;
      transform: translate(-70%, -50%) rotate(45deg) !important;
    }
    .slick-arrow.slick-disabled {
      opacity: 0.35 !important;
      cursor: not-allowed;
    }
  `,
  slide: css`
    padding-bottom: 28px; /* ruang untuk titik navigasi */
  `,
}));
 
// Laptop: 2 grafik per slide. Tablet & mobile: 1 grafik per slide.
export default function CarouselComponent({
  judul = "10 Stok Tertinggi Retail (SJR)",
  jumlah = 4,
}) {
  const { styles } = useStyles();
  const screens = useBreakpoint();
  const perSlide = screens.lg ? 2 : 1;
 
  const charts = Array.from({ length: jumlah });
  const slides = [];
  for (let i = 0; i < charts.length; i += perSlide) {
    slides.push(charts.slice(i, i + perSlide));
  }
 
  return (
    <Carousel
      key={perSlide} // reset carousel saat jumlah grafik per slide berubah
      className={styles.carousel}
      arrows={!!screens.md}
      infinite={false}
      draggable
      dots
    >
      {slides.map((group, s) => (
        <div key={s}>
          <div className={styles.slide}>
            <Row gutter={[16, 16]}>
              {group.map((_, i) => (
                <Col key={i} xs={24} lg={perSlide === 2 ? 12 : 24}>
                  <BarChartComponent judul={judul} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
 
import { Card, Grid } from "antd";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
 
const { useBreakpoint } = Grid;
 
const defaultData = [
  { bulan: "Jan", produksi: 400 },
  { bulan: "Feb", produksi: 300 },
  { bulan: "Mar", produksi: 500 },
  { bulan: "Apr", produksi: 700 },
  { bulan: "Mei", produksi: 650 },
];
 
// Sekarang hanya mengembalikan kartu; pembungkus <Col> ada di CarouselComponent
export default function BarChartComponent({
  judul = "10 Stok Tertinggi Retail (SJR)",
  data = defaultData,
}) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
 
  return (
    <Card
      size="small"
      title={judul}
      style={{
        height: "100%",
        borderRadius: 12,
        borderColor: "#e6e9f0",
        boxShadow: "0 1px 2px rgba(24, 43, 85, 0.05)",
      }}
      styles={{
        header: {
          background: "#f7f8fb",
          borderRadius: "12px 12px 0 0",
          color: "#182b55",
          fontSize: isMobile ? 13 : 14,
          minHeight: 44,
        },
        body: { padding: isMobile ? "12px 8px 4px 0" : "16px 12px 8px 0" },
      }}
    >
      <ResponsiveContainer width="100%" height={isMobile ? 220 : 280}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 12, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={40} />
          <Tooltip cursor={{ fill: "rgba(24,43,85,0.05)" }} />
          <Bar dataKey="produksi" fill="#182b55" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
 
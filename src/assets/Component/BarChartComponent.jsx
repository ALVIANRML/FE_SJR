import { Col } from "antd";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
export default function BarChartComponent() {
  const data = [
    {
      bulan: "Jan",
      produksi: 400,
    },
    {
      bulan: "Feb",
      produksi: 300,
    },
    {
      bulan: "Mar",
      produksi: 500,
    },
    {
      bulan: "Apr",
      produksi: 700,
    },
    {
      bulan: "Mei",
      produksi: 650,
    },
  ];
  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "black",
    lineHeight: "160px",
    textAlign: "center",
    // background: "black",
  };
  return (
    <Col xs={2} sm={24} md={6} lg={8} xl={12}>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "10px",
          padding: 20,
          height: "100%",
        }}
      >
        <h3 style={{ margin: 0 }}>10 Stok Tertinggi Retail (SJR)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="bulan" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="produksi" fill="#1677ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Col>
  );
}

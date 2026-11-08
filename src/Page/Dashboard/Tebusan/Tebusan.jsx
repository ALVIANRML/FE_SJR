import { Row, Col, Table, Input, DatePicker, Button, Card, Grid, Typography } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
 
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
 
const NAVY = "#182b55";
 
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      { text: "Joe", value: "Joe" },
      {
        text: "Category 1",
        value: "Category 1",
        children: [
          { text: "Yellow", value: "Yellow" },
          { text: "Pink", value: "Pink" },
        ],
      },
      {
        text: "Category 2",
        value: "Category 2",
        children: [
          { text: "Green", value: "Green" },
          { text: "Black", value: "Black" },
        ],
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: 220,
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
    width: 100,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      { text: "London", value: "London" },
      { text: "New York", value: "New York" },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: 280,
  },
];
 
const data = [
  { key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  { key: "3", name: "Joe Black", age: 32, address: "Sydney No. 1 Lake Park" },
  { key: "4", name: "Jim Red", age: 32, address: "London No. 2 Lake Park" },
];
 
export default function Tebusan() {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [keyword, setKeyword] = useState("");
 
  const filteredData = data.filter((row) =>
    Object.values(row).some((v) =>
      String(v).toLowerCase().includes(keyword.trim().toLowerCase())
    )
  );
 
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
 
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Judul + tombol aksi */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 14,
        }}
      >
        <div>
          <Title level={4} style={{ margin: 0, color: NAVY }}>
            Tebusan
          </Title>
          <Text type="secondary">Daftar tebusan yang sudah dibuat.</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/tebusan/buat-tebusan")}
          style={{ background: NAVY }}
          block={isMobile}
        >
          Buat Tebusan
        </Button>
      </div>
 
      <Card
        style={{
          borderRadius: 12,
          borderColor: "#e6e9f0",
          boxShadow: "0 1px 2px rgba(24, 43, 85, 0.05)",
        }}
        styles={{ body: { padding: isMobile ? 12 : 16 } }}
      >
        {/* Pencarian + filter tanggal */}
        <Row gutter={[12, 12]} style={{ marginBottom: 14 }}>
          <Col xs={24} md={12} lg={10}>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: "#aaa" }} />}
              placeholder="Cari tebusan..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12} lg={10}>
            <RangePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Col>
        </Row>
 
        <Table
          columns={columns}
          dataSource={filteredData}
          onChange={onChange}
          size={isMobile ? "small" : "middle"}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 10,
            size: "small",
            simple: isMobile,
            showSizeChanger: false,
            showTotal: isMobile
              ? undefined
              : (total, range) => `${range[0]}-${range[1]} dari ${total} data`,
          }}
        />
      </Card>
    </div>
  );
}
 
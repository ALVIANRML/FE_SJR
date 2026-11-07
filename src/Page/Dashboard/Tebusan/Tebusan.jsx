import { Row, Col, Table, Input, DatePicker, Button } from "antd";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
        children: [
          {
            text: "Yellow",
            value: "Yellow",
          },
          {
            text: "Pink",
            value: "Pink",
          },
        ],
      },
      {
        text: "Category 2",
        value: "Category 2",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: "30%",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function Tebusan() {
  const navigate = useNavigate();
  return (
    <>
      <h1 style={{ color: "black", textAlign: "left" }}>Tebusan</h1>

      <Row gutter={16}>
        <Col lg={8}>
          <Input.Search placeholder="Filled" variant="filled" />
        </Col>
        <Col lg={8} style={{ textAlign: "left" }}>
          <RangePicker />
        </Col>
        <Col lg={8} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => navigate("/tebusan/buat-tebusan")}
          >
            + Buat Tebusan
          </Button>
        </Col>
      </Row>
      <div style={{ marginTop: "3vh" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />;
      </div>
    </>
  );
}

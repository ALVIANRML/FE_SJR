import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  Card,
  Grid,
  Space,
  Typography,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
 
const { TextArea } = Input;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
 
const NAVY = "#182b55";
 
const useStyles = createStyles(({ css }) => ({
  form: css`
    .ant-form-item {
      margin-bottom: 14px;
    }
    .ant-form-item-label {
      padding-bottom: 4px;
    }
    .ant-form-item-label > label {
      font-weight: 500;
    }
  `,
  card: css`
    height: 100%;
    border-radius: 12px;
    border-color: #e6e9f0;
    box-shadow: 0 1px 2px rgba(24, 43, 85, 0.05);
    .ant-card-head {
      min-height: 46px;
      padding: 0 16px;
      background: #f7f8fb;
      border-radius: 12px 12px 0 0;
      border-bottom: 1px solid #e6e9f0;
    }
    .ant-card-head-title {
      padding: 10px 0;
      font-size: 15px;
      font-weight: 600;
      color: ${NAVY};
    }
    .ant-card-body {
      padding: 16px;
    }
  `,
  itemRow: css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  `,
  itemNo: css`
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #eaeef7;
    color: ${NAVY};
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  deleteBtn: css`
    flex-shrink: 0;
    font-size: 20px;
    color: #b0b5c0;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #ff4d4f;
    }
  `,
}));
 
const ptOptions = [
  { label: "PT. Samudra Jaya Raya", value: "PT. Samudra Jaya Raya" },
  { label: "PT. Citra Bintang Familindo", value: "PT. Citra Bintang Familindo" },
];
const shOptions = [{ label: "730278", value: "730278" }];
const sistemOptions = [
  { label: "Tebusan Secara SO", value: "SO" },
  { label: "Tebusan Secara QT", value: "QT" },
];
const itemOptions = [
  { label: "Nanti disini nama item", value: "nanti disiini id" },
  { label: "Nanti disini nama item", value: "nanti disiini id" },
  { label: "Nanti disini nama item", value: "nanti disiini id" },
];
 
const NOMOR_SURAT_COUNT = 6;
 
function SectionTitle({ icon, children }) {
  return (
    <Space size={8}>
      {icon}
      {children}
    </Space>
  );
}
 
export default function Stok() {
  const { styles } = useStyles();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [form] = Form.useForm();
 
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
 
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 14 }}>
        <Title level={4} style={{ margin: 0, color: NAVY }}>
          Tebusan
        </Title>
        <Text type="secondary">Isi data tebusan, lalu pilih item yang akan ditebus.</Text>
      </div>
 
      <Form
        form={form}
        name="tebusan"
        layout="vertical"
        onFinish={onFinish}
        requiredMark="optional"
        className={styles.form}
      >
        {/* ===== Informasi Tebusan ===== */}
        <Card
          className={styles.card}
          style={{ marginBottom: 16 }}
          title={
            <SectionTitle icon={<FileTextOutlined />}>
              Informasi Tebusan
            </SectionTitle>
          }
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12} xl={8}>
              <Form.Item
                label="Nama PT"
                name="namaPt"
                rules={[{ required: true, message: "Pilih PT" }]}
              >
                <Select placeholder="Pilih PT yang akan ditebus" options={ptOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} xl={4}>
              <Form.Item
                label="Nomor SH"
                name="nomorSh"
                rules={[{ required: true, message: "Pilih Nomor SH" }]}
              >
                <Select placeholder="Pilih Nomor SH" options={shOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} xl={6}>
              <Form.Item
                label="Sistem Tebusan"
                name="sistemTebusan"
                rules={[{ required: true, message: "Pilih Sistem Tebusan" }]}
              >
                <Select placeholder="Pilih Sistem Tebusan" options={sistemOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} xl={6}>
              <Form.Item
                label="Tanggal Tebusan"
                name="tanggalTebusan"
                rules={[{ required: true, message: "Pilih tanggal" }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
 
            <Col xs={24}>
              <Form.Item label="Nomor Surat" required style={{ marginBottom: 0 }}>
                <Row gutter={[8, 0]}>
                  {Array.from({ length: NOMOR_SURAT_COUNT }).map((_, i) => (
                    <Col xs={12} sm={8} md={4} key={i}>
                      <Form.Item
                        name={["nomorSurat", i]}
                        rules={[{ required: true, message: "Wajib diisi" }]}
                        style={{ marginBottom: isMobile ? 8 : 0 }}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Card>
 
        {/* ===== Item + Catatan berdampingan di laptop ===== */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} lg={14}>
            <Card
              className={styles.card}
              title={
                <SectionTitle icon={<ShoppingOutlined />}>
                  Item Tebusan
                </SectionTitle>
              }
            >
              <Form.List name="items" initialValue={[undefined]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className={styles.itemRow}>
                        <span className={styles.itemNo}>{index + 1}</span>
                        <Form.Item
                          name={field.name}
                          noStyle
                          rules={[
                            { required: true, message: `Pilih Item ${index + 1}` },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder={`Pilih Item ${index + 1}`}
                            style={{ flex: 1, minWidth: 0 }}
                            optionFilterProp="label"
                            options={itemOptions}
                          />
                        </Form.Item>
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            className={styles.deleteBtn}
                            onClick={() => remove(field.name)}
                          />
                        )}
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      block
                    >
                      Tambah Item Tebusan
                    </Button>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>
 
          <Col xs={24} lg={10}>
            <Card
              className={styles.card}
              title={
                <SectionTitle icon={<EditOutlined />}>Catatan</SectionTitle>
              }
            >
              <Form.Item name="catatan" style={{ marginBottom: 0 }}>
                <TextArea
                  placeholder="Masukkan catatan tebusan ini (opsional)"
                  autoSize={{ minRows: isMobile ? 3 : 5, maxRows: 10 }}
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>
 
        {/* ===== Aksi ===== */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: isMobile ? "stretch" : "flex-end",
          }}
        >
          <Button
            size="large"
            onClick={() => form.resetFields()}
            style={isMobile ? { flex: 1 } : undefined}
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              background: NAVY,
              minWidth: isMobile ? undefined : 160,
              flex: isMobile ? 2 : undefined,
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
 
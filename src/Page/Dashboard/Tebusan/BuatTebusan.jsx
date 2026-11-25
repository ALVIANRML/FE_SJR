import React, { useEffect, useState, useMemo } from "react";
import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  Card,
  Grid,
  Space,
  Typography,
  message,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import axios from "axios";

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
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  `,
  itemNo: css`
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    margin-top: 3px;
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
    margin-top: 6px;
    font-size: 20px;
    color: #b0b5c0;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #ff4d4f;
    }
  `,
  totalBar: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
    padding: 10px 14px;
    background: #f7f8fb;
    border: 1px solid #e6e9f0;
    border-radius: 8px;
  `,
}));

// label = nomor SH (ikut terkirim), value = id_segment
const shOptions = [
  { label: "730278", value: 1 },
  { label: "123456", value: 2 },
];

const sistemOptions = [
  { label: "Tebusan Secara SO", value: "SO" },
  { label: "Tebusan Secara QT", value: "QT" },
];

const formatRupiah = (v) =>
  v === undefined || v === null || v === ""
    ? ""
    : `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const parseRupiah = (v) => v?.replace(/\./g, "");

function SectionTitle({ icon, children }) {
  return (
    <Space size={8}>
      {icon}
      {children}
    </Space>
  );
}

export default function Stok() {
  const [perusahaan, setPerusahaan] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [ptOptions, setPtOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  const { styles } = useStyles();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [form] = Form.useForm();

  const namaPt = Form.useWatch("namaPt", form);
  const nomorSh = Form.useWatch("nomorSh", form);
  const watchedItems = Form.useWatch("items", form);

  const isItemEnabled = Boolean(namaPt && nomorSh);

  // id_item yang sudah dipilih di semua baris
  const selectedStokIds = useMemo(
    () => (watchedItems || []).map((i) => i?.id_item).filter(Boolean),
    [watchedItems]
  );

  // Item hanya yang id_perusahaan = PT terpilih dan id_segment = SH terpilih
  const filteredItemOptions = useMemo(() => {
    if (!isItemEnabled) return [];
    return itemData
      .filter(
        (item) =>
          String(item.id_perusahaan) === String(namaPt) &&
          String(item.id_segment) === String(nomorSh)
      )
      .map((item) => ({
        label: item.nama_item,
        value: item.id,
        harga_tebus: item.harga_tebus,
      }));
  }, [itemData, namaPt, nomorSh, isItemEnabled]);

  // Subtotal per baris = jumlah x harga satuan
  const getSubtotal = (row) => {
    const jumlah = Number(row?.jumlah);
    const harga = Number(row?.harga);
    if (!jumlah || !harga) return undefined;
    return jumlah * harga;
  };

  // Total keseluruhan semua baris
  const grandTotal = useMemo(
    () =>
      (watchedItems || []).reduce(
        (sum, row) => sum + (getSubtotal(row) || 0),
        0
      ),
    [watchedItems]
  );

  // Reset item saat PT atau SH diganti
  const resetItems = () => form.resetFields(["items"]);

  // Isi harga satuan otomatis dari item.harga_tebus saat item dipilih
  const handleItemChange = (index, value) => {
    const selected = itemData.find((i) => i.id === value);
    form.setFieldValue(
      ["items", index, "harga"],
      selected?.harga_tebus != null ? Number(selected.harga_tebus) : undefined
    );
  };

  const onFinish = async (values) => {
    // nama_pt & nomor_sh dikirim sebagai teks (label), bukan id
    const namaPtLabel = ptOptions.find((o) => o.value === values.namaPt)?.label;
    const nomorShLabel = shOptions.find((o) => o.value === values.nomorSh)?.label;

    const payload = {
      nama_pt: namaPtLabel,
      nomor_sh: nomorShLabel,
      metode_tebusan: values.sistemTebusan,
      tanggal_tebus: values.tanggalTebusan.format("YYYY-MM-DD"),
      items: values.items.map((item) => {
        const selected = itemData.find((i) => i.id === item.id_item);
        return {
          id_item: item.id_item,
          jumlah: item.jumlah,
          harga: Number(selected?.harga_tebus ?? 0), // harga satuan
        };
      }),
    };

    console.log("Payload:", payload);

    try {
      setSubmitting(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add-tebusan`, // ganti sesuai endpoint kamu
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Tebusan berhasil disimpan");
      form.resetFields();
    } catch (e) {
      console.error("Gagal menyimpan tebusan: ", e);
      message.error(e.response?.data?.message || "Gagal menyimpan tebusan");
    } finally {
      setSubmitting(false);
    }
  };

  const getPerusahaan = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-perusahaan`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = response.data.data;
      setPerusahaan(data);
      setPtOptions(
        data.map((item) => ({
          label: item.nama,
          value: item.id,
        }))
      );
    } catch (e) {
      console.error("Gagal mengambil data: ", e);
    } finally {
      setLoading(false);
    }
  };

  const getItem = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-item`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setItemData(response.data.data);
    } catch (e) {
      console.error("Gagal mengambil item: ", e);
    }
  };

  useEffect(() => {
    getPerusahaan();
    getItem();
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 14 }}>
        <Title level={4} style={{ margin: 0, color: NAVY }}>
          Tebusan
        </Title>
        <Text type="secondary">
          Isi data tebusan, lalu pilih item yang akan ditebus.
        </Text>
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
                <Select
                  placeholder="Pilih PT yang akan ditebus"
                  options={ptOptions}
                  loading={loading}
                  onChange={resetItems}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} xl={4}>
              <Form.Item
                label="Nomor SH"
                name="nomorSh"
                rules={[{ required: true, message: "Pilih Nomor SH" }]}
              >
                <Select
                  placeholder="Pilih Nomor SH"
                  options={shOptions}
                  onChange={resetItems}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} xl={6}>
              <Form.Item
                label="Sistem Tebusan"
                name="sistemTebusan"
                rules={[{ required: true, message: "Pilih Sistem Tebusan" }]}
              >
                <Select
                  placeholder="Pilih Sistem Tebusan"
                  options={sistemOptions}
                />
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
          </Row>
        </Card>

        {/* ===== Item + Catatan ===== */}
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
              <Form.List name="items" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className={styles.itemRow}>
                        <span className={styles.itemNo}>{index + 1}</span>

                        {/* Item */}
                        <Form.Item
                          name={[field.name, "id_item"]}
                          style={{ flex: "1 1 220px", minWidth: 0, marginBottom: 0 }}
                          rules={[
                            { required: true, message: `Pilih Item ${index + 1}` },
                          ]}
                        >
                          <Select
                            showSearch
                            disabled={!isItemEnabled}
                            placeholder={
                              isItemEnabled
                                ? `Pilih Item ${index + 1}`
                                : "Pilih Nama PT & Nomor SH dulu"
                            }
                            optionFilterProp="label"
                            notFoundContent="Tidak ada item untuk PT & SH ini"
                            onChange={(value) => handleItemChange(index, value)}
                            options={filteredItemOptions.filter(
                              (opt) =>
                                opt.value === watchedItems?.[index]?.id_item ||
                                !selectedStokIds.includes(opt.value)
                            )}
                          />
                        </Form.Item>

                        {/* Jumlah */}
                        <Form.Item
                          name={[field.name, "jumlah"]}
                          style={{ flex: "0 0 100px", marginBottom: 0 }}
                          rules={[{ required: true, message: "Isi jumlah" }]}
                        >
                          <InputNumber
                            min={1}
                            placeholder="Jumlah"
                            disabled={!isItemEnabled}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>

                        {/* Harga satuan (otomatis dari harga_tebus) */}
                        <Form.Item
                          name={[field.name, "harga"]}
                          style={{ flex: "0 0 150px", marginBottom: 0 }}
                          tooltip="Harga satuan (estimasi) dari data item"
                        >
                          <InputNumber
                            readOnly
                            placeholder="Harga satuan"
                            prefix="Rp"
                            style={{ width: "100%", background: "#f7f8fb" }}
                            formatter={formatRupiah}
                            parser={parseRupiah}
                          />
                        </Form.Item>

                        {/* Subtotal = jumlah x harga satuan (hanya tampilan) */}
                        <InputNumber
                          readOnly
                          placeholder="Subtotal"
                          prefix="Rp"
                          value={getSubtotal(watchedItems?.[index])}
                          style={{
                            flex: "0 0 170px",
                            background: "#f7f8fb",
                            fontWeight: 600,
                          }}
                          formatter={formatRupiah}
                          parser={parseRupiah}
                        />

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
                      onClick={() => add({})}
                      icon={<PlusOutlined />}
                      disabled={!isItemEnabled}
                      block
                    >
                      Tambah Item Tebusan
                    </Button>
                  </>
                )}
              </Form.List>

              {/* Total keseluruhan */}
              <div className={styles.totalBar}>
                <Text strong>Total Estimasi</Text>
                <Text strong style={{ color: NAVY, fontSize: 16 }}>
                  Rp {formatRupiah(grandTotal) || 0}
                </Text>
              </div>
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
            loading={submitting}
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
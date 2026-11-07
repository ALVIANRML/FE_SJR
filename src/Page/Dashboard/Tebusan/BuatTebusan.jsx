import React from "react";
import {
  Divider,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Button,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
export default function Stok() {
  const { TextArea } = Input;
  const useStyles = createStyles((rest) => {
    const { css, cssVar } = rest;
    return {
      dynamicDeleteButton: css`
        position: relative;
        top: 4px;
        margin: 0 ${cssVar.marginXS};
        color: #999;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          color: #777;
        }
        &[disabled] {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `,
    };
  });
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  const { styles } = useStyles();
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <>
      <div>
        <h2 style={{ color: "black" }}>Tebusan</h2>
        <Row gutter={16}>
          <Col lg={8}>
            <Form name="layout-multiple-vertical" layout="vertical">
              <Form.Item label="Select">
                <Select options={[{ label: "Demo", value: "demo" }]} />
              </Form.Item>
            </Form>
          </Col>
          <Col lg={8}>
            <Form name="layout-multiple-vertical" layout="vertical">
              <Form.Item label="Select">
                <Select options={[{ label: "Demo", value: "demo" }]} />
              </Form.Item>
            </Form>
          </Col>
          <Col lg={8}>
            <Form name="layout-multiple-vertical" layout="vertical">
              <Form.Item label="Select">
                <Select options={[{ label: "Demo", value: "demo" }]} />
              </Form.Item>
            </Form>
          </Col>
          <Col lg={12}>
            <Form name="layout-multiple-vertical" layout="vertical">
              <Form.Item
                label="DatePicker"
                name="DatePicker"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Form>
          </Col>
          <Col lg={12}>
            <Form name="layout-multiple-vertical" layout="vertical">
              <Row>
                <Col lg={4}>
                  <Form.Item
                    layout="vertical"
                    label="vertical"
                    name="vertical"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={4}>
                  <Form.Item
                    layout="vertical"
                    label=" "
                    name="vertical"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={4}>
                  <Form.Item
                    layout="vertical"
                    label=" "
                    name="vertical"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={4}>
                  <Form.Item
                    layout="vertical"
                    label=" "
                    name="vertical"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={4}>
                  <Form.Item
                    layout="vertical"
                    label=" "
                    name="vertical"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={4}>
                  <Form.Item
                    layout="vertical"
                    label=" "
                    name="vertical"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "2vh" }}>
          <Col lg={12}>
            <Form onFinish={onFinish}>
              <Form.List name="passengers">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        key={field.key}
                        label={`Passenger ${index + 1}`}
                      >
                        <Form.Item
                          {...field}
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: `Masukkan Passenger ${index + 1}`,
                            },
                          ]}
                        >
                          <Input
                            placeholder={`Passenger ${index + 1}`}
                            style={{ width: "80%" }}
                          />
                        </Form.Item>

                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            className={styles.dynamicDeleteButton}
                            onClick={() => remove(field.name)}
                          />
                        )}
                      </Form.Item>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      block
                    >
                      Tambah Passenger
                    </Button>
                  </>
                )}
              </Form.List>
            </Form>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={12}>
            <Form.Item layout="vertical" label="TextArea">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={24}>
            <Button style={{ width: "100%", height: "4vh" }} type="primary">
              Primary Button
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

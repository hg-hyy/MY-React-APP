import "antd/dist/antd.css";
import {
  Breadcrumb,
  Form,
  Button,
  Row,
  Col,
  Select,
  Table,
  Typography,
  DatePicker,
} from "antd";
import moment from "moment";
import { useState } from "react";
const { Option } = Select;
const { Text } = Typography;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};
const columns = [
  {
    title: "序号",
    dataIndex: "序号",
    key: "序号",
  },
  {
    title: "区域",
    dataIndex: "区域",
    key: "区域",
  },
  {
    title: "相机",
    dataIndex: "相机",
    key: "相机",
  },
  {
    title: "报警类型",
    dataIndex: "报警类型",
    key: "报警类型",
  },
  {
    title: "故障原因",
    dataIndex: "故障原因",
    key: "故障原因",
  },
  {
    title: "报警时间",
    dataIndex: "报警时间",
    key: "报警时间",
  },
  {
    title: "解除时间",
    dataIndex: "解除时间",
    key: "解除时间",
  },
  {
    title: "持续时间",
    dataIndex: "持续时间",
    key: "持续时间",
  },
];
const data = [];
for (let i = 1; i < 3; i++) {
  data.push({
    key: i,
    序号: i,
    区域: `A 区`,
    相机: "A 相机",
    报警类型: `一般报警`,
    故障原因: `系统异常`,
    报警时间: `2021-05-26 09:22:22`,
    解除时间: `2021-05-26 10:22:22`,
    持续时间: `1 hour`,
  });
}
const style = {
  backgroundColor: " #fff",
  width: "100%",
  marginTop: "16px",
  padding: 24,
  minHeight: 680,
};
function Unhandlewarn() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (srk) => {
    console.log("selectedRowKeys changed: ", srk);
    setSelectedRowKeys([...srk]);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <Text level={3}>
        <Breadcrumb
          style={{ margin: "16px 0", backgroundColor: "#fff", padding: "4px" }}
        >
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>报警管理</Breadcrumb.Item>
          <Breadcrumb.Item>未处理报警</Breadcrumb.Item>
        </Breadcrumb>
      </Text>

      <div  style={style}>
        <div>
          <Form {...layout} name="basic" initialValues={{ remember: true }}>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="区域"
                  name="Area"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Area!",
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择"
                    allowClear
                    style={{ width: 180 }}
                  >
                    <Option value="A 区">A 区</Option>
                    <Option value="B 区">B 区</Option>
                    <Option value="C 区">C 区</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="相机"
                  name="camera"
                  rules={[
                    {
                      required: true,
                      message: "Please input your camera!",
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择"
                    allowClear
                    style={{ width: 180 }}
                  >
                    <Option value="A 相机">A 相机</Option>
                    <Option value="B 相机">B 相机</Option>
                    <Option value="C 相机">C 相机</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="报警时间"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <RangePicker
                    ranges={{
                      Today: [moment(), moment()],
                      "This Month": [
                        moment().startOf("month"),
                        moment().endOf("month"),
                      ],
                    }}
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="持续时间"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择"
                    allowClear
                    style={{ width: 180 }}
                  >
                    <Option value="5">&gt;5分钟</Option>
                    <Option value="10">&gt;10分钟</Option>
                    <Option value="15">&gt;15分钟</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginLeft: 42 }}>
              <Col span={2}>
                <Form.Item>
                  <Button type="primary" shape="round" htmlType="submit">
                    查询
                  </Button>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <Button type="primary" shape="round" htmlType="submit">
                    忽略
                  </Button>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <Button type="primary" shape="round" htmlType="submit">
                    处理
                  </Button>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <Button type="primary" shape="round" htmlType="submit">
                    下载
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div>
          <div
            style={{
              marginBottom: 8,
              backgroundColor: "#91d5ff",
              border: "1px solid #91d5ff",
              borderRadius: "5px",
              padding: "4px",
            }}
          >
            <Text level={4}>未处理报警记录列表共{data.length}个</Text>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </div>
  );
}

export default Unhandlewarn;

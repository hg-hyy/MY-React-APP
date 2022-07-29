/* jshint esversion: 6 */
import React from "react";
import {
  Form,
  Input,
  Select,
  Cascader,
  DatePicker,
  Table,
  Switch,
  Radio,
  Divider,
  Button,
  message,
  Space,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import moment from "moment";

import get from "../../../api/get";
import Mycomment from "./comment";
import { notice } from "@pnotify/core";
const url = "http://127.0.0.1:8000/blog/check_log";

const { Option } = Select;
const dateFormat = "YYYY/MM/DD";
// eslint-disable-next-line
const tellMe = (key) => {
  message.info(`Click on item ${key}`);
};
// eslint-disable-next-line
function callback(e) {
  console.log(e.target.innerText);
}
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
    render: (text) => <Button type="link">{text}</Button>,
  },
  {
    title: "日志级别",
    dataIndex: "日志级别",
    key: "日志级别",
  },
  {
    title: "日志时间",
    dataIndex: "日志时间",
    key: "日志时间",
  },
  {
    title: "操作",
    key: "操作",
    render: (record) => (
      <span>
        <Button
          type="link"
          onClick={() => {
            tellMe(record.key);
          }}
        >
          查看{record.key}
        </Button>
        <Divider type="vertical" />
        <Button type="link">删除</Button>
      </span>
    ),
  },
];

const formItemLayout = {
  labelCol: {
    lg: { span: 1 },
  },
  wrapperCol: {
    lg: { span: 16 },
  },
};

const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const expandedRowRender = (record) => <p>{record.详情}</p>;
const title = () => <Button>blog logs</Button>;
const showHeader = true;
const footer = () => <Button>1111111</Button>;
const scroll = { y: 240 };
const pagination = { position: "bottom" };

class Antdform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log_level: "info",
      log_day: new Date().toLocaleDateString(),
      log_list: [],
      bordered: true,
      pagination,
      size: "default",
      expandedRowRender,
      title: title,
      showHeader,
      footer,
      rowSelection: {},
      scroll: scroll,
      hasData: true,
      data: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onChange(date, dateString) {
    // console.log(dateString);
    this.setState({
      log_day: dateString,
    });
  }

  onClick(event) {
    // console.log(dateString);
    this.setState({
      title: () => <Button>222222</Button>,
    });
  }

  handleChange(value) {
    // console.log(`selected ${value}`);
    this.setState({
      log_level: value,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "select" ? target.selected : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    let params = {
      log_level: this.state.log_level,
      log_day: this.state.log_day,
    };
    get(url, params)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          log_level: result.log_level,
          log_list: result.log_list,
          data: result.mydata,
        });
      });

    notice({
      title: "日志查询完成：",
      text: this.state.log_level,
      modules: {
        Animate: {
          animate: true,
          inClass: "zoomInLeft",
          outClass: "zoomOutRight",
        },
      },
    });
  }

  handleToggle = (prop) => (enable) => {
    this.setState({ [prop]: enable });
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  handleExpandChange = (enable) => {
    this.setState({
      expandedRowRender: enable ? expandedRowRender : undefined,
    });
  };

  handleTitleChange = (enable) => {
    this.setState({ title: enable ? title : undefined });
  };

  handleHeaderChange = (enable) => {
    this.setState({ showHeader: enable ? showHeader : false });
  };

  handleFooterChange = (enable) => {
    this.setState({ footer: enable ? footer : undefined });
  };

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  handleScollChange = (enable) => {
    this.setState({ scroll: enable ? scroll : undefined });
  };

  handlePaginationChange = (e) => {
    const { value } = e.target;
    this.setState({
      pagination: value === "none" ? false : { position: value },
    });
  };
  render() {
    const { state } = this;
    return (
      <div>
        <Form
          {...formItemLayout}
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={this.handleSubmit}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="日志级别" validateStatus="success">
            <Space direction="horizontal">
              <Select
                defaultValue={this.state.log_level}
                onChange={this.handleChange}
              >
                <Option value="info">info</Option>
                <Option value="error">error</Option>
                <Option value="all">all</Option>
              </Select>
              <span style={{ marginLeft: 5 }}>日志时间：</span>
              <DatePicker
                onChange={this.onChange}
                defaultValue={moment("2022/07/29", dateFormat)}
                format={dateFormat}
              />
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Cascader defaultValue={["1"]} options={options} />

              <Input.Password
                placeholder="input password"
                allowClear
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Space>
          </Form.Item>
        </Form>
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
        >
          <Form.Item label="Bordered">
            <Switch
              checked={state.bordered}
              onChange={this.handleToggle("bordered")}
            />
          </Form.Item>
          <Form.Item label="Title">
            <Switch checked={!!state.title} onChange={this.handleTitleChange} />
          </Form.Item>
          <Form.Item label="Column Header">
            <Switch
              checked={!!state.showHeader}
              onChange={this.handleHeaderChange}
            />
          </Form.Item>
          <Form.Item label="Footer">
            <Switch
              checked={!!state.footer}
              onChange={this.handleFooterChange}
            />
          </Form.Item>
          <Form.Item label="Expandable">
            <Switch
              checked={!!state.expandedRowRender}
              onChange={this.handleExpandChange}
            />
          </Form.Item>
          <Form.Item label="Checkbox">
            <Switch
              checked={!!state.rowSelection}
              onChange={this.handleRowSelectionChange}
            />
          </Form.Item>
          <Form.Item label="Fixed Header">
            <Switch
              checked={!!state.scroll}
              onChange={this.handleScollChange}
            />
          </Form.Item>

          <Form.Item label="Size">
            <Radio.Group value={state.size} onChange={this.handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="middle">Middle</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="分页">
            <Radio.Group
              value={state.pagination ? state.pagination.position : "none"}
              onChange={this.handlePaginationChange}
            >
              <Radio.Button value="bottom">Bottom</Radio.Button>
              <Radio.Button value="none">None</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Table
          // rowKey={record =>record.详情}
          {...this.state}
          columns={columns.map((item) => ({ ...item }))}
          dataSource={state.hasData ? state.data : null}
        />
        <Mycomment />
      </div>
    );
  }
}
export default Antdform;

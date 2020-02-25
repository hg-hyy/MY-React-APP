/* jshint esversion: 6 */
import React from "react";
import PNotify from "pnotify/dist/es/PNotify";
import { Form, Input, Select, Cascader, DatePicker } from "antd";
import { Table, Switch, Radio, Divider, Button, message, Avatar } from "antd";
import get from "../../api/get";
import moment from "moment";
import Mycomment from "./comment";

// eslint-disable-next-line
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
// eslint-disable-next-line
import PNotifyConfirm from "pnotify/dist/es/PNotifyConfirm";

let url = "http://127.0.0.1:8000/blog/check_log";

const { Option } = Select;

// eslint-disable-next-line
const tellMe = key => {
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
    render: text => <Button type="link">{text}</Button>
  },
  {
    title: "日志级别",
    dataIndex: "日志级别",
    key: "日志级别"
  },
  {
    title: "日志时间",
    dataIndex: "日志时间",
    key: "日志时间"
  },
  {
    title: "操作",
    key: "操作",
    render: record => (
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
    )
  }
];

const formItemLayout = {
  labelCol: {
    lg: { span: 1 }
  },
  wrapperCol: {
    lg: { span: 16 }
  }
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
            label: "West Lake"
          }
        ]
      }
    ]
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
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];

const expandedRowRender = record => <p>{record.详情}</p>;
const title = () => <Button>1111111</Button>;
const showHeader = true;
const footer = () => <Button>1111111</Button>;
const scroll = { y: 240 };
const pagination = { position: "bottom" };

class Antform extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      log_level: "info",
      log_day: (new Date().toLocaleDateString()),
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
      data: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(date, dateString) {
    // console.log(dateString);
    this.setState({
      log_day: dateString
    });
  }

  onClick(event) {
    // console.log(dateString);
    this.setState({
      title: () => <Button>222222</Button>
    });
  }

  handleChange(value) {
    // console.log(`selected ${value}`);
    this.setState({
      log_level: value
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "select" ? target.selected : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    let params = {
      log_level: this.state.log_level,
      log_day: this.state.log_day
    };
    get(url, params)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          log_level: result.log_level,
          log_list: result.log_list,
          data: result.mydata
        });
      });

    PNotify.notice({
      title: "日志查询完成：",
      text: this.state.log_level,
      modules: {
        Animate: {
          animate: true,
          inClass: "zoomInLeft",
          outClass: "zoomOutRight"
        }
      }
    });

    event.preventDefault();
  }

  handleToggle = prop => enable => {
    this.setState({ [prop]: enable });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleExpandChange = enable => {
    this.setState({
      expandedRowRender: enable ? expandedRowRender : undefined
    });
  };

  handleTitleChange = enable => {
    this.setState({ title: enable ? title : undefined });
  };

  handleHeaderChange = enable => {
    this.setState({ showHeader: enable ? showHeader : false });
  };

  handleFooterChange = enable => {
    this.setState({ footer: enable ? footer : undefined });
  };

  handleRowSelectionChange = enable => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  handleScollChange = enable => {
    this.setState({ scroll: enable ? scroll : undefined });
  };

  handlePaginationChange = e => {
    const { value } = e.target;
    this.setState({
      pagination: value === "none" ? false : { position: value }
    });
  };
  render() {
    const { state } = this;
    return (
      <div>
        <Avatar
          shape="square"
          size={128}
          icon="user"
          src="../../static/aoa/images/CL/CL1.JPG"
        />
        {/* <Badge count={5}>
          <a href="#" className="head-example" />
        </Badge> */}
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="日志级别" validateStatus="success">
            <Select
              defaultValue={this.state.log_level}
              style={{ display: "inline-block", width: "calc(20% - 12px)" }}
              onChange={this.handleChange}
            >
              <Option value="info">info</Option>
              <Option value="error">error</Option>
              <Option value="all">all</Option>
            </Select>
            <span style={{ marginLeft: 5 }}>日志时间：</span>
            <DatePicker
              value={moment(this.state.log_day)}
              style={{ display: "inline-block", width: "calc(30% - 12px)" }}
              onChange={this.onChange}
            />
            <Input
              type="submit"
              value="Submit"
              style={{
                display: "inline-block",
                width: "calc(20% - 12px)",
                marginLeft: 5
              }}
            ></Input>
          </Form.Item>

          <Form.Item label="城市：" validateStatus="validating" help="地区">
            <Cascader
              defaultValue={["1"]}
              options={options}
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <Input.Password allowClear placeholder="input password " />
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
          columns={columns.map(item => ({ ...item }))}
          dataSource={state.hasData ? state.data : null}
        />
        <Mycomment />
      </div>
    );
  }
}
export default Antform;

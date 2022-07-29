/* jshint esversion: 6 */
import React from "react";
// import { Table } from "reactstrap";
import get from "../../../api/get";
import { Table, Button } from "antd";
import { Space, Tag } from "antd";
// eslint-disable-next-line
var myInit = {
  method: "GET",
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

let url = "http://127.0.0.1:8000/blog/show_log";

let params = {
  log_level: "info",
  log_name: "info-2022-07-29.log",
};

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
    title: "日志内容",
    dataIndex: "日志内容",
    key: "日志内容",
  },
  {
    title: "操作",
    key: "操作",
    render: (record) => (
      <span>
        <Button type="link" onClick={() => {}}>
          查看{record.key}
        </Button>
        <Button type="link">删除</Button>
      </span>
    ),
  },
];

const columns1 = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";

          if (tag === "loser") {
            color = "volcano";
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      log_level: "",
      log_text: [],
      msg: "",
    };
  }

  componentDidMount() {
    get(url, params)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result.items,
            log_level: result.log_level,
            log_text: result.log_text,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { log_level, log_text, isLoaded, error } = this.state;
    console.log(log_text);
    if (error) {
      return <div> show_log: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return <Table columns={columns} dataSource={log_text} />;
      // <Table columns={columns1} dataSource={data} />
      /*{ <Table>
            <thead>
              <tr>
                <th> # </th>
                <th> 日志级别 </th>
                <th> 日志名称 </th>
                <th> 操作 </th>
              </tr>
            </thead>
            <tbody>
              {log_text &&
                log_text.map((item, index) => (
                  <tr key={item.name}>
                    <th scope="row"> {index + 1} </th>
                    <td> {log_level} </td>
                    <td> {item} </td>
                    <td> 查看 </td>
                  </tr>
                ))}
            </tbody>
          </Table> }*/
    }
  }
}
export default MyTable;

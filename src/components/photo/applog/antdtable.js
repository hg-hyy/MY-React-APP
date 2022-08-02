/* jshint esversion: 6 */
import React from "react";
import get from "../../../api/get";
import { Table, Button } from "antd";
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
  log_name: "info-2022-08-02.log",
};

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    render: (text) => <Button type="link">{text}</Button>,
  },
  {
    title: "log_level",
    dataIndex: "log_level",
    key: "log_level",
  },
  {
    title: "log_text",
    dataIndex: "log_text",
    key: "log_text",
  },
  {
    title: "操作",
    key: "操作",
    render: (record) => (
      <span>
        <Button type="link" onClick={() => {}}>
          删除
        </Button>
      </span>
    ),
  },
];

class AntdTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
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
          this.setState({
            isLoaded: true,
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
    const { log_text, isLoaded, error } = this.state;
    if (error) {
      return <div> show_log: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading...table </div>;
    } else {
      return <Table columns={columns} dataSource={log_text} />;
    }
  }
}
export default AntdTable;

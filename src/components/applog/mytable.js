/* jshint esversion: 6 */
import React from "react";
import { Table } from "reactstrap";
import  get  from "../../api/get";

// eslint-disable-next-line
var myInit = {
  method: "GET",
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
};

let url = "http://127.0.0.1:8000/blog/show_log";

let params = {
  log_level: "info",
  log_name: "all-2020-01-19.log"
};

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      log_level: "",
      log_text: "",
      msg: "",
    };
  }


  componentDidMount() {
    get(url, params).then(res =>res.json()).then(
      result => {
        // console.log(result.items);
        this.setState({
          isLoaded: true,
          items: result.items,
          log_level: result.log_level,
          log_text: result.log_text,
        });
      },
        // 注意：需要在此处处理错误
        // 而不是使用 catch() 去捕获错误
        // 因为使用 catch 去捕获异常会掩盖掉组件本身可能产生的 bug
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  render() {
    const { items, log_level, log_text, isLoaded, error } = this.state;
    if (error) {
      return (<div> Error: {error.message} </div>);
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th> # </th>
              <th> 日志级别 </th>
              <th> 日志名称 </th>
              <th> 操作 </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map(item => (
                <tr key={item.name}>
                  <th scope="row"> {item.id} </th>
                  <td> {log_level} </td>
                  <td> {log_text} </td>
                  <td> 查看 </td>
                </tr>
              ))}
          </tbody>
        </Table>
      );
    }
  }
}
export default MyTable;

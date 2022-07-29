/* jshint esversion: 6 */
import React from "react";
import { List, Typography } from "antd";
// eslint-disable-next-line
var myInit = {
  method: "GET",
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

let url = "http://127.0.0.1:8000/blog/blog_version";

class Antdlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      version: " ",
      msg: "",
    };
  }

  componentDidMount() {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result.items);
          this.setState({
            isLoaded: true,
            items: result.items,
            version: result.version,
          });
        },
        // 注意：需要在此处处理错误
        // 而不是使用 catch() 去捕获错误
        // 因为使用 catch 去捕获异常会掩盖掉组件本身可能产生的 bug
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div> blog_version: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={
            items &&
            items.map((item) => (
              <span key={item.name}>
                {item.name} {item.price}
              </span>
            ))
          }
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[index]</Typography.Text> {item}
            </List.Item>
          )}
        />
      );
    }
  }
}

export default Antdlist;

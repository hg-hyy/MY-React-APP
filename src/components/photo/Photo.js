/* jshint esversion: 6 */
import React from "react";
import { Menu, Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Mylog from "../applog/Applog";
import Home from "./home";
import Show from "./show";
import Mychart from "../chart/mychart";
import "../../assets/App.css";
import NotFound from "../notfound/404";
import Container from "@mui/material/Container";

const { SubMenu } = Menu;

function Error403() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}
function Error404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}
function Error500() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, the server is wrong."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}
function Info() {
  return (
    <Result
      title="Your operation has been executed"
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  );
}
function Warning() {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  );
}
class Photo extends React.Component {
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    // console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Container maxWidth="xxl" sx={{ pt: 3 }}>
        <Menu
          style={{ marginBottom: 10 }}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="home">
              {/* <Icon type="home" /> */}
              <SmileOutlined />
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="log">
            <Link to="applog">
              {/* <Icon type="message" /> */}
              <SmileOutlined />
              Applog
            </Link>
          </Menu.Item>
          <Menu.Item key="show">
            <Link to="show">
              {/* <Icon type="dashboard" /> */}
              <SmileOutlined />
              Show
            </Link>
          </Menu.Item>
          <Menu.Item key="chart">
            <Link to="chart">
              {/* <Icon type="database" /> */}
              <SmileOutlined />
              Chart
            </Link>
          </Menu.Item>
          <SubMenu
            key="submenu"
            title={
              <span className="submenu-title-wrapper">
                {/* <Icon type="setting" /> */}
                <SmileOutlined />
                Message
              </span>
            }
          >
            <Menu.Item key="setting:4">
              <Link to="error403">403</Link>
            </Menu.Item>
            <Menu.Item key="setting:5">
              <Link to="error404">404</Link>
            </Menu.Item>
            <Menu.Item key="setting:6">
              <Link to="error500">500</Link>
            </Menu.Item>
            <Menu.Item key="setting:7">
              <Link to="info">Info</Link>
            </Menu.Item>
            <Menu.Item key="setting:8">
              <Link to="warning">Warning</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="applog" element={<Mylog />} />
          <Route path="show" element={<Show />} />
          <Route path="chart" element={<Mychart />} />
          <Route path="error403" element={<Error403 />} />
          <Route path="error404" element={<Error404 />} />
          <Route path="error500" element={<Error500 />} />
          <Route path="info" element={<Info />} />
          <Route path="warning" element={<Warning />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </Container>
    );
  }
}
export default Photo;

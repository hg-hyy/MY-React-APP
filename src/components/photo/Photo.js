/* jshint esversion: 6 */
import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { Menu, Result, Button } from "antd";
import Applog from "./applog/Applog";
import Home from "./home";
import Show from "./show";
import Mychart from "../chart/mychart";
import NotFound from "../notfound/404";
import Container from "@mui/material/Container";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

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

const items = [
  getItem(
    "Home",
    "sub1",
    <Link to="home">
      <AppstoreOutlined />
    </Link>
  ),
  getItem(
    "Applog",
    "sub2",
    <Link to="applog">
      <SmileOutlined />
    </Link>
  ),
  getItem(
    "Show",
    "sub3",
    <Link to="show">
      <MailOutlined />
    </Link>
  ),
  getItem(
    "Chart",
    "sub4",
    <Link to="chart">
      <SmileOutlined />
    </Link>
  ),
  getItem("Navigation Three", "sub5", <SettingOutlined />, [
    getItem("403", "1", <Link to="error403"></Link>),
    getItem("404", "2", <Link to="error404"></Link>),
    getItem("500", "3", <Link to="error500"></Link>),
    getItem("Info", "4", <Link to="info"></Link>),
    getItem("warning", "5", <Link to="warning"></Link>),
  ]),
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function Photo() {
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Container maxWidth="xxl" sx={{ pt: 3 }}>
      <Menu
        style={{ marginBottom: 10, width: "auto" }}
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={[]}
        mode="horizontal"
        items={items}
      />
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="applog" element={<Applog />} />
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
export default Photo;

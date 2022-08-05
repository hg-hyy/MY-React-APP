import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Currentwarn from "./currentwarn";
import UnHandlewarn from "./unHandlewarn";
import Handledwarn from "./handledwarn";
const { Header, Content } = Layout;

const items = [
  getItem(
    "home",
    "sub1",
    <Link to="home">
      <SettingOutlined />
    </Link>
  ),
  getItem("warn", "sub2", <AppstoreOutlined />, [
    getItem(
      "currentwarn",
      "1",
      <Link to="currentwarn">
        <MailOutlined />
      </Link>
    ),
    getItem(
      "unHandlewarn",
      "2",
      <Link to="unHandlewarn">
        <SettingOutlined />
      </Link>
    ),
    getItem(
      "handledwarn",
      "3",
      <Link to="handledwarn">
        <SmileOutlined />
      </Link>
    ),
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

function Warn() {
  const onClick = (e) => {
    // console.log("click ", e);
  };
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          onClick={onClick}
          defaultSelectedKeys={["sub1"]}
          defaultOpenKeys={["sub1"]}
          mode="horizontal"
          items={items}
        />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 24px", marginTop: 66 }}
      >
        <Routes>
          <Route path="currentwarn" element={<Currentwarn />} />
          <Route path="unHandlewarn" element={<UnHandlewarn />} />
          <Route path="handledwarn" element={<Handledwarn />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default Warn;

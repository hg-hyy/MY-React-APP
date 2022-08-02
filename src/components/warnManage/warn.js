import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import Currentwarn from "./currentwarn";
import UnHandlewarn from "./unHandlewarn";
import Handledwarn from "./handledwarn";
const { Header, Content } = Layout;
const { SubMenu } = Menu;

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
function Warn() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">
            <Link to="/home">Home</Link>
          </Menu.Item>

          <SubMenu key="SubMenu" icon={<SettingOutlined />} title="报警管理">
            <Menu.Item key="setting:1">
              <Link to="/warnManage/unHandlewarn">未处理报警</Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/warnManage/currentwarn">当前报警</Link>
            </Menu.Item>
            <Menu.Item key="setting:3">
              <Link to="/warnManage/handledwarn">已处理报警</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 24px", marginTop: 66 }}
      >
        <Routes>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/warnManage/currentwarn">
            <Currentwarn />
          </Route>
          <Route path="/warnManage/unHandlewarn">
            <UnHandlewarn />
          </Route>
          <Route path="/warnManage/handledwarn">
            <Handledwarn />
          </Route>
        </Routes>
      </Content>
    </Layout>
  );
}

export default Warn;

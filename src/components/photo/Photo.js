/* jshint esversion: 6 */
import React from "react";
import { Menu, Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Container from "@mui/material/Container";
import { Switch, Route, Link } from "react-router-dom";
import Mylog from "../applog/Applog";
import Home from "./home";
import Show from "./show";
import Mychart from "../chart/mychart";
import "../../assets/App.css";

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
      <Container maxWidth="xl">
        <Menu
          style={{ marginBottom: 10 }}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/Photo">
              {/* <Icon type="home" /> */}
              <SmileOutlined />
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="log">
            <Link to="/Photo/applog">
              {/* <Icon type="message" /> */}
              <SmileOutlined />
              Applog
            </Link>
          </Menu.Item>
          <Menu.Item key="show">
            <Link to="/Photo/show">
              {/* <Icon type="dashboard" /> */}
              <SmileOutlined />
              Show
            </Link>
          </Menu.Item>
          <Menu.Item key="chart">
            <Link to="/Photo/chart">
              {/* <Icon type="database" /> */}
              <SmileOutlined />
              Chart
            </Link>
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                {/* <Icon type="setting" /> */}
                <SmileOutlined />
                Message
              </span>
            }
          >
            <Menu.Item key="setting:4">
              <Link to="/Photo/error403">403</Link>
            </Menu.Item>
            <Menu.Item key="setting:5">
              <Link to="/Photo/error404">404</Link>
            </Menu.Item>
            <Menu.Item key="setting:6">
              <Link to="/Photo/error500">500</Link>
            </Menu.Item>
            <Menu.Item key="setting:7">
              <Link to="/Photo/info">Info</Link>
            </Menu.Item>
            <Menu.Item key="setting:8">
              <Link to="/Photo/warning">Warning</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <Switch>
          <Route path="/Photo/error403">
            <Error403 />
          </Route>
          <Route path="/Photo/error404">
            <Error404 />
          </Route>
          <Route path="/Photo/error500">
            <Error500 />
          </Route>
          <Route path="/Photo/info">
            <Info />
          </Route>
          <Route path="/Photo/warning">
            <Warning />
          </Route>
          <Route path="/Photo/applog">
            <Mylog />
          </Route>
          <Route path="/Photo/show">
            <Show />
          </Route>
          <Route path="/Photo/chart">
            <Mychart />
          </Route>
          <Route path="/Photo">
            <Home />
          </Route>
        </Switch>
      </Container>
    );
  }
}
export default Photo;

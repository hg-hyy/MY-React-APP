/* jshint esversion: 6 */
import React from "react";
import Mylist from "./mylist";
import MyTable from "./mytable";
import Myform from "./myform";
import Antform from "./antform";
// import 'antd/dist/antd.css';
// import Anttable from './anttable';

import "bootstrap/dist/css/bootstrap.min.css";
import "pnotify/dist/PNotifyBrightTheme.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from "reactstrap";
import PNotify from "pnotify/dist/es/PNotify";

// eslint-disable-next-line
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
// eslint-disable-next-line
import PNotifyConfirm from "pnotify/dist/es/PNotifyConfirm";

import "pnotify/dist/PNotifyBrightTheme.css";
import "bootstrap/dist/css/bootstrap.min.css";

PNotify.defaults.styling = "bootstrap4"; // Bootstrap version 4

const styles = {
  fontFamily: "sans-serif",
  textAlign: "left",
  marginTop: "20px"
};

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "请输入用户名：" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    // this.setState({value: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    PNotify.notice({
      title: "hello react",
      text: this.state.value,
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

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={styles}>
        <label>
          名字:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form>
          <label>
            参与:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            来宾人数:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange}
            />
          </label>
        </form>
        {/* <Example /> */}
      </div>
    );
  }
}

export { NameForm, Reservation };

class Applog extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Container>
        <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/"> reactstrap </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  Github
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Row>
            <Col>
              <h1>Welcome to React</h1>
              <p>
                <Button
                  tag="a"
                  color="success"
                  size="large"
                  href="http://reactstrap.github.io"
                  target="_blank"
                >
                  View Reactstrap Docs
                </Button>
              </p>
            </Col>
          </Row>
          <NameForm />
          <Reservation />
          <Mylist />
          <MyTable />
          <Myform />
          <Antform />
        </Jumbotron>
      </Container>
    );
  }
}

export default Applog;

/* jshint esversion: 6 */
import React from "react";
import { Table, Form, FormGroup, Label, Input } from "reactstrap";
import  get  from "../../api/get";
import MyModal from "./modal";
import PNotify from "pnotify/dist/es/PNotify";



import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import moment from 'moment';

// eslint-disable-next-line
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
// eslint-disable-next-line
import PNotifyConfirm from "pnotify/dist/es/PNotifyConfirm";

let url = "http://127.0.0.1:8000/blog/check_log";


class Myform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log_level: "info",
      log_day: "2020-01-19",
      log_list: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(date, dateString) {
    // console.log(dateString);
    this.setState({
      log_day:dateString
    });
  }



  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "select" ? target.selected : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    let params = {
      log_level: this.state.log_level,
      log_day: this.state.log_day
    };
    get(url, params).then(res =>res.json()).then(result => {
      console.log(result);
      this.setState({
        log_level: result.log_level,
        log_list: result.log_list,
      });
    },error => {
      console.log(error)
      this.setState({
        // isLoaded: true,
        // error
      });
    });

    PNotify.notice({
      title: "日志查询完成：",
      text: this.state.log_level,
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
    const { log_level, log_list } = this.state;
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="log_level">日志级别</Label>
            <Input
              type="select"
              name="log_level"
              id="log_level"
              selected={this.state.log_level}
              onChange={this.handleInputChange}
            >
              <option>info</option>
              <option>error</option>
              <option>all</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="log_day">日期：</Label>
            <DatePicker value={moment(this.state.log_day)}
              onChange={this.onChange} />
            <Input
              type="date"
              name="log_day"
              // id="log_day"
              value={this.state.log_day}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <Input type="submit" value="Submit" color="primary"></Input>
          {/* <Button type="primary">Button</Button> */}
        </Form>
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
            {log_list &&
              log_list.map((item, index) => (
                <tr key={index}>
                  <th scope="row"> {index + 1} </th>
                  <td> {log_level} </td>
                  <td> {item} </td>
                  <td>
                    <MyModal buttonLabel="查看" />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default Myform;

import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";

class Timer1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    console.log(this.timerID);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return <Typography>{this.state.date.toLocaleTimeString()}</Typography>;
  }
}

function Timer() {
  const [time, setTime] = useState(new Date());
  function tick() {
    setTime(new Date());
  }
  let timerID;
  useEffect(() => {
    timerID = setInterval(() => tick(), 1000);
    console.log(timerID);
    return () => clearInterval(timerID);
  }, [timerID]);

  return <Typography>{time.toLocaleTimeString()}</Typography>;
}
export default Timer;

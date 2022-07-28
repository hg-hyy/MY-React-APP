import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Routers from "./routes";
import { styled } from "@mui/material/styles";
import Home from "../home/Home";
import Price from "../home/Price";
import Album from "../home/Album";
import Carousel from "../home/Carousel";
import Checkout from "../home/checkout/Checkout";
import NotFound from "../notfound/404";
import Show from "../show/Show";
import Photo from "../photo/Photo";
import Box from "@mui/material/Box";

let ps;
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
function Main(props) {
  const navigate = useNavigate();

  const mainPanel = React.createRef();
  const { open } = props;
  // eslint-disable-next-line
  const [mobileOpen, setMobileOpen] = useState(false);
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false,
  //       // wheelSpeed: 1,
  //       // wheelPropagation: true,
  //       // minScrollbarLength: 20
  //     });
  //     document.body.style.overflow = "hidden";
  //   }
  //   window.addEventListener("resize", resizeFunction);
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //     }
  //     window.removeEventListener("resize", resizeFunction);
  //   };
  // }, [mainPanel]);
  return (
    <ErrorBoundary>
      <Routes>
        {Routers.map((item, index) => {
          return (
            <Route key={index} path={item.path} element={<item.component />} />
          );
        })}
        <Route path="/" element={<Home />}>
          <Route index element={<Carousel />} />
          <Route path="price" element={<Price />} />
          <Route path="album" element={<Album />} />
          <Route path="carousel" element={<Carousel />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/show/*" element={<Show />} />
        <Route path="/photo/*" element={<Photo />} />
        <Route component={NotFound} />
      </Routes>
    </ErrorBoundary>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  data: state.reduxReducer.data,
});

export default connect(mapStateToProps)(Main);

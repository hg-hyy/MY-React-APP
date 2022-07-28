import React from "react";
import Container from "@mui/material/Container";
import { Card, Col, Row } from "antd";
import { makeStyles } from "@mui/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Facebook from "./Facebook";

const r = require.context("../../images", false, /^\.\/.*\.jpg$/);
const images = r.keys().map(r);

const p = { width: 30, height: 20, weight: 60 };
// eslint-disable-next-line
const pArr = Object.keys(p).map((key) => ({
  key,
  value: p[key],
}));
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  ImageList: {
    width: 500,
    height: 400,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
}));

const tileData = [];
images.map((image, index) => {
  return tileData.push({
    img: image,
    title: index + 1,
    author: "author1",
    featured: true,
  });
});
function Home() {
  const classes = useStyles();
  const { Meta } = Card;
  return (
    <Container style={{ padding: 0 }} maxWidth="xl">
      <Row gutter={32} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={8}>
          {/* <div className={classes.root}> */}
          <ImageList rowHeight={200} spacing={1} className={classes.ImageList}>
            {tileData.map((tile) => (
              <ImageListItem
                key={tile.title}
                cols={tile.featured ? 2 : 1}
                rows={tile.featured ? 2 : 1}
              >
                <img src={tile.img} alt={tile.title} />
                <ImageListItemBar
                  title={tile.title}
                  position="top"
                  actionIcon={
                    <IconButton
                      aria-label={`star ${tile.title}`}
                      className={classes.icon}
                    >
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                  className={classes.titleBar}
                />
              </ImageListItem>
            ))}
          </ImageList>
          {/* </div> */}
        </Col>
        <Col span={8}>
          <Facebook />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

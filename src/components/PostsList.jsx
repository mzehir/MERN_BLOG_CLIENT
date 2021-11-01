import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Post from "./Post";
// import gridFour from "../images/grid_four.svg";
// import gridThree from "../images/grid_three.svg";

const useStyles = makeStyles((theme) => ({
  layoutShifter: {
    float: "right",
    margin: theme.spacing(2),
  },
}));

const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const classes = useStyles();

  const [layout, setLayout] = useState("gridThree");

  const calcuteMd = () => {
    return layout === "gridThree" ? 4 : 3;
  };

  return (
    <>
      <div className={classes.layoutShifter}>
        <Button onClick={() => setLayout("gridThree")}>
          3
          {/* <img
            src={gridThree}
            style={{ background: layout === "gridThree" ? "#ccc" : "" }}
            alt="Three Columns Grid Icon"
          /> */}
        </Button>
        <Button onClick={() => setLayout("gridFour")}>
          4
          {/* <img
            src={gridFour}
            style={{ background: layout === "gridFour" ? "#ccc" : "" }}
            alt="Four Columns Grid Icon"
          /> */}
        </Button>
      </div>
      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid item key={post?._id} xs={12} md={calcuteMd()}>
              <Post {...post}></Post>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostsList;

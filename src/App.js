import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/actions/Post";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import PenIcon from "@material-ui/icons/Create";
import PostDetails from "./components/PostDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.container}
              color="inherit"
            ></IconButton>
            <Typography
              variant="h6"
              color="secondary"
              className={classes.title}
            >
              <a href="http://localhost:3000/posts">Blogify</a>
            </Typography>

            <Button
              color="primary"
              variant="outlined"
              startIcon={<PenIcon></PenIcon>}
              onClick={handleOpen}
            >
              Yeni Yazı
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Router>
              <Switch>
                <Route exact path="/posts" component={PostsList} />
                <Route exact path="/posts/:id" component={PostDetails} />
              </Switch>
              <Redirect from="/" to="/posts"></Redirect>
            </Router>
          </Grid>
        </Grid>
      </Container>

      <AddPostForm open={open} handleClose={handleClose}></AddPostForm>
    </>
  );
};

export default App;

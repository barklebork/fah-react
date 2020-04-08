import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideDrawer from "./Drawer/SideDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import DonorsList from "./Donors/DonorsList";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position={"fixed"} className={classes.appBar}>
          <Toolbar>
            <Typography variant={"h6"} noWrap>
              FAH-React
            </Typography>
          </Toolbar>
        </AppBar>

        <nav>
          <SideDrawer />
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {/* Menu routes */}
            <Route path={"/me"}>
              <Typography paragraph>Your stats</Typography>
            </Route>
            <Route path={"/donors"}>
              <DonorsList />
            </Route>
            <Route path={"/teams"}>
              <Typography paragraph>Teams</Typography>
            </Route>
            <Route path={"/clients"}>
              <Typography paragraph>My client</Typography>
            </Route>
            {/* Other routes */}
            <Route path={"/donor"}>
              <Typography paragraph>Donor</Typography>
            </Route>
            {/* Home */}
            <Route path={"/"}>
              <Typography paragraph>Home</Typography>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

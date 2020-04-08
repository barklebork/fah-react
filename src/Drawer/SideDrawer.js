import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { DataUsage, Group, Home, Person, PlayCircleFilled } from "@material-ui/icons";
import DrawerLink from "./DrawerLink";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <DrawerLink to={"/"} icon={Home} label={"Home"} exact />
      </List>
      <Divider />
      <List>
        <DrawerLink to={"/me"} icon={DataUsage} label={"My stats"} />
        <DrawerLink to={"/donors"} icon={Person} label={"Donors"} />
        <DrawerLink to={"/teams"} icon={Group} label={"Teams"} />
      </List>
      <Divider />
      <List>
        <DrawerLink to={"/clients/1"} icon={PlayCircleFilled} label={"Client 1"} />
      </List>
    </Drawer>
  );
}

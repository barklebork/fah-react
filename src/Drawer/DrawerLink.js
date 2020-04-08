import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {ListItemIcon} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

export default function DrawerLink(props) {
  const match = useRouteMatch({
    path: props.to,
    exact: props.exact ?? false
  });

  return (
    <ListItem button component={Link} to={props.to} {...(match ? {selected: true} : {})}>
      <ListItemIcon>{React.createElement(props.icon)}</ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItem>
  );
}

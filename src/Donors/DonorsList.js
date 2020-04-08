import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { getDonors } from "../API/FAH";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import { TableContainer } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  }
}));

export default function DonorsList() {
  const classes = useStyles();

  const [refresh, setRefresh] = useState(true);
  const [showError, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [donors, setDonors] = useState(0);

  if (refresh) {
    setRefresh(false);

    getDonors()
      .then(donors => {
        setTimeout(() => {
          setDonors(donors);
        }, 5000);
      })
      .catch(e => {
        console.log(e);
        setError(true);
      });
  }

  return (<>
    <Box className={classes.root}>
      <Grid container spacing={3} direction={"column"} alignItems={"stretch"}>
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant={"h6"} paragraph>Search a donor</Typography>
            <Grid container justify={"space-between"} alignItems={"baseline"}>
              <Grid item xs={8}>
                <TextField label={"Donor"} value={search} onChange={e => setSearch(e.target.value)} variant={"outlined"} fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label={"Search type"} value={search} onChange={e => setSearch(e.target.value)} variant={"outlined"} fullWidth />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant={"h6"} paragraph>Donors</Typography>
            <TableContainer>
              <Table className={classes.table} size={"small"}>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Donor</TableCell>
                    <TableCell align={"right"}>Credit</TableCell>
                    <TableCell align={"right"}>Work Units</TableCell>
                    <TableCell align={"right"}>Team</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donors !== 0 && donors.results.map((donor, i) => (
                    <TableRow key={i}>
                      <TableCell>{donor.rank}</TableCell>
                      <TableCell>{donor.name}</TableCell>
                      <TableCell align={"right"}>{donor.credit}</TableCell>
                      <TableCell align={"right"}>{donor.wus}</TableCell>
                      <TableCell align={"right"}>{donor.team}</TableCell>
                    </TableRow>
                  ))}
                  {donors === 0 && [...Array(100)].map((e, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell><Skeleton variant={"text"} /></TableCell>
                      <TableCell align={"right"}><Skeleton variant={"text"} /></TableCell>
                      <TableCell align={"right"}><Skeleton variant={"text"} /></TableCell>
                      <TableCell align={"right"}><Skeleton variant={"text"} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>

    <Backdrop className={classes.backdrop} open={showError}>
      {showError && (
          <Alert severity={"error"}>
            Folding@Home API seems to be overloaded, please try later!
          </Alert>
      )}
    </Backdrop>
  </>);
}

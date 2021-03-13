import * as React from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    table: {
        minWidth: 320,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        fontWeight: "bold",
    },
    body: {
        color: "green"
    },
}))(TableCell)

const TitleTableCell = withStyles((theme) => ({
    body: {
        fontWeight: "bold",
    },
}))(TableCell)

export default function EstimatedEarnings(props) {

    function buildRow(name, multiplier) {
        let eth = (daily * multiplier).toFixed(5) + "ETH";
        let eur = "€" + (daily * multiplier * props.ethEur).toFixed(2);
        console.log(eth, props.ethEur);
        return {name, eth, eur};
    }

    let daily = props.ethPerMin * 60 * 24;

    const rows = [
        buildRow('Daily', 1),
        buildRow('Weekly', 7),
        buildRow('Monthly', 30),
        buildRow('Yearly', 365),
    ]


    const classes = useStyles();

    return (
        <Grid container item xs={12} justify="center" styles={{flexBasis: "auto"}}>
            <div className="StatsSubPanelTitle">
                Estimated Earnings
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="right">ETH</StyledTableCell>
                            <StyledTableCell align="right">EUR</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TitleTableCell component="th" scope="row">{row.name}</TitleTableCell>
                                <StyledTableCell align="right">{row.eth}</StyledTableCell>
                                <StyledTableCell align="right">{row.eur}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );

}
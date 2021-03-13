import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const sum = (a, b) => a + b;

function convertToMHs(hashrate) {
    return (hashrate / 1000000).toFixed(2) + " MH/s";
}

function getAverageHashrates(ethermineResponse) {
    let sortedHashrates = ethermineResponse.statistics.sort((a, b) => a.time > b.time);

    let totalHashrates24 = sortedHashrates.map((i) => i.currentHashrate)
        .reduce(sum, 0);

    let totalHashrates12 = sortedHashrates.slice(sortedHashrates.length - 73, sortedHashrates.length - 1).map((i) => i.currentHashrate)
        .reduce(sum, 0);

    let totalHashrates6 = sortedHashrates.slice(sortedHashrates.length - 37, sortedHashrates.length - 1).map((i) => i.currentHashrate)
        .reduce(sum, 0);

    let totalReported = sortedHashrates.map((i) => i.reportedHashrate).reduce(sum, 0);

    return {
        avgReportedHash: totalReported / sortedHashrates.length,
        avgHash24: totalHashrates24 / sortedHashrates.length,
        avgHash12: totalHashrates12 / sortedHashrates.slice(sortedHashrates.length - 73, sortedHashrates.length - 1).length,
        avgHash6: totalHashrates6 / sortedHashrates.slice(sortedHashrates.length - 37, sortedHashrates.length - 1).length
    };
}

export default function Hashrates(props) {

    let avgHashes = getAverageHashrates(props.data);

    return (
        <Grid item xs={12}>
            <Paper style={{padding: "0.3rem"}}>
                <Grid item container xs={12}>
                    <Grid item xs={6}>
                        <div className="Label">Current Hashrate</div>
                        <HashRateData data={props.data.currentStatistics.currentHashrate}/>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="Label">Average Hashrate - 6h</div>
                        <HashRateData data={avgHashes.avgHash6}/>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="Label">Reported Hashrate</div>
                        <HashRateData data={props.data.currentStatistics.reportedHashrate}/>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="Label">Average Hashrate - 12h</div>
                        <HashRateData data={avgHashes.avgHash12}/>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="Label">Reported Hashrate - 24h</div>
                        <HashRateData data={avgHashes.avgReportedHash}/>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="Label">Average Hashrate - 24h</div>
                        <HashRateData data={avgHashes.avgHash24}/>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );

    function HashRateData(props) {

        return <div className="Data">{convertToMHs(props.data)}</div>;


    }

}
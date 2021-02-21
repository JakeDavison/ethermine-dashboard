import * as React from "react";
import StatsNode from "./StatsNode";
import Grid from "@material-ui/core/Grid";

const ETHERMINE_URL = "https://api.ethermine.org/";
const ETH_EUR_URL = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR";

const payoutAmount = 0.1


const sum = (a, b) => a + b;


function fetchEtherDashData(minerId, setEthermineResponse) {
    fetch(ETHERMINE_URL + "miner/" + minerId + "/dashboard")
        .then((r) => r.json())
        .then((body) => setEthermineResponse({status: body.status, data: body.data}));
}

function fetchEtherStatsData(minerId, setEthermineResponse) {
    fetch(ETHERMINE_URL + "miner/" + minerId + "/currentStats")
        .then((r) => r.json())
        .then((body) => setEthermineResponse({status: body.status, data: body.data}));
}

function fetchEthEur(setEthEur) {
    fetch(ETH_EUR_URL)
        .then((r) => r.json())
        .then((body) => setEthEur(body.EUR));
}



function getAverageHashrates(ethermineResponse) {
    let sortedHashrates = ethermineResponse.data.statistics.sort((a, b) => a.time > b.time);

    let totalHashrates24 = sortedHashrates.map((i) => i.currentHashrate)
        .reduce(sum, 0);

    let totalHashrates12 = sortedHashrates.slice(sortedHashrates.length-73, sortedHashrates.length-1).map((i) => i.currentHashrate)
        .reduce(sum, 0);

    let totalHashrates6 = sortedHashrates.slice(sortedHashrates.length-37, sortedHashrates.length-1).map((i) => i.currentHashrate)
        .reduce(sum, 0);

    let totalReported = sortedHashrates.map((i) => i.reportedHashrate).reduce(sum, 0);

    return {
        avgReportedHash: totalReported/sortedHashrates.length,
        avgHash24: totalHashrates24/sortedHashrates.length,
        avgHash12: totalHashrates12/sortedHashrates.slice(sortedHashrates.length-73, sortedHashrates.length-1).length,
        avgHash6: totalHashrates6/sortedHashrates.slice(sortedHashrates.length-37, sortedHashrates.length-1).length
    };
}



export default function Stats(props) {

    function renderStatsPanel() {
        if (etherDashResponse && etherStatsResponse && ethEur) {
            return etherDashResponse.status === "OK" && etherStatsResponse.status === "OK" ?
                renderStatsNodes() : "Couldn't get data from Ethermine, status was: " + etherDashResponse.status;
        } else {
            return null;
        }
    }

    function renderStatsNodes() {

        if (etherDashResponse.data && etherDashResponse.data.currentStatistics && etherStatsResponse.data) {
            let currentStats = etherDashResponse.data.currentStatistics;
            let avgHashes = getAverageHashrates(etherDashResponse);
            let unpaidBalance = (etherStatsResponse.data.unpaid * 1e-18) * ethEur;
            let earnings = etherStatsResponse.data.coinsPerMin * ethEur * 60 * 24;
            let secsToPayout = (0.1 - (etherStatsResponse.data.unpaid * 1e-18))/(etherStatsResponse.data.coinsPerMin/60);
            return (
                <Grid style={{flex: 3}} container spacing={3}>
                    <Grid item xs={4}>
                        <StatsNode label="Unpaid Balance" data={unpaidBalance} dataType="eur"/>
                    </Grid>
                    <Grid item xs={4}>
                        <StatsNode label="Time To Payout" data={secsToPayout} dataType="secs"/>
                    </Grid>
                    <Grid item xs={4}>
                        <StatsNode label="Payout Amount" data={payoutAmount*ethEur} dataType="eur"/>
                    </Grid>
                    <Grid item xs={3}>
                        <StatsNode label="Estimated Earnings Per Day" data={earnings} dataType="eur"/>
                    </Grid>
                    <Grid item xs={3}>
                        <StatsNode label="Estimated Earnings Per Week" data={earnings*7} dataType="eur"/>
                    </Grid>
                    <Grid item xs={3}>
                        <StatsNode label="Estimated Earnings Per Month" data={earnings*30} dataType="eur"/>
                    </Grid>
                    <Grid item xs={3}>
                        <StatsNode label="Estimated Earnings Per Year" data={earnings*365} dataType="eur"/>
                    </Grid>
                    <Grid item xs={4}>
                        <StatsNode label="Current Hashrate" data={currentStats.currentHashrate} dataType="hashrate"/>
                    </Grid>
                    <Grid item xs={4}>
                        <StatsNode label="Reported Hashrate" data={currentStats.reportedHashrate} dataType="hashrate"/>
                    </Grid>
                    <Grid item xs={4}>
                        <StatsNode label="Average Reported Hashrate - Last 24H" data={avgHashes.avgReportedHash} dataType="hashrate"/>
                    </Grid>
                    <Grid item xs={4}>
                        <StatsNode label="Average Hashrate - Last 24h" data={avgHashes.avgHash24} dataType="hashrate"/>
                    </Grid>
                    <Grid item xs={4}>
                        <StatsNode label="Average Hashrate - Last 12h" data={avgHashes.avgHash12} dataType="hashrate"/>
                    </Grid>
                    <Grid item xs={4}>
                        <StatsNode label="Average Hashrate - Last 6h" data={avgHashes.avgHash6} dataType="hashrate"/>
                    </Grid>
                </Grid>
            );
        }
        return "No data in Ethermine response.";
    }

    var minerId = props.minerId;

    const [etherDashResponse, setEtherDashResponse] = React.useState(null);
    const [etherStatsResponse, setEtherStatsResponse] = React.useState(null);
    const [ethEur, setEthEur] = React.useState(null);

    React.useEffect(() => {
        fetchEtherDashData(minerId, setEtherDashResponse);
        fetchEtherStatsData(minerId, setEtherStatsResponse);
        if(!ethEur) {fetchEthEur(setEthEur);}
    }, [minerId]);


    return (
        <div>
            {renderStatsPanel()}
        </div>
    );
}
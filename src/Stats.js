import * as React from "react";
import StatsNode from "./StatsSubPanels/StatsNode";
import './Stats.css';
import Grid from "@material-ui/core/Grid";
import {useParams} from "react-router-dom";
import EstimatedEarnings from "./StatsSubPanels/EstimatedEarnings";
import Payouts from "./StatsSubPanels/Payouts";
import HashRates from "./StatsSubPanels/HashRates";

const ETHERMINE_URL = "https://api.ethermine.org/";
const ETH_EUR_URL = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR";


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

export default function Stats(props) {

    let {minerId} = useParams();

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
            const ethPerMin = etherStatsResponse.data.coinsPerMin;

            return (
                <Grid container spacing={2} justify="center">
                    <Payouts unpaid={etherStatsResponse.data.unpaid} ethPerMin={ethPerMin} ethEur={ethEur}/>
                    <EstimatedEarnings ethPerMin={etherStatsResponse.data.coinsPerMin} ethEur={ethEur}/>
                    <HashRates data={etherDashResponse.data}/>
                </Grid>
            );
        }
        return "No data in Ethermine response.";
    }

    const [etherDashResponse, setEtherDashResponse] = React.useState(null);
    const [etherStatsResponse, setEtherStatsResponse] = React.useState(null);
    const [ethEur, setEthEur] = React.useState(null);

    React.useEffect(() => {
        fetchEtherDashData(minerId, setEtherDashResponse);
        fetchEtherStatsData(minerId, setEtherStatsResponse);
        if (!ethEur) {
            fetchEthEur(setEthEur);
        }
    }, [minerId]);


    return (
        <div className="StatsPanel">
            {renderStatsPanel()}
        </div>
    );
}
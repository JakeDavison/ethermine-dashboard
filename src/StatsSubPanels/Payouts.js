import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const payoutThreshold = 0.1


function getSecsToWeekend() {

    const now = Date.now();
    var weekend = 1614902399000;

    while (weekend < now) {
        weekend += (1000 * 60 * 60 * 24 * 7 * 2);
    }

    return (weekend - now) / 1000;

}



export default function Payouts(props) {

    function scheduleCountdown() {
        const interval = setInterval(() => {
            secsToPayout -= 1;
            generateCountdown();
        }, 1000);
        return () => clearInterval(interval);
    }

    function generateCountdown() {
        let total = secsToPayout;
        let days = Math.floor(total / (60 * 60 * 24));
        total -= days * 60 * 60 * 24;
        let hours = Math.floor(total / (60 * 60));
        total -= hours * 60 * 60;
        let mins = Math.floor(total / 60);
        total -= mins * 60;
        let secs = Math.floor(total);
        setDays(days + " day" + (days !== 1 ? "s" : ""));
        setTime(hours + "h " + mins + "m " + secs + "s");
    }

    React.useEffect(() => {
        scheduleCountdown();
    }, []);

    const [days, setDays] = React.useState(null);
    const [time, setTime] = React.useState(null);

    let unpaidBalance = props.unpaid * 1e-18;

    let secsToThreshold = (0.1 - (props.unpaid * 1e-18)) / (props.ethPerMin / 60);
    let secsToWeekend = getSecsToWeekend();
    let secsToPayout = Math.min(secsToThreshold, secsToWeekend);

    let payoutAmount = secsToWeekend < secsToThreshold ? (((secsToWeekend / 60) * props.ethPerMin) + unpaidBalance) : payoutThreshold;

    return (
        <Grid item xs={12}>
            <Paper style={{padding: "0.3rem"}}>
                <Grid item container xs={12}>
                    <Grid item xs={4}>
                        <div className="Label">Unpaid Balance</div>
                        <div className="Data">{unpaidBalance.toFixed(6) + " ETH"}</div>
                        <div className="Data">{"€" + (unpaidBalance * props.ethEur).toFixed(2)}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="Label">Payout Amount</div>
                        <div className="Data">{payoutAmount.toFixed(6) + " ETH"}</div>
                        <div className="Data">{"€" + (payoutAmount * props.ethEur).toFixed(2)}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="Label">Time to Payout</div>
                        <div className="Data">{days}</div>
                        <div className="Data">{time}</div>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );

}
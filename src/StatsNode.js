import * as React from "react";
import './StatsNode.css';


export default function StatsNode(props) {

    var data = props.data;

    const [value, setValue] = React.useState();

    function scheduleCountdown() {
        const interval = setInterval(() => {
            data -= 1;
            generateCountdown();
        }, 1000);
        return () => clearInterval(interval);
    }

    React.useEffect(() => {
        if (props.dataType === "secs") {
            scheduleCountdown();
        }
    }, []);

    function generateCountdown() {
        let total = data;
        let days = Math.floor(total / (60 * 60 * 24));
        total -= days * 60 * 60 * 24;
        let hours = Math.floor(total / (60 * 60));
        total -= hours * 60 * 60;
        let mins = Math.floor(total / 60);
        total -= mins * 60;
        let secs = Math.floor(total);
        setValue((days ? (days + " Days ") : "") + (hours ? (hours + " Hours \n") : "") + (mins ? (mins + " Mins ") : "") + (secs + " Secs"));
    }

    if (!value) {
        switch (props.dataType) {
            case "hashrate":
                setValue((parseFloat(data) / 1000000).toFixed(2) + " MH/s");
                break;
            case "eur":
                setValue("€" + parseFloat(data).toFixed(2));
                break;
            case "secs":
                generateCountdown();
                break;
        }
    }

    return (
        <div>
            <div className="Data">
                {value}
            </div>
            <div className="Label">
                {props.label}
            </div>
        </div>
    );
}
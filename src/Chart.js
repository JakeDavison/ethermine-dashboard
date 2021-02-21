import * as React from "react";
import {chartWidget} from "./charwidget";
import './Chart.css';

export default function EthChart() {

    return(
        <div dangerouslySetInnerHTML={chartWidget}>
        </div>
    );
}
import './App.css';
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import Stats from "./Stats";
import EthChart from "./Chart";

function App() {

    const [minerId, setMinerId] = React.useState("14b4DAB2b580BA2Ac1849055Ae8820Be87d8564E");



    return (
        <div className="App">
            <TextField
                className="MinerIdInput"
                variant="outlined"
                value={minerId}
                onChange={(e) => setMinerId(e.target.value)}
                inputProps={{style: {textAlign: 'center'}}}
            />
            <div className="App-header">
                {/*<EthChart/>*/}
                <Stats minerId={minerId}/>
            </div>
        </div>
    );
}

export default App;

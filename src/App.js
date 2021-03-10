import './App.css';
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import Stats from "./Stats";
import EthChart from "./EthChart";
import {Switch, Route, useHistory} from "react-router-dom";

function App() {

    const [minerIdInput, setMinerIdInput] = React.useState(null);

    const history = useHistory();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            history.push('/' + minerIdInput);
        }
    }

    return (
        <div className="App">
            <div className="App-header">
                <EthChart/>
                <Switch>
                    <Route path="/:minerId">
                        <Stats/>
                    </Route>
                    <Route path="/">
                        <TextField
                            className="MinerIdInput"
                            variant="outlined"
                            value={minerIdInput}
                            onKeyDown={(e) => handleKeyDown(e)}
                            onChange={(e) => setMinerIdInput(e.target.value)}
                            inputProps={{style: {textAlign: 'center'}}}
                        />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;

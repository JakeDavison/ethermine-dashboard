import './App.css';
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import Stats from "./Stats";
import EthChart from "./EthChart";
import {Switch, Route, useHistory} from "react-router-dom";
import useCookie from 'react-use-cookie';

function App() {

    const [minerIdInput, setMinerIdInput] = React.useState(null);
    const [userWalletCookie, setUserWalletCookie] = useCookie("user-wallet", null);

    const history = useHistory();

    if (userWalletCookie) {
        history.push('/' + userWalletCookie);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            history.push('/' + minerIdInput);
            setUserWalletCookie(minerIdInput);
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

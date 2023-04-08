import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import LAYOUTS from "./layouts";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route
                    path="/operation/:type?"
                    component={LAYOUTS.Operations}
                />
                <Route path="/category/:type?" component={LAYOUTS.Categories} />
                <Route path="/bill/:type?" component={LAYOUTS.Bills} />
                <Route path="/login/:type?" component={LAYOUTS.Login} />
                <Route path="/history" component={LAYOUTS.History} />
                <Route path="/settings" component={LAYOUTS.Settings} />
                <Route path="/" exact component={LAYOUTS.Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;

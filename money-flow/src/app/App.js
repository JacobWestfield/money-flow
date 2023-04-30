import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import LAYOUTS from "./layouts";
import { useDispatch } from "react-redux";
import { loadBills } from "./redux/reducers/billsReducer";
import { loadCategories } from "./redux/reducers/categoriesReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadOperations } from "./redux/reducers/operationsReducer";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBills());
        dispatch(loadCategories());
        dispatch(loadOperations());
    }, []);

    return (
        <div className="App">
            <ToastContainer />
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

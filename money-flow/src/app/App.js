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
import { loadUsersList } from "./redux/reducers/userReducer";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBills());
        dispatch(loadCategories());
        dispatch(loadOperations());
        dispatch(loadUsersList());
    }, []);

    return (
        <div className="App">
            <ToastContainer />
            <NavBar />
            <Switch>
                <ProtectedRoute
                    path="/operation/:type?"
                    component={LAYOUTS.Operations}
                />
                <ProtectedRoute
                    path="/category/:type?"
                    component={LAYOUTS.Categories}
                />
                <ProtectedRoute path="/bill/:type?" component={LAYOUTS.Bills} />

                <ProtectedRoute path="/history" component={LAYOUTS.History} />
                <ProtectedRoute path="/settings" component={LAYOUTS.Settings} />
                <Route path="/login/:type?" component={LAYOUTS.Login} />
                <ProtectedRoute path="/" exact component={LAYOUTS.Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;

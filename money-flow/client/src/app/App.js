import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import LAYOUTS from "./layouts";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import { getIsLoggedIn, loadUsersList } from "./redux/reducers/userReducer";
import { loadBills } from "./redux/reducers/billsReducer";
import { loadCategories } from "./redux/reducers/categoriesReducer";
function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadBills());
            dispatch(loadCategories());
            dispatch(loadCategories());
        }
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

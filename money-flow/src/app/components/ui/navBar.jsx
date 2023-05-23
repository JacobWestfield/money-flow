import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getCurrentUserData,
    getIsLoggedIn,
    getUsersLoadingStatus
} from "../../redux/reducers/userReducer";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const loadingUsersStatus = useSelector(getUsersLoadingStatus());
    const user = useSelector(getCurrentUserData());

    return (
        <nav>
            <div className="container mb-5 d-flex justify-content-between">
                <ul className="nav">
                    <li className="nav-item">
                        <Link
                            className="nav-link link-warning"
                            aria-current="page"
                            to="/"
                        >
                            Main
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        ""
                    ) : (
                        <li className="nav-item">
                            <Link
                                className="nav-link link-warning"
                                aria-current="page"
                                to="/login"
                            >
                                Login
                            </Link>
                        </li>
                    )}

                    <li className="nav-item">
                        <Link
                            className="nav-link link-warning"
                            aria-current="page"
                            to="/history"
                        >
                            History
                        </Link>
                    </li>
                </ul>
                <div className="mt-4">
                    <h5>
                        You work as:{" "}
                        {!isLoggedIn
                            ? "Sign In to use this app"
                            : loadingUsersStatus
                            ? "Loading..."
                            : user.name}
                    </h5>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

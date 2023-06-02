import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getCurrentUserData,
    getIsLoggedIn,
    logOut
} from "../../redux/reducers/userReducer";
import Loader from "../../HOC/loader";

const NavBar = () => {
    const users = useSelector((state) => state.user.entities);
    const isLoggedIn = useSelector(getIsLoggedIn());
    const user = useSelector(getCurrentUserData());

    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logOut());
    };

    return (
        <Loader>
            <nav>
                <div className="container mb-5 d-flex justify-content-between">
                    <ul className="nav">
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <Link
                                    className="nav-link link-warning"
                                    aria-current="page"
                                    to="/"
                                >
                                    Main
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
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
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <Link
                                    className="nav-link link-warning"
                                    aria-current="page"
                                    to="/history"
                                >
                                    History
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                    </ul>
                    {users.length ? (
                        <div className="mt-4 d-flex align-items-center">
                            <h5>{"You work as: " + user.name}</h5>
                            <button
                                className="btn btn-primary ms-4"
                                onClick={handleLogout}
                            >
                                Выход
                            </button>
                        </div>
                    ) : (
                        <h5 className="mt-4">Sign In to use this app</h5>
                    )}
                </div>
            </nav>
        </Loader>
    );
};

export default NavBar;

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
    const isLoggedIn = useSelector(getIsLoggedIn());
    const user = useSelector(getCurrentUserData());

    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logOut());
    };

    return (
        <>
            <div className="navbar container col-md-10 mb-4 mt-4 d-flex justify-content-between align-center">
                <Loader>
                    <nav className="d-flex align-items-center">
                        <div className=" d-flex justify-content-between align-items-center">
                            <ul className="nav">
                                {isLoggedIn ? (
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link link-primary"
                                            aria-current="page"
                                            to="/"
                                        >
                                            <h3>Main</h3>
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
                                            className="nav-link link-primary"
                                            aria-current="page"
                                            to="/login"
                                        >
                                            <h3>Login</h3>
                                        </Link>
                                    </li>
                                )}
                                {isLoggedIn ? (
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link link-primary"
                                            aria-current="page"
                                            to="/history"
                                        >
                                            <h3>History</h3>
                                        </Link>
                                    </li>
                                ) : (
                                    ""
                                )}
                            </ul>
                        </div>
                    </nav>
                </Loader>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <div className="d-flex align-items-center">
                            <h5 className="link-primary">
                                {"You work as: " + user?.name}
                            </h5>
                        </div>
                    ) : (
                        <h5 className="mt-4">Sign In to use this app</h5>
                    )}
                    {isLoggedIn ? (
                        <Link
                            className="nav-link link-warning p-4"
                            aria-current="page"
                            to="/settings"
                        >
                            <button className="btn btn-primary">
                                Настройки пользователя
                            </button>
                        </Link>
                    ) : null}
                    <div className="p-4">
                        <button
                            className="btn btn-primary"
                            onClick={handleLogout}
                        >
                            Выход
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;

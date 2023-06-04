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
            <div className="container mb-5 d-flex justify-content-between">
                <Loader>
                    <nav className="flex-grow-1">
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
                            {isLoggedIn ? (
                                <div className="mt-4 d-flex align-items-center">
                                    <h5>{"You work as: " + user?.name}</h5>
                                </div>
                            ) : (
                                <h5 className="mt-4">
                                    Sign In to use this app
                                </h5>
                            )}
                        </div>
                    </nav>
                    {isLoggedIn ? (
                        <Link
                            className="nav-link link-warning"
                            aria-current="page"
                            to="/settings"
                        >
                            <button className="btn btn-primary ms-4 mt-4">
                                Настройки пользователя
                            </button>
                        </Link>
                    ) : null}
                </Loader>

                <div>
                    <button
                        className="btn btn-primary ms-4 mt-4"
                        onClick={handleLogout}
                    >
                        Выход
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavBar;

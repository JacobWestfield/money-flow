import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div className="container mb-5">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/">
                        Main
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link "
                        aria-current="page"
                        to="/operation"
                    >
                        New Operation / Edit Operation
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link "
                        aria-current="page"
                        to="/category"
                    >
                        New Category / Edit Category
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/bill">
                        New Bill / Edit Bill
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link "
                        aria-current="page"
                        to="/history"
                    >
                        History
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link "
                        aria-current="page"
                        to="/settings"
                    >
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;

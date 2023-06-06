import React from "react";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import useTheme from "../../../hooks/themeHook";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    const [theme, toggleTheme] = useTheme();

    return (
        <table
            className={`table table-sm ${
                theme === "dark" ? "table-dark" : "table-light"
            } table-hover table-responsive`}
        >
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data }} />
                    <button
                        className="btn btn-primary mt-4"
                        onClick={toggleTheme}
                    >
                        Сменить тему
                    </button>
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import getDate from "../../../utils/getDate";

const DateComponent = ({ operation }) => {
    const loadingOperation = useSelector((state) => state.operation.loading);
    if (!loadingOperation && operation) {
        return <p>{getDate(operation.date)}</p>;
    } else return "Loading...";
};

DateComponent.propTypes = {
    operation: PropTypes.object
};

export default DateComponent;

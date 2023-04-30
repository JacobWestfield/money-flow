import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Bill = ({ operation }) => {
    const bills = useSelector((state) => state.bill.entities);
    const bill = bills.find((bill) => bill._id === operation.bill);
    const loadingBill = useSelector((state) => state.bill.loading);
    if (bills.length === 0) {
        return "Нет счетов";
    }
    if (!loadingBill && bills.length) {
        return <p>{bill.name}</p>;
    } else return "Loading...";
};

Bill.propTypes = {
    operation: PropTypes.object
};

export default Bill;

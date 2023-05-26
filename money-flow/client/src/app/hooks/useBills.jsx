import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import billService from "../services/billService";

const BillContext = React.createContext();

export const useBill = () => {
    return useContext(BillContext);
};

const BillProvider = ({ children }) => {
    const [bills, setBills] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getBills();
    }, []);
    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
    }, [error]);
    async function getBills() {
        try {
            const { content } = await billService.get();
            setBills(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    return (
        <BillContext.Provider value={{ bills }}>
            {!isLoading ? children : "Loading..."}
        </BillContext.Provider>
    );
};

BillProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BillProvider;

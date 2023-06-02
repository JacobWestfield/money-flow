import React from "react";
import PropTypes from "prop-types";

const Commentary = ({ operation }) => {
    return (
        <p className="text-break" title={operation.commentary}>
            {operation.commentary}
        </p>
    );
};

Commentary.propTypes = {
    operation: PropTypes.object
};

export default Commentary;

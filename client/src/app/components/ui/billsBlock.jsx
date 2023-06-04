import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BillsBlock = ({ bills }) => {
    if (!bills) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <div className="container col-md-5 shadow p-4">
                <h3>Счета</h3>{" "}
                <Link to="/bill/createbill">
                    <button className="btn btn-primary mb-4">
                        Создать новый счет
                    </button>
                </Link>
                {bills.length === 0 ? (
                    <h1>У вас еще нет счетов</h1>
                ) : (
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Название счета</th>
                                <th scope="col">Тип счета</th>
                            </tr>
                            {bills.map((bill) => {
                                return (
                                    <tr key={bill._id}>
                                        <td>{bill.name}</td>
                                        <td>{bill.type}</td>
                                    </tr>
                                );
                            })}
                        </thead>
                    </table>
                )}
            </div>
        </>
    );
};

BillsBlock.propTypes = {
    bills: PropTypes.array
};

export default BillsBlock;

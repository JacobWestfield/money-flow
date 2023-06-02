import React from "react";
import OperationsListPage from "../components/common/historyPage/operationsListPage";
import { Link } from "react-router-dom";

const History = () => {
    return (
        <>
            <div className="container col-md-10  shadow p-4 d-flex flex-column">
                <div className="d-flex justify-content-between">
                    <div>
                        <h1>История операций</h1>
                    </div>
                    <div>
                        <Link to="/operation/createoperation">
                            <button className="btn btn-primary mb-4">
                                Создать/изменить операцию
                            </button>
                        </Link>
                    </div>
                </div>

                <OperationsListPage />
            </div>
        </>
    );
};

export default History;

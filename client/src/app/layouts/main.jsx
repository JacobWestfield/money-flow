import React, { useEffect } from "react";
import BillsBlock from "../components/ui/billsBlock";
import CategoriesBlock from "../components/ui/categoriesBlock";
import { useDispatch, useSelector } from "react-redux";
import { loadBills } from "../redux/reducers/billsReducer";
import { loadCategories } from "../redux/reducers/categoriesReducer";
import { loadOperations } from "../redux/reducers/operationsReducer";
import AnalyticsBlock from "../components/ui/analyticsBlock";
import { Link } from "react-router-dom";

const Main = () => {
    const dispatch = useDispatch();

    const operations = useSelector((state) => state.operation.entities);
    const bills = useSelector((state) => state.bill.entities);
    const categories = useSelector((state) => state.category.entities);
    const operationsLoading = useSelector((state) => state.operation.loading);
    const billsLoading = useSelector((state) => state.bill.loading);
    const categoriesLoading = useSelector((state) => state.category.loading);

    useEffect(() => {
        dispatch(loadBills());
        dispatch(loadCategories());
        dispatch(loadOperations());
    }, []);

    if (billsLoading || categoriesLoading || operationsLoading) {
        return <h1 className="text-center">Loading...</h1>;
    }

    return (
        <>
            <div className="container col-md-10 shadow p-4 ">
                <h1 className="display-1 text-center mb-4">Money flow</h1>
                <div className="d-flex mb-4">
                    <BillsBlock bills={bills} />
                    <CategoriesBlock categories={categories} />
                </div>
                <div className="d-flex flex-column align-content-center">
                    <div className="align-self-center">
                        <Link to="/operation/createoperation">
                            <button className="btn btn-primary">
                                Создать новую операцию
                            </button>
                        </Link>
                    </div>

                    <AnalyticsBlock
                        bills={bills}
                        categories={categories}
                        operations={operations}
                    />
                </div>
            </div>
        </>
    );
};

export default Main;

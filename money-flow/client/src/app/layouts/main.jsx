import React, { useEffect } from "react";
import BillsBlock from "../components/ui/billsBlock";
import CategoriesBlock from "../components/ui/categoriesBlock";
import { useDispatch, useSelector } from "react-redux";
import { loadBills } from "../redux/reducers/billsReducer";
import { loadCategories } from "../redux/reducers/categoriesReducer";
import { loadOperations } from "../redux/reducers/operationsReducer";
import AnalyticsBlock from "../components/ui/analyticsBlock";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserId } from "../redux/reducers/userReducer";

const Main = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());

    const operations = useSelector((state) => state.operation.entities);
    const bills = useSelector((state) => state.bill.entities);
    const categories = useSelector((state) => state.category.entities);
    const operationsLoading = useSelector((state) => state.operation.loading);
    const billsLoading = useSelector((state) => state.bill.loading);
    const categoriesLoading = useSelector((state) => state.category.loading);

    const filteredBills = bills.filter((bill) => bill.userId === currentUserId);
    const filteredCategories = categories.filter(
        (category) => category.userId === currentUserId
    );
    const filteredOperations = operations.filter(
        (category) => category.userId === currentUserId
    );

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
                <h1 className="display-1 text-center">Money flow</h1>
                <h3 className="mb-4 text-center">
                    ReactJS, Redux Toolkit and Victory Library based Web
                    Application for simple and easy money analytics
                </h3>
                <div className="d-flex mb-4">
                    <BillsBlock bills={filteredBills} />
                    <CategoriesBlock categories={filteredCategories} />
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
                        bills={filteredBills}
                        categories={filteredCategories}
                        operations={filteredOperations}
                    />
                </div>
            </div>
        </>
    );
};

export default Main;

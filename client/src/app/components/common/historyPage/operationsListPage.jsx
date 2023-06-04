/* eslint-disable */
import React, { useEffect, useState } from "react";
import OperationsTable from "./operationsTable";
import { paginate } from "../../../utils/paginate";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteOperation,
    loadOperations
} from "../../../redux/reducers/operationsReducer";
import Pagination from "./pagination";
import GroupList from "./groupList";
import getDate from "../../../utils/getDate";
import { nanoid } from "@reduxjs/toolkit";
import { getCurrentUserId } from "../../../redux/reducers/userReducer";

const OperationsListPage = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    const operations = useSelector((state) => state.operation.entities);
    const bills = useSelector((state) => state.bill.entities);
    const categories = useSelector((state) => state.category.entities);
    const operationsLoading = useSelector((state) => state.operation.loading);

    const filteredBills = bills.filter((bill) => bill.userId === currentUserId);
    const filteredCategories = categories.filter(
        (category) => category.userId === currentUserId
    );
    const filteredOperationsList = operations.filter(
        (category) => category.userId === currentUserId
    );

    const dateStamps = operations
        ? filteredOperationsList.map((el) => getDate(el.date))
        : [];
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }
    const datesList = dateStamps
        .filter(onlyUnique)
        .map((el) => new Object({ _id: nanoid(), name: el }));

    useEffect(() => {
        dispatch(loadOperations());
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBill, setSelectedBill] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    const handleDelete = (operationId) => {
        dispatch(deleteOperation(operationId._id));
        console.log(operationId._id);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBill, selectedCategory, selectedDate]);

    const handleBillSelect = (item) => {
        console.log(item);
        setSelectedBill(item);
    };
    const handleCategorySelect = (item) => {
        console.log(item);
        setSelectedCategory(item);
    };
    const handleDateSelect = (item) => {
        setSelectedDate(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        console.log(item);
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedBill();
        setSelectedCategory();
        setSelectedDate();
    };

    if (operationsLoading) {
        return <h1 className="text-center">Loading...</h1>;
    }

    if (operations) {
        function filterOperations(data) {
            let filteredOperations = data;

            if (selectedBill) {
                filteredOperations = data.filter(
                    (operation) => operation.bill === selectedBill._id
                );
            }
            if (selectedCategory) {
                filteredOperations = data.filter(
                    (operation) => operation.category === selectedCategory._id
                );
            }
            if (selectedDate) {
                filteredOperations = data.filter(
                    (operation) => getDate(operation.date) === selectedDate.name
                );
            }
            return filteredOperations;
        }
        const filteredOperations = filterOperations(filteredOperationsList);
        const count = filteredOperations.length;
        const sortedOperations = _.orderBy(
            filteredOperations,
            [sortBy.path],
            [sortBy.order]
        );
        const operationsCrop = paginate(
            sortedOperations,
            currentPage,
            pageSize
        );

        return (
            <div className="d-flex justify-content-center flex-column">
                <div className="d-flex mb-4">
                    <p className="text-center me-4 display-6">Фильтры</p>
                    <div className="d-flex">
                        <div className="d-flex flex-column">
                            <p className="text-center">По счету</p>
                            <GroupList
                                selectedItem={selectedBill}
                                items={filteredBills}
                                onItemSelect={handleBillSelect}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <p className="text-center">По категории</p>
                            <GroupList
                                selectedItem={selectedCategory}
                                items={filteredCategories}
                                onItemSelect={handleCategorySelect}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <p className="text-center">По дате</p>
                            <GroupList
                                selectedItem={selectedDate}
                                items={datesList}
                                onItemSelect={handleDateSelect}
                            />
                            <div className="d-flex flex-column flex-shrink-0 p-3">
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={clearFilter}
                                >
                                    {" "}
                                    Очистить фильтр
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    {filteredOperationsList.length === 0 ? (
                        <h1>У Вас пока еще не было операций. Создайте новую</h1>
                    ) : filteredOperations.length === 0 ? (
                        <h1>По заданному фильтру не найдено результатов</h1>
                    ) : (
                        count > 0 && (
                            <OperationsTable
                                operations={operationsCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                            />
                        )
                    )}
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>{" "}
                </div>
            </div>
        );
    }
    return <h1 className="display-1 text-center">Loading...</h1>;
};

export default OperationsListPage;

/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import Bill from "../table/bill";
import Category from "../table/category";
import DateComponent from "../table/date";
import Commentary from "../table/commentary";

const OperationsTable = ({
    operations,
    onSort,
    selectedSort,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Название операции"
        },
        category: {
            path: "category",
            name: "Категория",
            component: (operation) => <Category operation={operation} />
        },
        bill: {
            path: "bill",
            name: "Счет",
            component: (operation) => <Bill operation={operation} />
        },
        date: {
            path: "date",
            name: "Дата операции",
            component: (operation) => <DateComponent operation={operation} />
        },
        value: { path: "value", name: "Сумма" },
        commentaty: {
            path: "commentary",
            name: "Комментарий",
            component: (operation) => <Commentary operation={operation} />
        },
        deleteButton: {
            component: (operation) => (
                <button
                    className="btn btn-primary"
                    onClick={() => onDelete(operation)}
                >
                    Удалить
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={operations}
        />
    );
};

OperationsTable.propTypes = {
    operations: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default OperationsTable;

import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "./textField";
import SelectField from "./selectField";
import { useDispatch, useSelector } from "react-redux";
import { loadBills } from "../../../redux/reducers/billsReducer";
import { loadCategories } from "../../../redux/reducers/categoriesReducer";
import {
    updateOperation,
    loadOperations,
    deleteOperation
} from "../../../redux/reducers/operationsReducer";
import { toast } from "react-toastify";

const EditOperationForm = () => {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const operations = useSelector((state) => state.operation.entities);
    const bills = useSelector((state) => state.bill.entities);
    const categories = useSelector((state) => state.category.entities);
    const operationsLoading = useSelector((state) => state.operation.loading);
    const billsLoading = useSelector((state) => state.bill.loading);
    const categoriesLoading = useSelector((state) => state.category.loading);

    const operationsList = operations.map((operation) => ({
        label: operation.name,
        value: operation._id
    }));
    const billsList = bills.map((bill) => ({
        label: bill.name,
        value: bill._id
    }));
    const categoriesList = categories.map((category) => ({
        label: category.name,
        value: category._id
    }));
    const [data, setData] = useState({
        bill: "",
        category: "",
        value: "",
        commentary: "",
        date: "",
        name: "",
        _id: ""
    });

    useEffect(() => {
        dispatch(loadBills());
        dispatch(loadCategories());
        dispatch(loadOperations());
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        bill: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        category: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        value: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        commentary: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        dispatch(updateOperation(data));
    };

    const handleDelete = (id) => {
        if (errors._id) {
            toast("Choose operation");
            return;
        }
        dispatch(deleteOperation(id));
    };

    if (billsLoading || categoriesLoading || operationsLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Выберите операцию"
                    name="_id"
                    defaultOption=""
                    options={operationsList}
                    onChange={handleChange}
                    error={errors.operation}
                />
                <SelectField
                    label="Выберите счёт"
                    name="bill"
                    defaultOption=""
                    options={billsList}
                    onChange={handleChange}
                    error={errors.bill}
                />
                <SelectField
                    label="Выберите категорию"
                    name="category"
                    defaultOption=""
                    options={categoriesList}
                    onChange={handleChange}
                    error={errors.category}
                />
                <TextField
                    label="Введите название операции"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Введите сумму"
                    name="value"
                    value={data.value}
                    onChange={handleChange}
                    error={errors.value}
                />
                <TextField
                    label="Добавьте комментарий"
                    name="commentary"
                    value={data.commentary}
                    onChange={handleChange}
                    error={errors.commentary}
                />
                <button
                    className="btn btn-primary w-100 mx-auto mb-4"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
            <button
                onClick={() => handleDelete(data._id)}
                className="btn btn-danger w-100 mx-auto"
                type="submit"
            >
                Delete
            </button>
        </>
    );
};

export default EditOperationForm;

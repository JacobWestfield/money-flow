import React, { useState, useEffect } from "react";
import TextField from "./textField";
import SelectField from "./selectField";
import { useDispatch, useSelector } from "react-redux";
import { loadBills } from "../../../redux/reducers/billsReducer";
import { loadCategories } from "../../../redux/reducers/categoriesReducer";
import { nanoid } from "@reduxjs/toolkit";
import { validator } from "../../../utils/validator";
import { createOperation } from "../../../redux/reducers/operationsReducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserId } from "../../../redux/reducers/userReducer";

const NewOperationForm = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const bills = useSelector((state) => state.bill.entities);
    const categories = useSelector((state) => state.category.entities);
    const billsLoading = useSelector((state) => state.bill.loading);
    const categoriesLoading = useSelector((state) => state.category.loading);

    const filteredBills = bills.filter((bill) => bill.userId === currentUserId);
    const filteredCategories = categories.filter(
        (category) => category.userId === currentUserId
    );

    const billsList = filteredBills.map((bill) => ({
        label: bill.name,
        value: bill._id
    }));
    const categoriesList = filteredCategories.map((category) => ({
        label: category.name,
        value: category._id
    }));

    useEffect(() => {
        dispatch(loadBills());
        dispatch(loadCategories());
    }, []);

    const [data, setData] = useState({
        bill: "",
        category: "",
        value: "",
        commentary: "",
        _id: "",
        date: "",
        name: "",
        userId: currentUserId
    });

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            _id: nanoid(),
            date: Date.now(),
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
        dispatch(createOperation(data));
        history.push("/history");
    };

    if (billsLoading || categoriesLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
        </>
    );
};

export default NewOperationForm;

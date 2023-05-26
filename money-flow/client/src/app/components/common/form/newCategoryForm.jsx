import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "./textField";
import SelectField from "./selectField";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { createCategory } from "../../../redux/reducers/categoriesReducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserId } from "../../../redux/reducers/userReducer";

const NewCategoryForm = () => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        type: "",
        _id: "",
        userId: currentUser
    });

    const types = [
        { label: "Доход", value: "Income" },
        { label: "Расход", value: "Outcome" }
    ];
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            _id: nanoid(),
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            },
            min: {
                message: "Название должно состоять хотябы из 3-х символов",
                value: 3
            }
        },
        type: {
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
        dispatch(createCategory(data));
        history.push("/");
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Название категории"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <SelectField
                    label="Выберите тип категории"
                    name="type"
                    defaultOption=""
                    options={types}
                    onChange={handleChange}
                    error={errors.type}
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

export default NewCategoryForm;
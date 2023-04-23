import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "./textField";
import SelectField from "./selectField";

const EditCategoryForm = () => {
    const [data, setData] = useState({
        name: "",
        type: "",
        selectedCateogry: ""
    });
    // поменять мок дату на бэк
    const types = [
        { value: "Income", label: "Доход" },
        { value: "Outcome", label: "Расход" }
    ];
    const existingCategories = [
        { value: "Income", label: "Работа" },
        { value: "Outcome", label: "Покупки в магазине" }
    ];
    const [errors, setErrors] = useState({});
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
            },
            min: {
                message: "Название должно состоять хотябы из 3-х символов",
                value: 3
            }
        },
        type: {
            isRequired: {
                message: "Выбор обязателен"
            }
        },
        selectedCategory: {
            isRequired: {
                message: "Выбор обязателен"
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Выберите категорию, которую хотите изменить"
                    name="selectedCategory"
                    defaultOption=""
                    options={existingCategories}
                    onChange={handleChange}
                    error={errors.selectedCategory}
                />
                <TextField
                    label="Новое название категории"
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

export default EditCategoryForm;

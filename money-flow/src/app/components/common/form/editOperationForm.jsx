import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "./textField";
import SelectField from "./selectField";

const EditOperationForm = () => {
    const [data, setData] = useState({
        bill: "",
        category: "",
        type: "",
        value: "",
        commentary: ""
    });
    const types = [
        { value: "Income", label: "Доход" },
        { value: "Outcome", label: "Расход" }
    ];
    const categories = [{ label: "Работа" }];
    const bills = [{ label: "Долларовый счет", value: "Dollar" }];
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
                    label="Выберите счёт"
                    name="bill"
                    defaultOption=""
                    options={bills}
                    onChange={handleChange}
                    error={errors.bill}
                />
                <SelectField
                    label="Выберите категорию"
                    name="category"
                    defaultOption=""
                    options={categories}
                    onChange={handleChange}
                    error={errors.category}
                />
                <SelectField
                    label="Выберите тип операции"
                    name="type"
                    defaultOption=""
                    options={types}
                    onChange={handleChange}
                    error={errors.type}
                />
                <TextField
                    label="Введите сумму"
                    name="name"
                    value={data.value}
                    onChange={handleChange}
                    error={errors.value}
                />
                <TextField
                    label="Добавьте комментарий"
                    name="name"
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

export default EditOperationForm;

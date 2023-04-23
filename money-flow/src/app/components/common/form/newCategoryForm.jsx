import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "./textField";
import SelectField from "./selectField";

const NewCategoryForm = () => {
    const [data, setData] = useState({
        name: "",
        type: ""
    });
    const types = [
        { value: "Income", label: "Доход" },
        { value: "Outcome", label: "Расход" }
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

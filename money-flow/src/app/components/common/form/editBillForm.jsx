import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "./textField";
import SelectField from "./selectField";

const EditBillForm = () => {
    const [data, setData] = useState({
        name: "",
        type: "",
        selectedBill: ""
    });
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
            },
            min: {
                message: "Тип счета должен состоять хотябы из 3-х символов",
                value: 3
            }
        },
        selectedBill: {
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
    const bills = [
        { value: "id bill 1", label: "Credit Card" },
        { value: "id bill 2", label: "Investions" }
    ];
    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Выберите счет для редактирования"
                    name="selectedBill"
                    defaultOption=""
                    options={bills}
                    onChange={handleChange}
                    error={errors.selectedBill}
                />
                <TextField
                    label="Название счета"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Тип счета (Вклад, дебетовая карта, кредитная карта и т.д."
                    name="type"
                    value={data.type}
                    onChange={handleChange}
                    error={errors.type}
                />
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default EditBillForm;

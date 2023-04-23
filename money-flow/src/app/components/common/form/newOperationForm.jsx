import React, { useState } from "react";
import TextField from "./textField";
import SelectField from "./selectField";

const NewOperationForm = () => {
    // Temporal data
    const types = [
        { value: "Income", label: "Доход" },
        { value: "Outcome", label: "Расход" }
    ];
    const categories = [
        { label: "Работа", value: "Work" },
        { label: "Инвестиции", value: "Investments" }
    ];
    const bills = [
        { label: "Долларовый счет", value: "Dollar" },
        { label: "Евро счёт", value: "Euro" }
    ];
    // Temporal data
    const [data, setData] = useState({
        bill: bills[0].label,
        category: categories[0].label,
        type: types[0].label,
        value: "",
        commentary: ""
    });

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Выберите счёт"
                    name="bill"
                    defaultOption={bills[0].label}
                    options={bills}
                    onChange={handleChange}
                />
                <SelectField
                    label="Выберите категорию"
                    name="category"
                    defaultOption={categories[0].label}
                    options={categories}
                    onChange={handleChange}
                />
                <SelectField
                    label="Выберите тип операции"
                    name="type"
                    defaultOption=""
                    options={types}
                    onChange={handleChange}
                />
                <TextField
                    label="Введите сумму"
                    name="value"
                    value={data.value}
                    onChange={handleChange}
                />
                <TextField
                    label="Добавьте комментарий"
                    name="commentary"
                    value={data.commentary}
                    onChange={handleChange}
                />
                <button
                    className="btn btn-primary w-100 mx-auto mb-4"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default NewOperationForm;

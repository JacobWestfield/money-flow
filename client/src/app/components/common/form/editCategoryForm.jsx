import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "./textField";
import SelectField from "./selectField";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCategory,
    loadCategories,
    updateCategory
} from "../../../redux/reducers/categoriesReducer";
import { toast } from "react-toastify";

const EditCategoryForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.entities);
    const categoriesLoading = useSelector((state) => state.category.loading);
    const [data, setData] = useState({
        name: "",
        type: "",
        _id: ""
    });
    useEffect(() => {
        dispatch(loadCategories());
    }, []);

    const types = [
        { value: "Income", label: "Доход" },
        { value: "Outcome", label: "Расход" }
    ];
    const existingCategories = categories.map((category) => ({
        label: category.name,
        value: category._id
    }));
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
        _id: {
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
        dispatch(updateCategory(data));
    };

    const handleDelete = (id) => {
        if (errors._id) {
            toast("Choose category");
            return;
        }
        dispatch(deleteCategory(id));
    };

    if (categoriesLoading) {
        return <h1>Loading ...</h1>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Выберите категорию, которую хотите изменить"
                    name="_id"
                    defaultOption="Выберите категорию..."
                    options={existingCategories}
                    onChange={handleChange}
                    error={errors._id}
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

export default EditCategoryForm;

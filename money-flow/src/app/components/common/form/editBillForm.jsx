import React, { useEffect, useState } from "react";
import TextField from "./textField";
import SelectField from "./selectField";
import { validator } from "../../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import {
    loadBills,
    deleteBill,
    updateBill
} from "../../../redux/reducers/billsReducer";
import { toast } from "react-toastify";
import { getCurrentUserId } from "../../../redux/reducers/userReducer";

const EditBillForm = () => {
    const dispatch = useDispatch();
    const bills = useSelector((state) => state.bill.entities);
    const billsLoading = useSelector((state) => state.bill.loading);
    const [errors, setErrors] = useState({});
    const currentUserId = useSelector(getCurrentUserId());
    const filteredBills = bills.filter((bill) => bill.userId === currentUserId);
    const billsList = filteredBills.map((bill) => ({
        label: bill.name,
        value: bill._id
    }));

    useEffect(() => {
        dispatch(loadBills());
    }, []);

    const [data, setData] = useState({
        name: "",
        type: "",
        _id: "",
        userId: currentUserId
    });
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(data);
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
        if (!isValid) return;
        console.log(data);
        dispatch(updateBill(data));
    };

    if (bills.loading) {
        return <h1 className="display - 1">Loading...</h1>;
    }

    const handleDelete = (id) => {
        if (errors._id) {
            toast("Choose bill");
            return;
        }
        dispatch(deleteBill(id));
    };

    if (billsLoading) {
        return <h1>Loading ...</h1>;
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Выберите счет для редактирования"
                    name="_id"
                    defaultOption=""
                    options={billsList}
                    onChange={handleChange}
                />
                <TextField
                    label="Название счета"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Тип счета (Вклад, дебетовая карта, кредитная карта и т.д."
                    name="type"
                    value={data.type}
                    onChange={handleChange}
                />
                <button
                    className="btn mb-4 btn-primary w-100 mx-auto"
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

export default EditBillForm;

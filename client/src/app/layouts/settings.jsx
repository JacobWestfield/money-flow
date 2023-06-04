import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "../utils/validator";
import {
    getCurrentUserId,
    loadUsersList,
    updateUserData
} from "../redux/reducers/userReducer";
import { useHistory } from "react-router-dom";
import TextField from "../components/common/form/textField";

const Settings = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const userId = useSelector(getCurrentUserId());

    const [data, setData] = useState({
        name: "",
        _id: userId
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
                message: "Имя должно состоять хотябы из 1-го символа",
                value: 1
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
        if (!isValid) return;
        await dispatch(updateUserData(data));
        dispatch(loadUsersList());
        history.push("/history");
    };

    return (
        <>
            <div className="container col-md-3 shadow p-4">
                <h1>Изменение данных пользователя</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Новое имя"
                        name="name"
                        value={data.name}
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
            </div>
        </>
    );
};

export default Settings;

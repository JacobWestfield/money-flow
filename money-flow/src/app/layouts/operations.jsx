import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NewOperationForm from "../components/common/form/newOperationForm";
import EditOperationForm from "../components/common/form/editOperationForm";
const Operations = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "createoperation" ? type : "editoperation"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "editoperation" ? "createoperation" : "editoperation"
        );
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "editoperation" ? (
                        <>
                            <h3 className="mb-4">Редактирование Операции</h3>
                            <EditOperationForm />
                            <p>
                                Еще нет операции?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Переходите по этой ссылке
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Создание новой операции</h3>
                            <NewOperationForm />
                            <p>
                                Хотите редактировать существующую операцию?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Переходите по этой ссылке
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Operations;

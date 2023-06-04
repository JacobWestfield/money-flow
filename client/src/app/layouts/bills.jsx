import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NewBillForm from "../components/common/form/newBillForm";
import EditBillForm from "../components/common/form/editBillForm";

const Bills = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "createbill" ? type : "editbill"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "editbill" ? "createbill" : "editbill"
        );
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "editbill" ? (
                        <>
                            <h3 className="mb-4">Редактирование счета</h3>
                            <EditBillForm />
                            <p>
                                Хотите редактировать уже существующий счет?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Переходите по этой ссылке
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Создание счета</h3>
                            <NewBillForm />
                            <p>
                                Хотите создать новый счет?{" "}
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

export default Bills;

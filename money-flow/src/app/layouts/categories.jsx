import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditCategoryForm from "../components/common/form/editCategoryForm";
import NewCategoryForm from "../components/common/form/newCategoryForm";

const Categories = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "createcategory" ? type : "editcategory"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "editcategory" ? "createcategory" : "editcategory"
        );
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "editcategory" ? (
                        <>
                            <h3 className="mb-4">Редактирование категории</h3>
                            <EditCategoryForm />
                            <p>
                                Хотите создать новую категорию?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Переходите по этой ссылке
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Создание категории</h3>
                            <NewCategoryForm />
                            <p>
                                Хотите редактировать уже существующую категорию?{" "}
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

export default Categories;

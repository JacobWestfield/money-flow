import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CategoriesBlock = ({ categories }) => {
    if (!categories) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <div className="container col-md-5  shadow p-4">
                <h3>Категории</h3>{" "}
                <Link to="/category/createcategory">
                    <button className="btn btn-primary mb-4">
                        Создать новую категорию
                    </button>
                </Link>
                {categories.length === 0 ? (
                    <h1>У вас еще нет категорий</h1>
                ) : (
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Название категории</th>
                                <th scope="col">Тип категории </th>
                            </tr>
                            {categories.map((category) => {
                                return (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>
                                            {category.type === "Income"
                                                ? "Доход"
                                                : "Расход"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </thead>
                    </table>
                )}
            </div>
        </>
    );
};

CategoriesBlock.propTypes = {
    categories: PropTypes.array
};

export default CategoriesBlock;

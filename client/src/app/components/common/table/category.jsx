import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Category = ({ operation }) => {
    const categories = useSelector((state) => state.category.entities);
    const category = categories.find(
        (category) => category._id === operation.category
    );
    const loadingCategory = useSelector((state) => state.category.loading);
    if (!category) {
        return "Нет категории";
    }
    if (!loadingCategory && categories) {
        return (
            <p>{`${category.name} (${
                category.type === "Income" ? "Доход" : "Расход"
            })`}</p>
        );
    } else return "Loading...";
};

Category.propTypes = {
    operation: PropTypes.object
};

export default Category;

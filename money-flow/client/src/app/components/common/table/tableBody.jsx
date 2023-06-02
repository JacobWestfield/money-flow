import React, { useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../../redux/reducers/categoriesReducer";

const TableBody = ({ data, columns }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCategories());
    }, []);
    const categories = useSelector((state) => state.category.entities);
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    return (
        <tbody>
            {data.map((item) => {
                let color = "";
                if (categories.length) {
                    const category = categories.find(
                        (category) => category._id === item?.category
                    );
                    if (category.type === "Outcome") color = "bg-warning";
                    if (category.type === "Income") color = "bg-success";
                }
                return (
                    <tr key={item._id}>
                        {Object.keys(columns).map((column) => (
                            <td className={color + " p-3"} key={column}>
                                {renderContent(item, column)}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;

import React from "react";
import { VictoryPie } from "victory";
import PropTypes from "prop-types";

const AnalyticsBlock = ({ operations, bills, categories }) => {
    const incomeList = configureIncomeList(operations, categories);
    const outcomeList = configureOutcomeList(operations, categories);

    function configureIncomeList(operations, categories) {
        const tempList = [];
        for (const operation of operations) {
            for (const category of categories) {
                if (
                    category._id === operation.category &&
                    category.type === "Income"
                ) {
                    tempList.push(operation);
                }
            }
        }
        return tempList;
    }

    function configureOutcomeList(operations, categories) {
        const tempList = [];
        for (const operation of operations) {
            for (const category of categories) {
                if (
                    category._id === operation.category &&
                    category.type === "Outcome"
                ) {
                    tempList.push(operation);
                }
            }
        }
        return tempList;
    }

    const incomeSummary = incomeList.reduce(
        (acc, el) => acc + Number(el.value),
        0
    );
    const outcomeSummary = outcomeList.reduce(
        (acc, el) => acc + Number(el.value),
        0
    );

    const dataSet = [
        { x: `Доходы: ${incomeSummary}`, y: incomeSummary },
        { x: `Расходы: ${outcomeSummary}`, y: outcomeSummary }
    ];

    if (operations.length === 0) {
        return <h1>У вас еще не было операций</h1>;
    }
    return (
        <>
            <h1 className="display-5 mb-4 text-center">Статистика операций</h1>

            <VictoryPie
                width="100"
                height="100"
                style={{
                    labels: {
                        fontSize: 5,
                        fill: "#0d6efd",
                        padding: 1
                    }
                }}
                size={9}
                padding={20}
                colorScale={["green", "yellow"]}
                data={dataSet}
            />
        </>
    );
};

AnalyticsBlock.propTypes = {
    operations: PropTypes.array,
    bills: PropTypes.array,
    categories: PropTypes.array
};

export default AnalyticsBlock;

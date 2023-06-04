import { useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme((prevState) => {
            if (prevState === "dark") {
                return "light";
            } else {
                return "dark";
            }
        });
    };
    return [theme, toggleTheme];
};

export default useTheme;

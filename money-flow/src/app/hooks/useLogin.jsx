import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const LoginContext = React.createContext();
const httpLogin = axios.create();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const signIn = async ({ email, password }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpLogin.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            // я тут сделал на всякий случай все варианты ошибок логина которые предоставил firebase docs
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь с данным Email не найден"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        email: "Пароль введен неверно. Попробуйте снова"
                    };
                    throw errorObject;
                }
                if (message === "USER_DISABLED") {
                    const errorObject = {
                        email: "Пользователь с данным Email был отключён или заблокирован. Обратитесь в поддержку"
                    };
                    throw errorObject;
                }
            }
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <LoginContext.Provider value={{ signIn }}>
            {children}
        </LoginContext.Provider>
    );
};

LoginProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default LoginProvider;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <>
            <div>
                <h1 className="display-1 text-center mb-4">Money flow</h1>
                <h3 className="container col-md-10 text-center mb-4">
                    Простое и удобное приложение для учёта доходов/расходов.
                    Простая инфографика и табличное отображение данных помогут
                    визуализировать и упростить контроль над финансами в любое
                    время. Данное full-stack приложение реализовано с помощью
                    технологий: ReactJS, NodeJS, Express, Victory library,
                    Redux, MongoDB.
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://github.com/JacobWestfield/money-flow"
                    >
                        {" "}
                        GitHub Repository
                    </a>
                </h3>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {formType === "register" ? (
                            <>
                                <h3 className="mb-4">Register</h3>
                                <RegisterForm />
                                <p>
                                    Already have account?{" "}
                                    <a role="button" onClick={toggleFormType}>
                                        {" "}
                                        Sign In
                                    </a>
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="mb-4">Login</h3>
                                <LoginForm />
                                <p>
                                    Dont have account?{" "}
                                    <a role="button" onClick={toggleFormType}>
                                        {" "}
                                        Sign Up
                                    </a>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

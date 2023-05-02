import axios from "axios";

import React, { useState } from "react";

const validateForm = (formData) => {
    const errors = {};

    if (!formData.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email address is invalid";
    }

    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
            formData.password
        )
    ) {
        errors.password =
            "Password must contain at least 1 uppercase letter, one lowercase letter and one number";
    }

    return errors;
};

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        axios
            .post("http://localhost:8000/api/login", formData)
            .then((res) => {
                console.log(res);
                setErrors({});
                // window.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data);
            });
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { email, password } = formData;

    return (
        <main className="flex items-center justify-center h-screen flex-col ">
            <form onSubmit={submitHandler} className="w-[400px]">
                <div className="flex flex-col my-5">
                    {errors.msg && (
                        <p className="text-black text-sm font-bold mt-4">
                            {errors.msg}
                        </p>
                    )}
                    <label htmlFor="email" className="font-bold">
                        Email address:
                    </label>

                    <input
                        onChange={changeHandler}
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="johndoe@gmail.com"
                        className="mt-2 text-slate-900 bg-white rounded-md px-3 h-10 shadow-md focus:outline-none focus:ring-2 focus:ring-groovy-purple ring-1 ring-slate-200 appearance-none"
                        required
                    />
                    {errors.email && (
                        <p className="text-black text-sm font-bold mt-4">
                            {errors.email}
                        </p>
                    )}
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="password" className="font-bold">
                        Password:
                    </label>
                    <input
                        onChange={changeHandler}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Abcd123!@#"
                        className="mt-2 text-slate-900 bg-white rounded-md px-3 h-10 shadow-md focus:outline-none focus:ring-2 focus:ring-groovy-purple ring-1 ring-slate-200 appearance-none"
                        required
                    />
                    {errors.password && (
                        <p className="text-black text-sm font-bold mt-4">
                            {errors.password}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="py-2 bg-groovy-red rounded-md w-full shadow-md text-bold text-white">
                    Sign in to account
                </button>
            </form>
            <p className="pt-5">
                Don't have an account?{" "}

            </p>
        </main>
    );
};

export default Login;
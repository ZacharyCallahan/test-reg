import React, { useEffect, useState } from "react";
import axios from "axios";

const Islogged = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/getLoggedInUser", {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log("Something went wrong: (Logged in user) ", err);
            });
    }, []);
    return <div>{user}</div>;
};

export default Islogged;

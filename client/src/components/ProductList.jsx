import React, { useEffect } from "react";
import axios from "axios";

const ProductList = (props) => {
    const { products, setProducts } = props;
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/user")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return <div>
        {products._id}
    </div>;
};

export default ProductList;

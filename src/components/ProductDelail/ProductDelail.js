import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
const ProductDelail = () => {
	const {productKey} = useParams()
    const product = fakeData.find(product => product.key === productKey);
	return (
		<div>
			<h1>product details</h1>
            <Product showAddToCart={false} product={product}></Product>
		</div>
	);
};

export default ProductDelail;

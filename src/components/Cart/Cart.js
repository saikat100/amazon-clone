import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = (totalPrice + product.price) * parseInt(product.quantity);
    }
    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 4.99;
    }
    else if(totalPrice > 0){
        shipping = 12.99;
    }
    const txt = (totalPrice/10).toFixed(2);
    const grandTotal = (totalPrice + shipping + Number(txt)).toFixed(2);

    const formatNumber = num=> {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
			<div>
				<h4>Order Summary</h4>
				<p>Items Ordered: {cart.length}</p>
				<p>Product Price: {formatNumber(totalPrice)}</p>
				<p>
					<small>Shipping Cost: {shipping}</small>
				</p>
				<p>
					<small>TXT + Vat: {txt}</small>
				</p>
				<p>Total Price: {grandTotal}</p>

                {
                    props.children
                }
			
			</div>
		);
};

export default Cart;
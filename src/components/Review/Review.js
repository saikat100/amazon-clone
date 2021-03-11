import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif";

const Review = () => {
	const [cart, setCart] = useState([]);
	const [orderPlaced, setOrderPlaced] = useState(false);

	const handlePlaceOrder = () => {
		setCart([]);
		setOrderPlaced(true);
		processOrder();
	}

	const removeProduct = (productKey) => {
		const newCart = cart.filter(product=>product.key !== productKey)
		setCart(newCart);
		removeFromDatabaseCart(productKey);
	}

	useEffect(() =>{
		const savedCart = getDatabaseCart()
		const productKeys = Object.keys(savedCart);

		const cartProducts = productKeys.map(key => {
			const product = fakeData.find(product => product.key === key);
			product.quantity = savedCart[key];
			return product;
		});
		setCart(cartProducts);
	}, [])

	let thanYou;
	if(orderPlaced){
		thanYou = <img src={happyImage}/>
	}
	return (
		<div className="shop-container">
			<div className="product-container">
				{cart.map((product) => (
					<ReviewItem
						key={product.key}
						removeProduct={removeProduct}
						product={product}
					></ReviewItem>
				))}
				{
					thanYou
				}
			</div>
			<div className="cart-container">
				<Cart cart={cart}>
					<button onClick={handlePlaceOrder} className="main-button">Place Order</button>
				</Cart>
			</div>
		</div>
	);
};

export default Review;

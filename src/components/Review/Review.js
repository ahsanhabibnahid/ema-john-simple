import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/fakedb';
import allProducts from '../../fakeData/products.json'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([])
    const [placeOrder, setPlaceOrder] = useState(false)
    const history = useHistory()

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }


    const removeItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const cartProducts = productKeys.map(key => {
            const product = allProducts.find(pd => pd.key === key)
            product.quantity = savedCart[key]
            return product
        })
        setCart(cartProducts)
    }, [])

    let thankyou 
    if (placeOrder) {
        thankyou = <img src={happyImage} alt="" />
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(product => <ReviewItem product={product} key={product.key} removeItem={removeItem}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div>
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='cart-button'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
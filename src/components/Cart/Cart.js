import React from 'react';

const Cart = (props) => {
    const cart = props.cart
    const total = cart.reduce((totalSum, product) => totalSum + product.price, 0).toFixed(2)
    // othoba nicher moto koreo kora jay
    // let totalPrice = 0;
    // for (let i = 0;  i < cart.length; i++) {
    //     const product = cart[i];
    //     totalPrice = total + product.price
    // }

    let shippingCost = 0;
    if(total > 500){
        shippingCost = 0;
    }
    else if(total > 100){
        shippingCost = 5;
    }
    else if(total >  0){
        shippingCost = 10
    }
    const tax = (total * 0.1).toFixed(2)

    const grandTotal = (Number(total) + shippingCost + Number(tax)).toFixed(2)
    

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items ordered : {cart.length}</p>
            <p><small>Shipping Cost : {shippingCost}</small></p>
            <p><small>Items: {total} </small></p>
            <p><small>Tax + Vat: {tax} </small></p>
            <h3>Order Total: {grandTotal}</h3>
        </div>
    );
};

export default Cart;
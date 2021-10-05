import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product
    const removeItem = props.removeItem
    const reviewStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom : '5px',
        paddingBottom : '5px',
        marginLeft : '100px'
    }
    return (
        <div style={reviewStyle}>
            <h3>{name}</h3>
            <p>Quantity : {quantity}</p>
            <p>Price : {price}</p>
            <br />
            <button onClick={() => {removeItem(key)}} className='cart-button'>remove</button>
        </div>
    );
};

export default ReviewItem;
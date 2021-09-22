import { useState } from 'react';
import allProducts from '../../fakeData/products.json'
import Product from './Product/Product';
import './Shop.css'


const Shop = () => {
    const pro10 = allProducts.slice(0, 10)
    const [products, setProducts] = useState(pro10)
    const [cart, setCart] = useState([])
    

    const handleAddProduct = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product handleAddProduct = {handleAddProduct} product={product} key={product.key}></Product>)
                }
            </div>
            <div className='cart-container'>
                <h1>This is cart container</h1>
                <h5>Order summary : {cart.length}</h5>
            </div>
        </div>
    );
};

export default Shop;
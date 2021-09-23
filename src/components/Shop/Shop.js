import { useState } from 'react';
import allProducts from '../../fakeData/products.json'
import Cart from '../Cart/Cart';
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;
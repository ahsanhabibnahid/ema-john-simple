import { useEffect, useState } from 'react'
import allProducts from '../../fakeData/products.json'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/fakedb'
import Cart from '../Cart/Cart'
import Product from './Product/Product'
import './Shop.css'
import { Link } from 'react-router-dom'


const Shop = () => {
    const pro10 = allProducts.slice(0, 10)
    const [products, setProducts] = useState(pro10)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKey = Object.keys(savedCart)
        const previousKey = productKey.map(existingKey => {
            const product = allProducts.find(pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey]
            return product;
        })
        setCart(previousKey)

    }, [])

    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key)
        let count = 1
        let newCart
        if (sameProduct) {
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const others = cart.filter(pd => pd.key !== product.key)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1
            newCart = [...cart, product]
        }
        setCart(newCart)

        addToDatabaseCart(product.key, count)
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product showAddToCart={true} handleAddProduct={handleAddProduct} product={product} key={product.key}></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='cart-button'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
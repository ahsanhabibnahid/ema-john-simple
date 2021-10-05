import React from 'react';
import { useParams } from 'react-router';
import allProducts from '../../fakeData/products.json'
import Product from '../Shop/Product/Product';


const ProductDetail = () => {
    const  {productKey} = useParams();
    const product = allProducts.find(pd => pd.key === productKey)
    // console.log(product)

    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
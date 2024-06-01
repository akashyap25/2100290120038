import React from 'react';
import { Product } from '../Services/api';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="border rounded-md p-4 shadow-md">
            <img
                src={`https://via.placeholder.com/150?text=${product.productName}`}
                alt={product.productName}
                className="w-full h-32 object-cover mb-2"
            />
            <h2 className="text-xl font-bold">{product.productName}</h2>
            <p>{`Price: $${product.price}`}</p>
            <p>{`Rating: ${product.rating}`}</p>
            <p>{`Discount: ${product.discount}%`}</p>
            <p>{`Availability: ${product.availability}`}</p>
            <Link to={`/products/${product.category}/${product.id}`} className="text-blue-500">
                Learn More
            </Link>
        </div>
    );
};

export default ProductCard;

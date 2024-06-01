import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, Product } from '../Services/api';

const ProductDetails: React.FC = () => {
    const { category, productId } = useParams<{ category: string; productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (category && productId) {
            getProductDetails(category, productId).then(response => {
                setProduct(response.data);
            }).catch(error => {
                console.error("Error fetching product details:", error);
            });
        }
    }, [category, productId]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
            <img
                src={`https://via.placeholder.com/400?text=${product.productName}`}
                alt={product.productName}
                className="w-full h-64 object-cover mb-4"
            />
            <p>{`Company: ${product.company}`}</p>
            <p>{`Category: ${product.category}`}</p>
            <p>{`Price: $${product.price}`}</p>
            <p>{`Rating: ${product.rating}`}</p>
            <p>{`Discount: ${product.discount}%`}</p>
            <p>{`Availability: ${product.availability}`}</p>
        </div>
    );
};

export default ProductDetails;

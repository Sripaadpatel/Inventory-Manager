import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    return (
        <div className="wrapper">
            <div className="product-img">
                <img
                    src={
                        product.image 
                    }
                    alt={product.name}
                    height="220"
                    width="220"
                />
            </div>
            <div className="product-info">
                <div className="product-text">
                    <h1>{product.name}</h1>
                    <h2>{product.brand}</h2>
                    <p>{product.description}</p>
                    <div className="product-price-btn">
                        <p>
                            ₹<span>{product.price}</span>
                        </p>
                        <button type="button">Edit</button>
                    </div>
                    <div className="product-meta">
                        <span>Stock: {product.stock}</span>
                        <span>Category: {product.category}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

import React, { useEffect, useState } from "react";
import "./InventoryView.css";
import ProductCard from "./ProductCard.jsx";

const InventoryView = ({ onSwitch }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/${localStorage.getItem(
                        "userId"
                    )}/home/products/1`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched products:", data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="inventory-view-container">
            <div className="inventory-view-header">
                <h2>Inventory</h2>
                <button
                    className="add-button"
                    onClick={(e) => {
                        e.preventDefault();
                        onSwitch();
                    }}
                >
                    {"+ "}Add Items
                </button>
            </div>
            <div className="inventory-products-section">
                {loading ? (
                    <p>Loading...</p>
                ) : products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    <div className="product-list">
                        {products.map((product, idx) => (
                            <ProductCard
                                key={product.id || idx}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="inventory-view-footer">
                <p>© 2025 Inventory Management</p>
            </div>
        </div>
    );
};

export default InventoryView;

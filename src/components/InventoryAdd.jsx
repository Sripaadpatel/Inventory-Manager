import React, { useState } from "react";
import "./InventoryAdd.css";
import Loader from "../components/Loader.jsx";
const initialState = {
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null, // Store the file object
    category: "",
    brand: "",
    userId: "",
};

const InventoryAdd = ({ onAdd, onSwitch }) => {
    const [item, setItem] = useState(initialState);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        let formattedItem = {
            ...item,
            price: parseFloat(item.price),
            stock: parseInt(item.stock, 10),
            userId: localStorage.userId,
        };
        console.log("Formatted Item:", formattedItem);
        const formData = new FormData();
        formData.append("file", item.image);
        formData.append("upload_preset", "Product-images");
        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/drcgzz3an/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            console.log("Image Upload Response:", data);
            if (data.secure_url) {
                formattedItem.image = data.secure_url; // Use the secure URL from Cloudinary
            } else {
                console.error("Image upload failed:", data);
                return;
            }
        } catch (error) {
            console.error("Error submitting item:", error);
        }
        try {
            const response = await fetch(
                `http://localhost:8080/${localStorage.getItem(
                    "userId"
                )}/home/products/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formattedItem),
                }
            );
            const result = await response.json();
            console.log("Server Response:", result);
            if (result.success) {
                console.log("Item added successfully:", result);
                onAdd();
            } else {
                console.error("Failed to add item:", result.message);
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }

        setLoading(false);
        setItem(initialState);
        setImagePreview(null);
    };
    if (loading) {
        return (
            <div className="Loader">
                <Loader />
                <h2>Your Product image will be enhanced by AI..</h2>
            </div>
        );
    }
    return (
        <div className="inventory-add-container">
            <div className="inventory-add-header">
                <h2>Add New Product</h2>
            </div>
            <div className="product-info">
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                            border: "2px solid #000",
                            maxHeight: "400px",
                            maxWidth: "400px",
                            margin: "10px 0",
                        }}
                    />
                )}
                <form className="add-product" onSubmit={handleSubmit}>
                    <input
                        name="image"
                        type="file"
                        placeholder="Image"
                        required
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setItem((prev) => ({
                                    ...prev,
                                    image: file,
                                }));
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}
                    />

                    <input
                        name="name"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Description"
                        value={item.description}
                        onChange={handleChange}
                        rows={4}
                        style={{ resize: "vertical" }}
                    />
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={item.price}
                        onChange={handleChange}
                    />
                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={item.stock}
                        onChange={handleChange}
                    />
                    <input
                        name="category"
                        placeholder="Category"
                        value={item.category}
                        onChange={handleChange}
                    />
                    <input
                        name="brand"
                        placeholder="Brand"
                        value={item.brand}
                        onChange={handleChange}
                    />
                    <button type="submit">Add Item</button>
                </form>
            </div>
            <div className="inventory-add-footer">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onSwitch();
                    }}
                >
                    {"< "}View Products
                </button>
                <p>© 2025 Inventory Management</p>
            </div>
        </div>
    );
};

export default InventoryAdd;

import React from "react";
import "./Inventory.css";
import SideBar from "../components/SideBar.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import InventoryAdd from "../components/InventoryAdd.jsx";
import InventoryView from "../components/InventoryView.jsx";

const Inventory = () => {
    const [showAdd, setShowAdd] = React.useState(false);
    const navigate = useNavigate();
    return (
        <div className="inventory">
            <div className="page-logo">
                <button
                    className="logo-button"
                    onClick={() => {
                        navigate(`/${localStorage.userId}/dashboard`);
                    }}
                ></button>
            </div>
            <div className="page-header">
                <PageHeader />
            </div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="inventory-content">
                {showAdd ? (
                    <InventoryAdd
                        onSwitch={() => {
                            setShowAdd(false);
                        }}
                    />
                ) : (
                    <InventoryView
                        onSwitch={() => {
                            setShowAdd(true);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Inventory;

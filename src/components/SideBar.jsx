import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

const SideBar = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <nav className="side-bar">
            <div className="side-bar-header">
                <h1 className="side-bar-header-title">Inventory Management</h1>
                <button className="side-bar-header-icon">
                    <TbLayoutSidebarLeftExpandFilled />
                </button>
            </div>
            <ul className="side-bar-list">
                <li className="side-bar-list-item">
                    <Link
                        className="side-bar-list-item-link"
                        to={`/${userId}/dashboard`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li className="side-bar-list-item">
                    <Link
                        className="side-bar-list-item-link"
                        to={`/${userId}/inventory`}
                    >
                        Inventory
                    </Link>
                </li>
                <li className="side-bar-list-item">
                    <Link
                        className="side-bar-list-item-link"
                        to={`/${userId}/orders`}
                    >
                        Orders
                    </Link>
                </li>
                <li className="side-bar-list-item">
                    <Link
                        className="side-bar-list-item-link"
                        to={`/${userId}/suppliers`}
                    >
                        Suppliers
                    </Link>
                </li>
                <li className="side-bar-list-item">
                    <Link
                        className="side-bar-list-item-link"
                        to={`/${userId}/reports`}
                    >
                        Reports
                    </Link>
                </li>
                <li className="side-bar-list-item">
                    <button
                        className="side-bar-list-item-link"
                        onClick={handleLogout}
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                        }}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default SideBar;

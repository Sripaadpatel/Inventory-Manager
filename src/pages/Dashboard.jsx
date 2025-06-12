import React from "react";
import SideBar from "../components/SideBar.jsx";
import PageHeader from "../components/PageHeader.jsx";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const nav = useNavigate();

    return (
        <div className="dashboard">
            <div className="page-logo">
                <button
                    className="logo-button"
                    onClick={() => {
                        nav(`/${localStorage.getItem("userId")}/dashboard`);
                    }}
                ></button>
            </div>
            <div className="page-header"><PageHeader/></div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
                <h1>Dashboard</h1>
                <p>Welcome {localStorage.getItem("username")} !</p>
            </div>
        </div>
    );
};

export default Dashboard;

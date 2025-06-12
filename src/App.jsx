import { useState } from "react";
import LoginBlock from "./components/LoginBlock";
import SignupBlock from "./components/SignupBlock";
import Index from "./components/index";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // <-- Use HashRouter
import "./App.css";
import Inventory from "./pages/Inventory";
import { DiVim } from "react-icons/di";

function App() {
    return (
        <div>
            <h1 className="Test">Hello World</h1>
            <Router>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/Login" element={<LoginBlock />} />
                    <Route path="/Signup" element={<SignupBlock />} />
                    <Route path="/:userId" element={<ProtectedRoute />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="inventory" element={<Inventory />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

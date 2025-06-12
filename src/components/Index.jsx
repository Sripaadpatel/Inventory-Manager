
import { useNavigate } from "react-router-dom";
import "./Index.css";

const Index = () => {
    let nav = useNavigate();
    return (
        <div className="index-page">
            <div className="info">
                <h1 className="title">
                    Smart Inventory Management Made Simple.
                </h1>
                <p className="description">
                    InventoryHub is a user-centric inventory management system.
                    Designed for modern businesses, it streamlines product
                    tracking, order monitoring, and supplier coordination—all in
                    one dynamic dashboard. With real-time data integration,
                    responsive UI, and user-specific views, InventoryHub
                    empowers users to manage inventory efficiently and with
                    precision.
                </p>
                <div className="bottom-line">
                    <h3 className="tag-line">
                        Track it. Manage it. Master it.
                    </h3>
                    <button
                        className="start-using"
                        onClick={() => {
                            
                            nav("/Login");
                        }}
                    >
                        Start Managing your Inventory!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Index;

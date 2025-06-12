import "./PageHeader.css";
import { CiSearch } from "react-icons/ci";
import userImg from "../assets/dp1.jpg";

const PageHeader = () => {
    return (
        <div className="page-header-div">
            <div className="page-header-search">
                <CiSearch className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    name="Search"
                    id="Search"
                    placeholder="Search Products"
                />
            </div>
            <img alt="User" src={userImg} className="user-img"/>
        </div>
    );
};

export default PageHeader;

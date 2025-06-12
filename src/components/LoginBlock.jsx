import React from "react";
import { LuKey, LuUser } from "react-icons/lu";
import "./LoginBlock.css";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

function LoginBlock() {
    const [username, setUsername] = React.useState( "");
    const [password, setPassword] = React.useState( "");
    const [rememberMe, setRememberMe] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let jdata = null;
        const loginData = {
            username: username,
            password: password,
        };
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            jdata = data;
            if (response.ok) {
                console.log("Login successful:", data);
                // Handle successful login (e.g., redirect, show success message)
            } else {
                console.error("Login failed:", data);
                // Handle login failure (e.g., show error message)
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle network or other errors
        }
        if (jdata.status === "success") {
            try {
                const response = await fetch(
                    "http://localhost:8080/login/success",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(loginData),
                    }
                );
                const data2 = await response.json();
                jdata = data2;
                if (response.ok) {
                    console.log("Login successful:", data2);
                    // Handle successful login (e.g., redirect, show success message)
                } else {
                    console.error("Login failed:", data2);
                    // Handle login failure (e.g., show error message)
                }
            } catch (error) {
                console.error("Error during login:", error);
            }
            localStorage.setItem("username", username);
            localStorage.setItem("userId", jdata.userId);
            localStorage.setItem("rememberMe", rememberMe);
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
                localStorage.setItem("password", password);
            } else {
                localStorage.removeItem("rememberMe");
            }
            localStorage.setItem("isLoggedIn", "true");

            alert("Login successful");
            window.location.href = `/${localStorage.getItem(
                "userId"
            )}/dashboard`; // Redirect to the user's dashboard

            // Redirect to the dashboard or home page
        } else if (jdata.status === "incorrect-password") {
            alert("Invalid credentials, please try again");
        } else if (jdata.status === "null") {
            alert("User not found, please register");
            onSwitch();
        }
    };

    return (
        <div className="div">
            <div className="login-block">
                <div className="header">
                    <img src={logo1} alt="Logo" />
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" id="username">
                        <div className="user-input">
                            <input
                                className="input"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                required
                                value={username}

                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <LuUser />
                        </div>
                    </div>
                    <div className="form-group" id="password">
                        <div className="user-input">
                            <input
                                className="input"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <LuKey />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="remember-me">
                            <input
                                onClick={() => {
                                    setRememberMe(!rememberMe);
                                    console.log(rememberMe);
                                }}
                                type="checkbox"
                                id="remember-me"
                                name="remember-me"
                            />
                            Remember me
                        </label>
                    </div>
                    <button type="submit">Login</button>
                    <div className="new-user">
                        New User?{" "}
                        <a href="/Signup"> . click here to register.</a>
                    </div>
                </form>
            </div>
            <div className="image">
                <img src={logo2} alt="logo" />
            </div>
        </div>
    );
}

export default LoginBlock;

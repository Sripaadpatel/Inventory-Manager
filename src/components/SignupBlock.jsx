import React, { useState } from "react";
import { LuKey, LuMail, LuUser } from "react-icons/lu";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import "./SignupBlock.css";
const SignupBlock = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        const signupData = {
            name: fullName,
            username: username,
            email: email,
            password: password,
        };
        console.log(signupData);
        let jdata = null;
        try {
            const response = await fetch("http://localhost:8080/Signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData),
            });

            const data = await response.json();
            jdata = data;
            if (response.ok) {
                console.log("Signup successful:", data);
                // Handle successful signup (e.g., redirect, show success message)
            } else {
                console.error("Signup failed:", data);
                // Handle signup failure (e.g., show error message)
            }
        } catch (error) {
            console.error("Error during signup:", error);
            // Handle network or other errors
        }
        if (jdata.status === "email-exists") {
            alert("Email already exists");
        } else if (jdata.status === "username-exists") {
            alert("User already exists");
        } else if (jdata.status === "success") {
            try {
                const response = await fetch(
                    "http://localhost:8080/Signup/success",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(signupData),
                    }
                );
                const data2 = await response.json();
                jdata = data2;
                if (response.ok) {
                    console.log("Signup successful:", data2);
                    // Handle successful signup (e.g., redirect, show success message)
                } else {
                    console.error("Signup failed:", data2);
                    // Handle signup failure (e.g., show error message)
                }
            } catch (error) {
                console.error("Error during signup:", error);
            }
            if (jdata.status === "success") {
                alert("Signup successful, Please login to continue");
                // Redirect to the login page
                window.location.href = "/Login";
            }
        }
    };
    return (
        <div className="SignupBlock">
            <h1>
                SignUp
                <span className="sub-heading">
                    Start tracking your inventory now!
                </span>
            </h1>

            <form className="signup-form" onSubmit={handleSubmit}>
                <h3>Please enter your details below.</h3>
                <div className="form-group2">
                    <div className="user-input">
                        <input
                            className="input"
                            type="text"
                            id="full-name"
                            name="full-name"
                            placeholder="Full Name"
                            required
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                            }}
                        />
                        <MdOutlineDriveFileRenameOutline />
                    </div>
                </div>
                <div className="form-group2">
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
                <div className="form-group2">
                    <div className="user-input">
                        <input
                            className="input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <LuMail />
                    </div>
                </div>
                <div className="form-group2">
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
                <button type="submit">Sign Up</button>
                <p className="login-link">
                    already a user? {}
                    <a href="/Login">Login here!</a>
                </p>
            </form>
        </div>
    );
};

export default SignupBlock;

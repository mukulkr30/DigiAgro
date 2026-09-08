import { useState } from "react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { AuthCard } from "./AuthCard";
import { Link } from "react-router-dom";
import { useNavigate,useOutletContext } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });

    const { setToken } = useOutletContext();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleLogin = async () => {
    try {
        const formData = new URLSearchParams();

        formData.append("username", form.username);
        formData.append("password", form.password);

        const res = await fetch(
            `${import.meta.env.VITE_REGISTER_URL}/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            }
        );

        const data = await res.json();

        if (res.ok) {
            console.log("logged in successfully yeee");

            localStorage.setItem("token", data.access_token);
            setToken(data.access_token);


            navigate("/");
        } else {
            alert(data.detail || "Login failed");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
};

    return (
        <AuthCard
        title="Login"
        subtitle=""
        footer={
            <>
            Don't have an account?{" "}
            <Link to="/Register" className="text-blue-600">
                Sign up
            </Link>
            </>
        }
        >
        <InputField
            label="Phone"
            name="username"
            placeholder="Enter your phone number"
            value={form.username}
            onChange={handleChange}
        />

        <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
        />

        <PrimaryButton text="Sign In" onClick={handleLogin} />
        {/* for future version upgrade */}
        {/* <div className="text-center mt-3">
            <Link to="/forgot" className="text-blue-600 text-sm">
            Forgot password?
            </Link>
        </div> */}
        </AuthCard>
    );
}
import { useState } from "react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { AuthCard } from "./AuthCard";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.username) {
      alert("Please fill required fields");
      return;
    }
    console.log("email: ", form.email)
    console.log("password: ",form.password)
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_REGISTER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        console.log("registered: ", data);
        navigate("/login", { replace: true });
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join SmartMeetPlanner today"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-600">
            Sign in
          </Link>
        </>
      }
    >
      <InputField
        label="Username"
        name="username"
        placeholder="Enter the Username"
        value={form.username}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        name="email"
        placeholder="Enter the Email"
        value={form.email}
        onChange={handleChange}
      />
      <InputField
        label="Phone"
        name="phone"
        placeholder="Enter the Phone"
        value={form.phone}
        onChange={handleChange}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter the Password"
        value={form.password}
        onChange={handleChange}
      />

      <PrimaryButton
        text={loading ? "Registering..." : "Register"}
        
        onClick={handleRegister}
      />
    </AuthCard>
  );
}
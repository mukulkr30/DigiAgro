import { useState } from "react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { AuthCard } from "./AuthCard";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    emailId: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.emailId || !form.password || !form.userName || !form.phone) {
      alert("Please fill required fields (Username, Email, Phone, Password)");
      return;
    }
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
      subtitle="Smart AgriCulture Plateform"
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
        label="UserName"
        name="userName"
        placeholder="Enter the Username"
        value={form.userName}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        name="emailId"
        placeholder="Enter the Email"
        value={form.emailId}
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
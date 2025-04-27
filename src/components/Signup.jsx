import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg(data.msg || "Registered Successfully!");
        navigate("/login");
      } else {
        setMsg(data.msg || "Error occurred.");
      }
    } catch (err) {
      setMsg("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" value={form.name}
            onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          <input type="email" name="email" placeholder="Email" value={form.email}
            onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          <input type="password" name="password" placeholder="Password" value={form.password}
            onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          <select name="role" value={form.role} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Register
          </button>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700" onClick={()=>{
            navigate('/login')
          }}>
            Login
          </button>
        </form>
        {msg && <p className="text-center text-sm text-red-500 mt-4">{msg}</p>}
      </div>
    </div>
  );
};

export default Register;
// src/pages/Login.js
import { useState } from "react";
import { loginUser } from "../config/firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl mb-4">Login</h2>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2" />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="primary" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;

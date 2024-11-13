// src/pages/Signup.js
import { useState } from "react";
import { signUpUser } from "../config/firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signUpUser(email, password);
      navigate("/");
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2" />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="primary" onClick={handleSignup}>Sign Up</Button>
    </div>
  );
};

export default Signup;

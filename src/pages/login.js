import { useState } from "react";
import { loginUser } from "../config/firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      message.success("Login Successful!");
      navigate("/user"); // Redirect to user data page after login
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl mb-4 font-semibold text-blue-600">Login</h2>
      <Input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="mb-2 w-64" 
      />
      <Input.Password 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="mb-2 w-64" 
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button 
        type="primary" 
        onClick={handleLogin} 
        className="w-64 bg-blue-500 text-white"
      >
        Login
      </Button>
    </div>
  );
};

export default Login;

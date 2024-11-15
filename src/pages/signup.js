import { useState } from "react";
import { signUpUser, addData } from "../config/firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { Input, Button, Select, message } from "antd";

const { Option } = Select;

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(""); // New state for gender
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!userName || !email || !password || !gender) {
      setError("All fields are required.");
      return;
    }

    try {
      await signUpUser(email, password);
      // Store user data in Firebase
      await addData("users", {
        userName,
        email,
        gender,
      });
      message.success("Sign Up Successful!");
      navigate("/login"); // Navigate to Login page after successful sign-up
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl mb-4 font-semibold text-blue-600">Sign Up</h2>
      <Input 
        placeholder="UserName" 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)} 
        className="mb-2 w-64" 
      />
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
      <Select 
        placeholder="Select Gender" 
        value={gender} 
        onChange={(value) => setGender(value)} 
        className="mb-2 w-64"
      >
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
        <Option value="Other">Other</Option>
      </Select>
      {error && <p className="text-red-500">{error}</p>}
      <Button 
        type="primary" 
        onClick={handleSignup} 
        className="w-64 bg-blue-500 text-white"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Signup;

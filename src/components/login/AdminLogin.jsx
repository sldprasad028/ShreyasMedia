import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import shreyasmedialogo from "../../assets/shreyasmedialogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email or mobile
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const validUsers = [
    {
      email: "user@shreyas.com",
      mobile: "8099577404",
      password: "User@123"
    },
    {
      email: "admin@shreyas.com",
      mobile: "8099577404",
      password: "Admin@123"
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const matchedUser = validUsers.find(
      (user) =>
        (user.email === identifier || user.mobile === identifier) &&
        user.password === password
    );

    if (matchedUser) {
      setIsLoggedIn(true);
      setError("");
      toast.success("Login Successful");
      navigate("/home", { replace: true });
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col  gap-8 items-center justify-center min-h-screen bg-gray-100 p-4">
      
      <img
        src={shreyasmedialogo}
        alt="Shreyas Media Logo"
        className="w-72 h-auto object-contain"
      />

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Email or Mobile Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 text-lg font-medium rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

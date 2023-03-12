import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useToken();

  const navigation = useNavigate();

  const onLoginClick = async () => {
    const response = await axios.post("http://localhost:8080/api/login", {
      email,
      password
    });

    const { token } = response.data;
    setToken(token);
    navigation("/");
  };

  return (
    <div>
      <h1>Log In Page</h1>
      {errorMessage && <div>Error: {errorMessage}</div>}
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <hr />
      <button onClick={onLoginClick} disabled={!email || !password}>
        Log In
      </button>
      <button
        onClick={() => {
          navigation("/forgot-password");
        }}
      >
        Forgot your password?
      </button>
      <button
        onClick={() => {
          navigation("/signup");
        }}
      >
        Don't have account? Sign Up
      </button>
    </div>
  );
};

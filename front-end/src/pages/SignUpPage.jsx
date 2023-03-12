import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useToken();
  const navigation = useNavigate();

  const onSignUpClick = async () => {
    const response = await axios.post("http://localhost:8080/api/signup", {
      email,
      password
    });

    const { token } = response.data;
    setToken(token);
    navigation("/");
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
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
      <input
        type="password"
        placeholder="Repeat Password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <hr />
      <button
        onClick={onSignUpClick}
        disabled={!email || !password || password !== confirmPassword}
      >
        Sign Up
      </button>
      <button
        onClick={() => {
          navigation("/login");
        }}
      >
        Already have Account? Log In
      </button>
    </div>
  );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./redux/actions/authAction";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
    navigate("/")
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        {/* {error && <span className="text-red-500">{error}</span>} */}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

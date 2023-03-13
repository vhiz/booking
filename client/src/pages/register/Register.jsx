import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./register.scss";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    passwordAgain: "",
    phone: "",
    address: "",
    country: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.passwordAgain) {
      setError("password does not match");
    } else {
      const user = {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
        phone: inputs.phone,
        address: inputs.address,
        country: inputs.country,
      };

      try {
        await makeRequest.post("auth/register", user);
        navigate("/login");
      } catch (error) {
        setError(error.response.data);
      }
    }
  };
  return (
    <div className="login">
      <div className="lContanier">
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password again"
          name="passwordAgain"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          name="phone"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={handleChange}
          required
        />
        <button onClick={handleClick}>Register</button>
        {error && <span>{error}</span>}
      </div>
      <span>Have an account?</span>
      <Link to={"/login"} style={{ textDecoration: "none" }}>
        <button>Login</button>
      </Link>
    </div>
  );
}

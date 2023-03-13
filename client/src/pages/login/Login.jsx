import { CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(inputs);
        navigate("/");
    } catch (error) {
      setError(error.response.data);
    }

    setLoading(false);
  };
  return (
    <div className="login">
      <form className="lContanier">
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
        <button onClick={handleLogin}>
          {loading ? <CircularProgress /> : "Login"}
        </button>
        {error && <span>{error}</span>}
      </form>
      <span>Dont have an account?</span>
      <Link to={"/register"} style={{ textDecoration: "none" }}>
        <button>Register</button>
      </Link>
    </div>
  );
}

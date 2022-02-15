import React, { useRef, useState } from "react";
import { useAuth } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Auth.module.css";

export default function Login() {
  const emailRef = useRef();

  const passwordRef = useRef();

  const authCtx = useAuth();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      setLoading(true);

      await authCtx.login(emailRef.current.value, passwordRef.current.value);

      navigate("/invoices", { replace: true });
    } catch (err) {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    <div className={classes.formModal}>
      <h1>Login</h1>

      {error && <p className={classes.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formInput}>
          <label htmlFor="email">Email</label>
          <input required ref={emailRef} type="email" id="email" />
        </div>

        <div className={classes.formInput}>
          <label htmlFor="password">Password</label>
          <input required ref={passwordRef} type="password" id="password" />
        </div>

        <div className={classes.actions}>
          <button
            disabled={loading}
            type="submit"
            className={classes.btnAction}
          >
            Login
          </button>

          <div className="">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </form>

      <div className={classes.link}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

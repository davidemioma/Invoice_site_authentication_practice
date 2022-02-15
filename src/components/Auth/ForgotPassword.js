import React, { useState, useRef } from "react";
import { useAuth } from "../../store/auth-context";
import { Link } from "react-router-dom";
import classes from "./Auth.module.css";

export default function ForgotPassword() {
  const authCtx = useAuth();

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      await authCtx.resetPassword(emailRef.current.value);

      setMessage("Check your inbox for further instructions");
    } catch (err) {
      setError("Failed to reset password");
    }

    setLoading(false);
  };

  return (
    <div className={classes.formModal}>
      <h1>Password Reset</h1>

      {error && <p className={classes.error}>{error}</p>}

      {message && <p className={classes.message}>{message}</p>}

      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formInput}>
          <label htmlFor="email">Email</label>
          <input required ref={emailRef} type="email" id="email" />
        </div>

        <div className={classes.actions}>
          <button
            disabled={loading}
            type="submit"
            className={classes.btnAction}
          >
            Reset
          </button>

          <div>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>

      <div className={classes.link}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

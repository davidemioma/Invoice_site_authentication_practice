import React, { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../../store/auth-context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import classes from "./Auth.module.css";

export default function SignUp() {
  const emailRef = useRef();

  const passwordRef = useRef();

  const passwordConfirmRef = useRef();

  const authCtx = useAuth();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");

      setLoading(true);

      await authCtx.signUp(emailRef.current.value, passwordRef.current.value);

      navigate("/invoices", { replace: true });
    } catch (error) {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <div className={classes.formModal}>
      <h1>SignUp</h1>

      {error && <p className={classes.error}>{error}</p>}

      <form onSubmit={onHandleSubmit} className={classes.form}>
        <div className={classes.formInput}>
          <label htmlFor="email">Email</label>
          <input required ref={emailRef} type="email" id="email" />
        </div>

        <div className={classes.formInput}>
          <label htmlFor="password">Password</label>
          <input required ref={passwordRef} type="password" id="password" />
        </div>

        <div className={classes.formInput}>
          <label htmlFor="password-confirm">Re-enter Password</label>
          <input
            required
            ref={passwordConfirmRef}
            type="password"
            id="password-confirm"
          />
        </div>

        <div className={classes.actions}>
          <button
            disabled={loading}
            type="submit"
            className={classes.btnAction}
          >
            Sign Up
          </button>
        </div>
      </form>

      <div className={classes.link}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

import classes from "./AuthForm.module.css";
import { useContext, useState } from "react";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router";
import AuthContext from "../../store/auth-context";

function AuthForm() {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const {
    value: emailInput,
    isValid: enteredEmailIsValid,
    isInvalid: emailInputIsInvalid,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(
    (value) => value.includes("@gmail.com") || value.includes("@yahoo.com")
  );

  const {
    value: passwordInput,
    isValid: enteredPasswordIsValid,
    isInvalid: passwordInputIsInvalid,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length > 5);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!enteredPasswordIsValid && !enteredEmailIsValid) return;

    setIsLoading(true);

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJS92owOW5SpmqXUS3gSDlkI-VHk8H0qM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJS92owOW5SpmqXUS3gSDlkI-VHk8H0qM";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not send request");
        }

        return res.json();
      })
      .then((data) => {
        authCtx.login(data.idToken, data.localId);

        navigate("/invoices", { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });

    resetEmailInput();

    resetPasswordInput();
  };

  return (
    <div className={classes.formModal}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.formInput}>
          <label htmlFor="email">Email</label>
          <input
            style={{ border: emailInputIsInvalid ? "red" : "none" }}
            value={emailInput}
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
        </div>

        <div className={classes.formInput}>
          <label htmlFor="password">Password</label>
          <input
            style={{ border: passwordInputIsInvalid ? "red" : "none" }}
            value={passwordInput}
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
        </div>

        <div className={classes.actions}>
          <button className={classes.btnAction}>
            {isLogin ? "Login" : "Sign Up "}
          </button>

          <button
            className={classes.btnToggle}
            onClick={switchAuthModeHandler}
            type="button"
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;

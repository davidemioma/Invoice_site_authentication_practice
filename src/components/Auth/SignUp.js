import React, { Fragment, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../../store/auth-context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
    <Fragment>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={onHandleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>

                <Button
                  disabled={loading}
                  style={{ marginTop: "1rem" }}
                  className="w-100"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

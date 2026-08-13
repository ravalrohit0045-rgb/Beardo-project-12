import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

export default function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.mobile
    ) {
      setError("All Fields Are Required");
      return;
    }

    if (user.password.length < 6) {
      setError("Password Must Be At Least 6 Characters");
      return;
    }

    try {

      setLoading(true);

      const result = await registerUser(user);

      if (!result.success) {

        setError(result.message);

        setLoading(false);

        return;

      }

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {

      console.log(err);

      setError("Something Went Wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <Container className="py-5">

      <Row className="justify-content-center">

        <Col lg={5} md={7}>

          <Card className="shadow border-0 rounded-4">

            <Card.Body className="p-4">

              <h2 className="text-center mb-4 fw-bold text-warning">
                Create Account
              </h2>

              {
                error &&
                <div className="alert alert-danger">
                  {error}
                </div>
              }

              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">

                  <Form.Label>Full Name</Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    value={user.name}
                    onChange={handleChange}
                  />

                </Form.Group>

                <Form.Group className="mb-3">

                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleChange}
                  />

                </Form.Group>

                <Form.Group className="mb-3">

                  <Form.Label>Mobile</Form.Label>

                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                    value={user.mobile}
                    onChange={handleChange}
                  />

                </Form.Group>

                                <Form.Group className="mb-4">

                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleChange}
                  />

                </Form.Group>

                <Button
                  type="submit"
                  variant="warning"
                  className="w-100 fw-bold"
                  disabled={loading}
                >
                  {
                    loading
                      ? "Creating Account..."
                      : "Sign Up"
                  }
                </Button>

              </Form>

              <div className="text-center mt-4">

                Already Have An Account ?

                <Link
                  to="/login"
                  className="ms-2 text-warning text-decoration-none fw-bold"
                >
                  Login
                </Link>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>

  );

}
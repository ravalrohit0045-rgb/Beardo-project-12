import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAPI } from "../services/auth";
import { loginUser } from "../redux/userSlice";

export default function Login() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [form, setForm] = useState({

        email: "",
        password: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!form.email || !form.password) {

            setError("Please Fill All Fields");

            return;

        }

        try {

            setLoading(true);

            const result = await loginUserAPI(

                form.email,
                form.password

            );

            if (!result.success) {

                setError(result.message);

                setLoading(false);

                return;

            }

            dispatch(

                loginUser(result.user)

            );

            alert("Login Successful");

            navigate("/");

        }

        catch (err) {

            console.log(err);

            setError("Something Went Wrong");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Container className="py-5">

            <Row className="justify-content-center">

                <Col lg={5} md={7}>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body className="p-4">

                            <h2 className="text-center text-warning fw-bold mb-4">

                                Welcome Back

                            </h2>

                            {

                                error &&

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            }

                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="mb-3">

                                    <Form.Label>Email</Form.Label>

                                    <Form.Control

                                        type="email"

                                        name="email"

                                        placeholder="Enter Email"

                                        value={form.email}

                                        onChange={handleChange}

                                    />

                                </Form.Group>

                                <Form.Group className="mb-4">

                                    <Form.Label>Password</Form.Label>

                                    <Form.Control

                                        type="password"

                                        name="password"

                                        placeholder="Enter Password"

                                        value={form.password}

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

                                            ? "Please Wait..."

                                            : "Login"

                                    }

                                </Button>

                            </Form>

                            <div className="text-center mt-4">

                                Don't Have An Account ?

                                <Link

                                    to="/register"

                                    className="ms-2 text-warning fw-bold text-decoration-none"

                                >

                                    Register

                                </Link>

                            </div>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

}
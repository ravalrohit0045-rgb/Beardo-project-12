import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../services/api";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getProducts();

    }, []);

    const getProducts = async () => {

        try {

            const res = await API.get("/products");
            setProducts(res.data);

        }

        catch (err) {
            console.log(err);
        }

        finally {
            setLoading(false);
        }

    };

    const featuredProducts = products.slice(0, 8);

    return (

        <>

            <Hero />

            <section className="py-5 bg-light">

                <Container>

                    <Row className="text-center mb-5">

                        <Col>

                            <h2 className="fw-bold display-5">

                                Featured Products

                            </h2>

                            <p className="text-muted">

                                Premium grooming essentials for modern men.

                            </p>

                        </Col>

                    </Row>
                                        {

                        loading ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-warning"
                                    style={{
                                        width: "4rem",
                                        height: "4rem"
                                    }}
                                ></div>

                            </div>

                        ) : (

                            <Row>

                                {

                                    featuredProducts.map((product) => (

                                        <Col
                                            lg={3}
                                            md={4}
                                            sm={6}
                                            xs={12}
                                            className="mb-4"
                                            key={product.id}
                                        >

                                            <ProductCard
                                                product={product}
                                            />

                                        </Col>

                                    ))

                                }

                            </Row>

                        )

                    }

                    <div className="text-center mt-5">

                        <Button

                            as={Link}

                            to="/products"

                            variant="warning"

                            size="lg"

                            className="px-5 fw-bold"

                        >

                            View All Products

                        </Button>

                    </div>

                </Container>

            </section>

            <section className="py-5 bg-dark text-white">

                <Container>

                    <Row className="text-center">

                        <Col lg={4} className="mb-4">

                            <Card className="border-0 bg-transparent text-white">

                                <Card.Body>

                                    <h2>🚚</h2>

                                    <h4>Free Shipping</h4>

                                    <p>

                                        Free delivery on orders above ₹499.

                                    </p>

                                </Card.Body>

                            </Card>

                        </Col>

                        <Col lg={4} className="mb-4">

                            <Card className="border-0 bg-transparent text-white">

                                <Card.Body>

                                    <h2>⭐</h2>

                                    <h4>Premium Quality</h4>

                                    <p>

                                        Carefully selected grooming products.

                                    </p>

                                </Card.Body>

                            </Card>

                        </Col>

                        <Col lg={4} className="mb-4">

                            <Card className="border-0 bg-transparent text-white">

                                <Card.Body>

                                    <h2>🔒</h2>

                                    <h4>Secure Payment</h4>

                                    <p>

                                        Safe & secure checkout experience.

                                    </p>

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>

                </Container>

            </section>

                        <section className="py-5 bg-warning">

                <Container>

                    <Row className="align-items-center">

                        <Col lg={8}>

                            <h2 className="fw-bold text-dark">

                                Flat 20% OFF on Premium Grooming Products

                            </h2>

                            <p className="mb-0 text-dark">

                                Upgrade your grooming routine with beard oils,
                                face wash, perfumes, hair wax and grooming kits.

                            </p>

                        </Col>

                        <Col
                            lg={4}
                            className="text-lg-end text-center mt-4 mt-lg-0"
                        >

                            <Button
                                as={Link}
                                to="/products"
                                variant="dark"
                                size="lg"
                                className="fw-bold px-5"
                            >

                                Shop Now

                            </Button>

                        </Col>

                    </Row>

                </Container>

            </section>

            <section className="py-5">

                <Container>

                    <Row className="text-center mb-5">

                        <Col>

                            <h2 className="fw-bold">

                                Why Choose Us

                            </h2>

                            <p className="text-muted">

                                Trusted by thousands of customers for premium
                                men's grooming essentials.

                            </p>

                        </Col>

                    </Row>

                    <Row>

                        <Col md={4} className="mb-4">

                            <div className="text-center">

                                <h1>🌿</h1>

                                <h4>Natural Ingredients</h4>

                                <p className="text-muted">

                                    Carefully selected ingredients for healthy
                                    skin and beard care.

                                </p>

                            </div>

                        </Col>

                        <Col md={4} className="mb-4">

                            <div className="text-center">

                                <h1>💎</h1>

                                <h4>Premium Quality</h4>

                                <p className="text-muted">

                                    Designed for modern men who value quality.

                                </p>

                            </div>

                        </Col>

                        <Col md={4} className="mb-4">

                            <div className="text-center">

                                <h1>❤️</h1>

                                <h4>Customer Satisfaction</h4>

                                <p className="text-muted">

                                    Thousands of happy customers trust our
                                    grooming collection.

                                </p>

                            </div>

                        </Col>

                    </Row>

                </Container>

            </section>

        </>

    );

}
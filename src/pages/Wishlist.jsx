import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist } from "../redux/wishlistSlice";

export default function Wishlist() {

    const dispatch = useDispatch();

    const items = useSelector(state => state.wishlist);

    if (items.length === 0) {

        return (

            <Container className="py-5 text-center">

                <h2>Your Wishlist is Empty ❤️</h2>

                <p className="text-muted">
                    Save your favourite products here.
                </p>

            </Container>

        );

    }

    return (

        <Container className="py-5">

            <h2 className="mb-4 fw-bold">
                My Wishlist
            </h2>

            <Row>

                {

                    items.map((item) => (

                        <Col
                            lg={3}
                            md={4}
                            sm={6}
                            xs={12}
                            key={item.id}
                            className="mb-4"
                        >

                            <Card className="shadow border-0 h-100">

                                <Card.Img
                                    variant="top"
                                    src={item.image}
                                    style={{
                                        height: "250px",
                                        objectFit: "contain",
                                        padding: "20px"
                                    }}
                                />

                                <Card.Body className="d-flex flex-column">

                                    <Card.Title>

                                        {item.name}

                                    </Card.Title>

                                    <h5 className="text-success mb-3">

                                        ₹ {item.price}

                                    </h5>

                                    <Button
                                        variant="dark"
                                        className="w-100 mb-2"
                                        onClick={() => dispatch(addToCart(item))}
                                    >
                                        Add To Cart
                                    </Button>

                                    <Button
                                        variant="danger"
                                        className="w-100"
                                        onClick={() =>
                                            dispatch(removeFromWishlist(item.id))
                                        }
                                    >
                                        Remove
                                    </Button>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))

                }

            </Row>

        </Container>

    );

}
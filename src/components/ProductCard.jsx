import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";

export default function ProductCard({ product }) {

    const dispatch = useDispatch();

    const cartHandler = () => {

        dispatch(addToCart(product));
        alert("Product Added To Cart");

    };

    const wishlistHandler = () => {

        dispatch(addToWishlist(product));
        alert("Added To Wishlist");

    };

    return (

        <Card className="product-card shadow border-0 h-100">

            <div className="position-relative">

                <Badge
                    bg="warning"
                    text="dark"
                    className="position-absolute top-0 start-0 m-2"
                >
                    20% OFF
                </Badge>

                <Button
                    variant="light"
                    className="position-absolute top-0 end-0 m-2 rounded-circle"
                    onClick={wishlistHandler}
                >
                    <FaHeart className="text-danger" />
                </Button>

                <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                >

                    <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        style={{
                            height: "260px",
                            objectFit: "contain",
                            padding: "20px",
                            cursor: "pointer",
                            transition: "0.3s"
                        }}
                    />

                </Link>

                <Card.Body className="d-flex flex-column">

                    <small className="text-muted text-uppercase">
                        {product.category}
                    </small>

                    <Card.Title
                        className="mt-2 fw-bold"
                        style={{
                            minHeight: "50px"
                        }}
                    >
                        {product.name}
                    </Card.Title>

                    <div className="mb-2">

                        <FaStar className="text-warning me-1" />

                        <strong>
                            {product.rating || 4.8}
                        </strong>

                        <span className="text-muted ms-2">
                            (120 Reviews)
                        </span>

                    </div>

                    <h4 className="text-success fw-bold">
                        ₹ {product.price}
                    </h4>

                    <p
                        className="text-muted"
                        style={{
                            minHeight: "65px",
                            fontSize: "14px"
                        }}
                    >
                        {product.description
                            ? product.description.substring(0, 90) + "..."
                            : "Premium grooming product for modern men."}
                    </p>
                                        <div className="mt-auto d-grid gap-2">

                        <Button
                            variant="warning"
                            onClick={cartHandler}
                        >
                            <FaShoppingCart className="me-2" />
                            Add To Cart
                        </Button>

                        <Button
                            as={Link}
                            to={`/products/${product.id}`}
                            variant="dark"
                        >
                            View Details
                        </Button>

                    </div>

                </Card.Body>

            </div>

        </Card>

    );

}
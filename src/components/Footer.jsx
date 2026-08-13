import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt
} from "react-icons/fa";

export default function Footer() {

    return (

        <footer className="footer-section">
            <Container>

                <Row className="gy-4">

                    {/* About / Social Media */}
                    <Col lg={4} md={6}>

                        <h2 className="footer-logo">BEARDO</h2>

                        <p className="footer-text">
                            Premium men's grooming products crafted for
                            confidence, style and everyday care.
                            Experience premium beard, hair and skin care.
                        </p>

                        <div className="social-icons">

                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.youtube.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                            >
                                <FaYoutube />
                            </a>

                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                            >
                                <FaTwitter />
                            </a>

                        </div>

                    </Col>


                    {/* Contact */}
                    <Col lg={4} md={6}>

                        <h4 className="footer-heading">
                            Contact Us
                        </h4>

                        <p>
                            <FaPhoneAlt className="me-2 text-warning" />
                            +91 9510741618
                        </p>

                        <p>
                            <FaEnvelope className="me-2 text-warning" />
                            support@beardo.com
                        </p>

                        <p>
                            <FaMapMarkerAlt className="me-2 text-warning" />
                            Ahmedabad, Gujarat, India
                        </p>

                    </Col>


                    {/* Quick Links */}
                    <Col lg={4} md={12}>

                        <h4 className="footer-heading">
                            Quick Links
                        </h4>

                        <ul className="footer-links">

                            <li>
                                <a href="/">Home</a>
                            </li>

                            <li>
                                <a href="/products">Products</a>
                            </li>

                            <li>
                                <a href="/cart">Cart</a>
                            </li>

                            <li>
                                <a href="/wishlist">Wishlist</a>
                            </li>

                            <li>
                                <a href="/login">Login</a>
                            </li>

                            <li>
                                <a href="/register">Register</a>
                            </li>

                        </ul>

                    </Col>

                </Row>


                <hr className="footer-line" />


                <div className="text-center footer-bottom">

                    © {new Date().getFullYear()} BEARDO.
                    All Rights Reserved.

                </div>

            </Container>

        </footer>

    );

}
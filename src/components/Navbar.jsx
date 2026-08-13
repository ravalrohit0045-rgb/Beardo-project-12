import React, { useState } from "react";
import {
    Navbar,
    Nav,
    Container,
    Form,
    FormControl,
    Button,
    Badge
} from "react-bootstrap";

import {Link, useNavigate} from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUserCircle, FaSearch, FaBars} from "react-icons/fa";
import { useDispatch,useSelector} from "react-redux";
import { logoutUser} from "../redux/userSlice";
export default function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const { currentUser, isLogin } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const items = useSelector((state) => state.wishlist);
    const logout = () => {dispatch(logoutUser());navigate("/login");};
    const searchProduct = (e) => {
        e.preventDefault();

        if (search.trim() !== "") {
            navigate(`/products?search=${search}`);
        }

    };

    return (

        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-lg py-3">
            <Container>
                <Navbar.Brand as={Link} to="/"className="fw-bold text-warning fs-2">BEARDO</Navbar.Brand>
                <Navbar.Toggle>
                    <FaBars />
                </Navbar.Toggle>

                <Navbar.Collapse>
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/"> Home</Nav.Link>
                        <Nav.Link as={Link} to="/products"> Products</Nav.Link>
                        <Nav.Link as={Link} to="/admin"> Admin</Nav.Link>
                    </Nav>
                    <Form className="d-flex me-4" onSubmit={searchProduct}>
                        <FormControl type="search"  placeholder="Search Products..."className="me-2" value={search} onChange={(e) => setSearch(e.target.value) }/>
                        <Button type="submit" variant="warning" >
                            <FaSearch />
                        </Button>
                    </Form>
                     <Nav className="align-items-center">
                        <Nav.Link as={Link} to="/wishlist" className="position-relative me-2">
                            <FaHeart size={20} />
                            <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                {items.length}
                            </Badge>
                        </Nav.Link>

                        <Nav.Link as={Link} to="/cart" className="position-relative me-3">

                            <FaShoppingCart size={20} />
                            <Badge bg="warning" text="dark" pill className="position-absolute top-0 start-100 translate-middle"> {cartItems.length}</Badge>

                        </Nav.Link>

                        {
                            isLogin ? (
                                <>
                                    <span className="text-warning fw-bold me-3">
                                        <FaUserCircle className="me-2" />
                                        {currentUser?.name}
                                    </span>
                                    <Button variant="outline-warning" onClick={logout}>  Logout </Button>
                                </>

                            ) : (
                                <Button as={Link} to="/login" variant="warning"> Login </Button>
                            )
                        }
                    </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
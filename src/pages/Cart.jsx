import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  Form,
} from "react-bootstrap";

import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);


  const [step, setStep] = useState("cart");


  const [shipping, setShipping] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping Save
  const saveShipping = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  const placeOrder = () => {
    alert("🎉 Order Placed Successfully!");

    dispatch(clearCart());

    setStep("success");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (cartItems.length === 0 && step === "cart") {
    return (
      <Container className="py-5 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          width="180"
        />

        <h2 className="mt-4">Your Cart is Empty</h2>

        <p className="text-muted">
          Add some premium products to continue shopping.
        </p>
      </Container>
    );
  }


  if (step === "shipping") {
    return (
      <Container className="py-5">
        <Card
          className="shadow border-0 rounded-4 p-4 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <h2 className="text-center mb-4">
            Shipping Details
          </h2>

          <Form onSubmit={saveShipping}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={shipping.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={shipping.mobile}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={shipping.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={shipping.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={shipping.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={shipping.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    name="pincode"
                    value={shipping.pincode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              variant="warning"
              className="w-100 fw-bold"
            >
              Continue To Payment
            </Button>

            <Button
              variant="secondary"
              className="w-100 mt-3"
              onClick={() => setStep("cart")}
            >
              Back To Cart
            </Button>
          </Form>
        </Card>
      </Container>
    );
  }

  if (step === "payment") {
    return (
      <Container className="py-5">
        <Card
          className="shadow border-0 rounded-4 p-4 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <h2 className="text-center mb-4">
            Select Payment Method
          </h2>

          <Form>

            <Form.Check
              type="radio"
              label="Cash On Delivery (COD)"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-3"
            />

            <Form.Check
              type="radio"
              label="UPI"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-3"
            />

            <Form.Check
              type="radio"
              label="Credit / Debit Card"
              name="payment"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-4"
            />

            {/* CARD DETAILS */}

            {paymentMethod === "CARD" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Card Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Card Holder Name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="***"
                        maxLength={3}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}


            {paymentMethod === "UPI" && (
              <Form.Group className="mb-4">
                <Form.Label>UPI ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="example@upi"
                  required
                />
              </Form.Group>
            )}


            {paymentMethod === "COD" && (
              <div className="alert alert-success">
                Cash on Delivery is available.
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">

              <Button
                variant="secondary"
                onClick={() => setStep("shipping")}
              >
                Back
              </Button>

              <Button
                variant="success"
                onClick={placeOrder}
              >
                Place Order
              </Button>

            </div>

          </Form>
        </Card>
      </Container>
    );
  }



  if (step === "success") {
    return (
      <Container className="py-5 text-center">
        <Card
          className="shadow border-0 rounded-4 p-5 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="text-success">
            ✅ Order Placed Successfully
          </h1>

          <p className="mt-3">
            Thank you for shopping with us.
          </p>

          <p className="text-muted">
            Redirecting to Home Page...
          </p>
        </Card>
      </Container>
    );
  }



  return (
    <Container className="py-5">
  <Row>
    <Col lg={8}>
      <Table hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td style={{ width: "170px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "contain",
                  }}
                />
              </td>

              <td className="text-start">
                <strong>{item.name}</strong>
                <br />
                <small className="text-success">
                  In Stock
                </small>
              </td>

              <td>₹ {item.price}</td>

              <td>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => dispatch(decreaseQty(item.id))}
                >
                  -
                </Button>

                <span className="mx-3">
                  {item.quantity}
                </span>

                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => dispatch(increaseQty(item.id))}
                >
                  +
                </Button>
              </td>

              <td>
                ₹ {item.price * item.quantity}
              </td>

              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>

    <Col lg={4}>
      <Card className="shadow border-0 rounded-4">
        <Card.Body>

          <h3 className="text-center mb-4">
            Order Summary
          </h3>

          <div className="d-flex justify-content-between mb-3">
            <span>Total Items</span>

            <strong>
              {cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </strong>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span>Sub Total</span>

            <strong>
              ₹ {totalPrice}
            </strong>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span>Delivery</span>

            <strong className="text-success">
              FREE
            </strong>
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <h4>Grand Total</h4>

            <h4 className="text-success">
              ₹ {totalPrice}
            </h4>
          </div>

          <Button
            variant="warning"
            size="lg"
            className="w-100 mt-4 fw-bold"
            onClick={() => setStep("shipping")}
          >
            Continue To Shipping
          </Button>

          <Button
            variant="outline-danger"
            className="w-100 mt-3"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>

          <Button
            variant="dark"
            className="w-100 mt-3"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>

        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
    );
}
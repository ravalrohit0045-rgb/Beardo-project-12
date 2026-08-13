import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Button,
  Badge,
  Card,
} from "react-bootstrap";
import API from "../services/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getData = async () => {

      try {

        const productRes = await API.get("/products/" + id);
        setProduct(productRes.data);

        const allProducts = await API.get("/products");
        setProducts(allProducts.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    getData();

  }, [id]);

  const cartHandler = () => {

    dispatch(addToCart(product));
    alert("Added To Cart");

  };

  const buyNow = () => {

    dispatch(addToCart(product));
    navigate("/cart");

  };

  const wishlistHandler = () => {

    dispatch(addToWishlist(product));
    alert("Added To Wishlist");

  };

  const similarProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  if (loading) {

    return (

      <div className="text-center p-5">
        <h2>Loading...</h2>
      </div>

    );

  }

  return (

    <Container className="py-5">

      <Row>

        <Col lg={6}>

          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />

        </Col>

        <Col lg={6}>

          <Badge bg="warning">
            {product.category}
          </Badge>

          <h2 className="mt-3">
            {product.name}
          </h2>

          <h3 className="text-success">
            ₹ {product.price}
          </h3>

          <p>
            {product.description}
          </p>

          <div className="mb-3">

            <span className="text-warning fs-5">
              ★★★★★
            </span>

            <span className="ms-2 text-muted">
              ({product.rating || 4.8})
            </span>

          </div>
                    <div className="mb-4">

            <Button
              variant="dark"
              className="me-3"
              onClick={cartHandler}
            >
              Add To Cart
            </Button>

            <Button
              variant="warning"
              className="me-3"
              onClick={buyNow}
            >
              Buy Now
            </Button>

            <Button
              variant="outline-danger"
              onClick={wishlistHandler}
            >
              ❤ Wishlist
            </Button>

          </div>

          <hr />

          <div className="mt-4">

            <h5 className="fw-bold">
              Product Highlights
            </h5>

            <ul className="mt-3">

              <li>Premium Quality Ingredients</li>
              <li>Suitable For Daily Use</li>
              <li>Long Lasting Fragrance</li>
              <li>Dermatologically Tested</li>
              <li>Easy Return Available</li>
              <li>Cash On Delivery Available</li>

            </ul>

          </div>

          <div className="alert alert-success mt-4">

            <strong>
              Free Delivery
            </strong>

            <br />

            On Orders Above ₹499

          </div>

        </Col>

      </Row>

      <hr className="my-5" />

      <h2 className="fw-bold text-center mb-4">
        Similar Products
      </h2>

      <Row>

        {similarProducts.length > 0 ? (

          similarProducts.map((item) => (

            <Col
              lg={3}
              md={4}
              sm={6}
              xs={12}
              key={item.id}
              className="mb-4"
            >

              <ProductCard
                product={item}
              />

            </Col>

          ))

        ) : (

          <Col>

            <Card className="border-0 shadow-sm">

              <Card.Body className="text-center py-5">

                <h5>
                  No Similar Products Found
                </h5>

              </Card.Body>

            </Card>

          </Col>

        )}

      </Row>

    </Container>

  );

}
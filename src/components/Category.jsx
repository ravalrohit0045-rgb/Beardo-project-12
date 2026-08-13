import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const categories = [
  "Hair",
  "Beard",
  "Skin",
  "Perfume"
];

export default function Category() {
  return (
    <Container className="py-5">

      <h2 className="text-center fw-bold mb-5"> Shop By Category </h2>

      <Row>

        {categories.map((item, index) => (

          <Col md={3} key={index}>
            <Card className="category-card text-center p-4 shadow">
              <Card.Body>
                <h3>{item}</h3>
              </Card.Body>
              </Card>
          </Col>

        ))}

      </Row>
    </Container>
  );
}
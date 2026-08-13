import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <Swiper modules={[Pagination, Autoplay]}
     pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="heroSwiper"
    >
      
      <SwiperSlide>
        <section className="hero-section">
          <Container>
            <Row className="align-items-center">

              <Col lg={6}>
                <span className="hero-tag">Premium Men's Grooming</span>
                <h1 className="hero-title">BEARD<br/>LIKE A MAN</h1>
                <p className="hero-text">
                  Upgrade your grooming routine with premium beard oils,
                  beard wash, perfumes, face wash, hair wax and grooming kits.
                </p>

                <div className="mt-4">

                  <Button as={Link} to="/products" variant="warning" size="lg" className="me-3 fw-bold px-4">Shop Now</Button>
                  <Button as={Link} to="/register" variant="outline-light" size="lg" className="fw-bold px-4">Join Now</Button>

                </div>
              </Col>

              <Col lg={6} className="text-center mt-5 mt-lg-0">
                <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900" alt="Beard" className="img-fluid hero-image"/>
              </Col>
            </Row>
          </Container>
        </section>
      </SwiperSlide>

      <SwiperSlide>
        <section className="hero-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <span className="hero-tag"> Premium Perfumes</span>
                <h1 className="hero-title"> FEEL <br /> CONFIDENT</h1>
                <p className="hero-text"> Long lasting fragrances specially made for modern men.</p>

                <div className="mt-4">
                  <Button as={Link} to="/products" variant="warning" size="lg" className="fw-bold px-4"> Shop Now </Button>
                </div>

              </Col>

              <Col lg={6} className="text-center mt-5 mt-lg-0">
                <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900" alt="Perfume" className="img-fluid hero-image"/>
              </Col>
            </Row>
          </Container>
        </section>
      </SwiperSlide>
    
      <SwiperSlide>

        <section className="hero-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>

                <span className="hero-tag"> Hair Styling Collection </span>
                <h1 className="hero-title"> STYLE <br /> YOUR HAIR </h1>
                <p className="hero-text"> Premium Hair Wax, Hair Spray and Styling products for every hairstyle.</p>
                <div className="mt-4">
                  <Button as={Link} to="/products" variant="warning" size="lg" className="fw-bold px-4">Shop Now</Button>
                </div>
              </Col>

              <Col lg={6} className="text-center mt-5 mt-lg-0">
                <img src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=900" alt="Hair Styling" className="img-fluid hero-image" />
              </Col>
            </Row>
          </Container>
        </section>
      </SwiperSlide>
    </Swiper>
  );
}
import React, { useEffect, useMemo, useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Spinner
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");

    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") || "";

    useEffect(() => {

        getProducts();

    }, []);

    const getProducts = async () => {

        try {

            const res = await API.get("/products");

            setProducts(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const filteredProducts = useMemo(() => {

        let data = [...products];

        if (search) {

            data = data.filter(item =>
                item.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }

        if (category !== "All") {

            data = data.filter(
                item => item.category === category
            );

        }

        if (sort === "low") {

            data.sort(
                (a, b) => Number(a.price) - Number(b.price)
            );

        }

        if (sort === "high") {

            data.sort(
                (a, b) => Number(b.price) - Number(a.price)
            );

        }

        return data;

    }, [products, category, sort, search]);
        if (loading) {

        return (

            <div className="text-center py-5">

                <Spinner
                    animation="border"
                    variant="warning"
                    style={{
                        width: "70px",
                        height: "70px"
                    }}
                />

            </div>

        );

    }

    return (

        <Container className="py-5">

            <Row className="mb-4">

                <Col md={6}>

                    <h2 className="fw-bold text-warning">

                        All Products

                    </h2>

                    {

                        search && (

                            <p className="text-muted">

                                Search Result :
                                <strong> {search}</strong>

                            </p>

                        )

                    }

                </Col>

                <Col md={3}>

                    <Form.Select

                        value={category}

                        onChange={(e) =>
                            setCategory(e.target.value)
                        }

                    >

                        <option value="All">
                            All Categories
                        </option>

                        <option value="Beard">
                            Beard
                        </option>

                        <option value="Hair">
                            Hair
                        </option>

                        <option value="Skin">
                            Skin
                        </option>

                        <option value="Perfume">
                            Perfume
                        </option>

                    </Form.Select>

                </Col>

                <Col md={3}>

                    <Form.Select

                        value={sort}

                        onChange={(e) =>
                            setSort(e.target.value)
                        }

                    >

                        <option value="">
                            Sort By
                        </option>

                        <option value="low">
                            Price Low to High
                        </option>

                        <option value="high">
                            Price High to Low
                        </option>

                    </Form.Select>

                </Col>

            </Row>

            <Row>
                          {

                filteredProducts.length === 0 ? (

                    <Col>

                        <div className="text-center py-5">

                            <h3 className="text-danger">

                                No Products Found

                            </h3>

                            <p className="text-muted">

                                Try another search or category.

                            </p>

                        </div>

                    </Col>

                ) : (

                    filteredProducts.map((product) => (

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

                )

            }

        </Row>

    </Container>
        );

}
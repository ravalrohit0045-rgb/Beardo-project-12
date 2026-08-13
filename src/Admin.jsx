import React, { useEffect, useState } from "react";
import API from "./services/api";

import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Table
} from "react-bootstrap";

export default function Admin() {
    const initialState = {
        name: "",
        price: "",
        category: "",
        image: "",
        rating: "",
        description: ""
    };

    const [product, setProduct] = useState(initialState);
    const [products, setProducts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
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
    };

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            product.name === "" ||
            product.price === "" ||
            product.category === "" ||
            product.image === ""
        ) {
            alert("Please Fill All Fields");
            return;
        }
        setLoading(true);
        try {
            if (editId === null) {
                await API.post("/products", product);
                alert("Product Added Successfully");
            }

            else {
                await API.put(`/products/${editId}`,product);
                alert("Product Updated");
                setEditId(null);
            }

            setProduct(initialState);
            getProducts();

        }

        catch (err) {
            console.log(err);
        }

        finally {
            setLoading(false);
        }

    };

    const editProduct = (item) => {

        setProduct(item);
        setEditId(item.id);

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    };

        const deleteProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");

        if (!confirmDelete) return;

        try {
            await API.delete(`/products/${id}`);
            alert("Product Deleted Successfully");
            getProducts();

        } catch (err) {
            console.log(err);

        }

    };

    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <Container className="py-5">
            <Row>
                <Col lg={4}>
                    <Card className="shadow border-0 rounded-4">
                        <Card.Body>
                            <h3 className="text-center mb-4 text-warning">
                                {
                                    editId
                                        ? "Update Product"
                                        : "Add Product"
                                }
                            </h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Product Name
                                    </Form.Label>
                                    <Form.Control type="text" name="name" value={product.name} onChange={handleChange} placeholder="Enter Product Name"/>
                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" value={product.price} onChange={handleChange} placeholder="Enter Price"/>

                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label> Category </Form.Label>

                                    <Form.Select name="category" value={product.category} onChange={handleChange}>

                                        <option value=""> Select Category</option>
                                        <option> Beard </option>
                                        <option> Hair</option>
                                        <option> Skin </option>
                                        <option> Perfume </option>

                                    </Form.Select>

                                </Form.Group>
                                <Form.Group className="mb-3">

                                    <Form.Label> Image URL</Form.Label>
                                    <Form.Control type="text" name="image" value={product.image} onChange={handleChange} placeholder="Paste Image URL"/>

                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label> Rating</Form.Label>
                                    <Form.Control type="number" step="0.1" name="rating" value={product.rating} onChange={handleChange} placeholder="4.8"/>

                                </Form.Group>

                                <Form.Group className="mb-4">

                                    <Form.Label> Description </Form.Label>
                                    <Form.Control as="textarea" rows={4} name="description" value={product.description} onChange={handleChange} placeholder="Enter Product Description"/>

                                </Form.Group>

                                <Button type="submit" variant="warning" className="w-100 fw-bold" disabled={loading}>
                                    {
                                        loading
                                            ? "Please Wait..."
                                            : editId
                                                ? "Update Product"
                                                : "Add Product"
                                    }
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8}>

                    <Card className="shadow border-0 rounded-4">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="text-warning mb-0"> Product List </h3>
                                <Form.Control type="text" placeholder="Search Product..." style={{ width: "300px" }} value={search} onChange={(e) => setSearch(e.target.value)}/>
                            </div>

                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                className="align-middle text-center"
                            >

                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Rating</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredProducts.length === 0 ?
                                            (
                                                <tr>
                                                    <td colSpan="8" className="text-center text-danger fw-bold">No Products Found </td>
                                                </tr>
                                            )
                                            :
                                            (
                                                filteredProducts.map((item) => (
                                                    <tr key={item.id}>
                                                        <td> {item.id} </td>
                                                        <td>
                                                            <img src={item.image} alt={item.name} width="70" height="70" style={{ objectFit: "contain" }} />
                                                        </td>

                                                        <td>{item.name} </td>
                                                        <td> <span className="badge bg-secondary">{item.category}</span></td>
                                                        <td className="fw-bold text-success"> ₹ {item.price}</td>
                                                        <td>⭐ {item.rating} </td>
                                                        <td>
                                                            <Button variant="primary" size="sm" onClick={() => editProduct(item)}>Edit</Button>
                                                        </td>

                                                        <td>

                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => deleteProduct(item.id)}
                                                            >
                                                                Delete
                                                            </Button>

                                                        </td>

                                                    </tr>

                                                ))

                                            )

                                    }

                                </tbody>

                            </Table>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

}
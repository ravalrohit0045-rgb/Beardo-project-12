import React from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({
    search,
    setSearch
}) {
    return (
        <Form.Control type="text" placeholder="Search Beardo Products..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-box shadow-sm"/>
    );

}
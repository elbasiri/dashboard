import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageComponent from "./imageComponent";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data."+error);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Product List</h2>
      {loading ? (
        <div style={{ width: "100%", height: "200px" }}>Loading products...</div>
      ) : (
        <table className="table text-light bg-dark">
          <thead>
            <tr>
              <th>image</th>
              <th>product_id</th>
              <th>partner_id</th>
              <th>category_id</th>
              <th>name</th>
              <th colSpan={2}>description</th>
              <th>price</th>
              <th>quantity</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                 <ImageComponent imageName={product.image} />
                <td>{product.product_id}</td>
                <td>{product.partner_id}</td>
                <td>{product.category_id}</td>
                <td>{product.image}</td>
                <td colSpan={2}>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td> 
                  <Link style={{marginRight:'50px'}} to={`/products/${product.product_id}`} className="btn btn-warning">Suspend Product Listing</Link>
                  <Link to={`/products/${product.product_id}`} className="btn btn-danger">
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import ImageComponent from "./imageComponent";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data: " + error);
      });
  }, []);

  const handleDelete = (productId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/products/${productId}`)
      .then((response) => {
        setProducts(products.filter((product) => product.product_id !== productId));
      })
      .catch((error) => {
        setError("Error deleting the product: " + error);
      });
  };

  const handleSuspend = (product_id) => {
    const confirmSuspension = window.confirm(
      "Are you sure you want to suspend this product?"
    );
    if (confirmSuspension) {
      fetch(`http://127.0.0.1:8000/api/products/${product_id}/suspend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error suspending product");
          }
          console.log("Product suspended successfully");
          fetchProducts(); // Refresh the product list after suspension
        })
        .catch((error) => {
          console.error("Error suspending product:", error);
        });
    }
  };

  const handleUnsuspend = (product_id) => {
    const confirmSuspension = window.confirm(
      "Are you sure you want to unsuspend this product?"
    );
    if (confirmSuspension) {
      fetch(`http://127.0.0.1:8000/api/products/${product_id}/unsuspend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error unsuspending product");
          }
          console.log("Product unsuspended successfully");
          fetchProducts(); // Refresh the product list after unsuspension
        })
        .catch((error) => {
          console.error("Error unsuspending product:", error);
        });
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };

  const sortedProducts = [...products];

  if (sortColumn) {
    sortedProducts.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Product List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Product Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <div style={{ width: "100%", height: "200px" }}>Loading products...</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredProducts.map((product, index) => (
            <div className="col" key={index}>
              <div className="card">
                <ImageComponent imageName={product.image} />
                <div className="card-body bg-dark">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Partner: {product.partner_name}</p>
                  <p className="card-text">Category: {product.category_name}</p>
                  <p className="card-text">Description: {product.description}</p>
                  <p className="card-text">Price: {product.price}</p>
                  <p className="card-text">Quantity: {product.quantity}</p>
                  <div className="d-grid gap-2">
                    {product.suspended ? (
                      <button
                        onClick={() => handleUnsuspend(product.product_id)}
                        className="btn btn-success"
                      >
                        Unsuspend Product
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSuspend(product.product_id)}
                        className="btn btn-warning"
                      >
                        Suspend Product
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(product.product_id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

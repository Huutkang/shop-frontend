import React, { useState } from "react";
import productApi from "../../../api/productApi";

const GetProductsByCategory = () => {
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const handleFetch = async () => {
    try {
      const data = await productApi.getProductsByCategoryId(categoryId);
      setProducts(data);
      setMessage("");
    } catch (error) {
      setMessage("Failed to fetch products.");
    }
  };

  return (
    <div>
      <h2>Get Products By Category</h2>
      <input
        type="number"
        placeholder="Enter Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>
      {message && <p>{message}</p>}
      {products.length > 0 ? (
        <div>
          <h3>Products:</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <h4>{product.name}</h4>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>Description: {product.description}</p>
                <p>Unique Features: {product.uniqueFeatures}</p>
                <p>Featured: {product.isFeatured ? "Yes" : "No"}</p>
                <p>Location: {product.city}, {product.district}</p>
                <p>Category: {product.categoryId}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default GetProductsByCategory;
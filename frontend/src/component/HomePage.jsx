import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const base_url = import.meta.env.VITE_HOST_URL;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${base_url}/products`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container">
      <h1 className="heading">Vegetables and Fruits Available</h1>
      {loading ? ( // Conditional rendering based on loading state
        <h2>Loading products... Please wait while we fetch for you from our backend :)  </h2>
       
      ) : products.length > 0 ? (
        <div className="grid">
          {products.map((product) => (
            <div key={product._id} className="card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price_per_unit}</p>
              <button className="buy-button" onClick={() => handleBuyNow(product._id)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default HomePage;

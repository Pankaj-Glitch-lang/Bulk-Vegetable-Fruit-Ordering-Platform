import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const base_url = import.meta.env.VITE_HOST_URL;


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details from API
    const fetchProductDetails = async () => {
      const response = await fetch(`${base_url}/products/${id}`);
      const data = await response.json();
      console.log(data)
      setProduct(data.data);
    };
    fetchProductDetails();
  }, [id]);

  const handleProceedToBuy = () => {
    navigate('/order', { state: { product } });
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="product-details-container">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">Price: ${product.price_per_unit}</p>
        <button className="buy-button" onClick={handleProceedToBuy}>
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

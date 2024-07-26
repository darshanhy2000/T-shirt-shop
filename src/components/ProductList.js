import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ gender: '', color: '', type: '', priceRange: '' });

  useEffect(() => {
    fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredProducts = products.filter(product => {
    return (
      (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.color.toLowerCase().includes(searchTerm.toLowerCase()) || product.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.gender === '' || product.gender === filters.gender) &&
      (filters.color === '' || product.color === filters.color) &&
      (filters.type === '' || product.type === filters.type) &&
      (filters.priceRange === '' || product.price <= parseInt(filters.priceRange))
    );
  });

  return (
    <div>
      <div className="search-filter">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} className="search-button-container" />
        <div>
          <label>Gender:</label>
          <select name="gender" value={filters.gender} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div>
          <label>Color:</label>
          <select name="color" value={filters.color} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Polo">Polo</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
        <div>
          <label>Price Range:</label>
          <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="500">Up to 500</option>
            <option value="1000">Up to 1000</option>
            <option value="1500">Up to 1500</option>
          </select>
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

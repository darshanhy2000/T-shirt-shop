import React, { useEffect, useState, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles.css';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [colorFilter, setColorFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceRangeFilter, setPriceRangeFilter] = useState('All');

  useEffect(() => {
    fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = products;

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTermLower) ||
          product.color.toLowerCase().includes(searchTermLower) ||
          product.type.toLowerCase().includes(searchTermLower)
      );
    }

    if (genderFilter !== 'All') {
      filtered = filtered.filter((product) => product.gender === genderFilter);
    }

    if (colorFilter !== 'All') {
      filtered = filtered.filter((product) => product.color === colorFilter);
    }

    if (typeFilter !== 'All') {
      filtered = filtered.filter((product) => product.type === typeFilter);
    }

    if (priceRangeFilter !== 'All') {
      filtered = filtered.filter((product) => {
        if (priceRangeFilter === 'low') return product.price <= 250;
        if (priceRangeFilter === 'medium') return product.price > 250 && product.price <= 500;
        return product.price > 500;
      });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, genderFilter, colorFilter, typeFilter, priceRangeFilter, products]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          {/* Add more colors */}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Polo">Polo</option>
          <option value="Hoodie">Hoodie</option>
          {/* Add more types */}
        </select>
        <select value={priceRangeFilter} onChange={(e) => setPriceRangeFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="low">₹0 - ₹250</option>
          <option value="medium">₹250 - ₹500</option>
          <option value="high">Above ₹500</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;

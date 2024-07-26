import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount }) => {
  return (
    <header>
      <h1>T-Shirt Shop</h1>
      <Link to="/cart">Cart ({cartCount})</Link>
    </header>
  );
};

export default Header;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" Component={HomePage} />
        <Route path="/products/:category/:productId" Component={ProductPage} />
      </Routes>
    </Router>
  );
}

export default App;

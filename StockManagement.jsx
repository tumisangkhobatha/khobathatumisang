import React, { useState, useEffect } from 'react';
import '../App.css';

const StockManagement = () => {
  const [inventory, setInventory] = useState(() => JSON.parse(localStorage.getItem('inventory')) || []);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const handleAddOrUpdateStock = (e) => {
    e.preventDefault();
    const productIndex = inventory.findIndex(item => item.name.toLowerCase() === productName.toLowerCase());

    if (editingProduct) {
      const updatedInventory = [...inventory];
      updatedInventory[productIndex] = {
        name: productName,
        quantity: parseInt(quantity),
        price: price ? parseFloat(price) : 0
      };
      setInventory(updatedInventory);
      setMessage(`Product ${productName} updated successfully.`);
    } else if (productIndex !== -1) {
      const updatedInventory = [...inventory];
      updatedInventory[productIndex].quantity += parseInt(quantity);
      if (price) {
        updatedInventory[productIndex].price = parseFloat(price);
      }
      setInventory(updatedInventory);
      setMessage(`Stock added successfully for ${productName}. New quantity: ${updatedInventory[productIndex].quantity}`);
    } else {
      const newProduct = {
        name: productName,
        quantity: parseInt(quantity),
        price: price ? parseFloat(price) : 0
      };
      setInventory([...inventory, newProduct]);
      setMessage(`New product ${productName} added to inventory.`);
    }

    setProductName('');
    setQuantity('');
    setPrice('');
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productName) => {
    const updatedInventory = inventory.filter(item => item.name !== productName);
    setInventory(updatedInventory);
    setMessage(`Product ${productName} deleted successfully.`);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setQuantity(product.quantity);
    setPrice(product.price);
  };

  return (
    <div className="form-container">
      <h2>Stock Management</h2>
      <form onSubmit={handleAddOrUpdateStock}>
        <label>Product Name</label>
        <input 
          type="text" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          required 
          disabled={!!editingProduct} 
        />
        <label>Quantity</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />
        <label>Price</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <button type="submit">{editingProduct ? 'Update Stock' : 'Add Stock'}</button>
        {editingProduct && <button type="button" onClick={() => setEditingProduct(null)}>Cancel Update</button>}
      </form>
      {message && <p>{message}</p>}

      <h3>Inventory</h3>
      <ul>
        {inventory.map(item => (
          <li key={item.name}>
            {item.name}: {item.quantity} in stock, priced at ${item.price.toFixed(2)}
            <button className="edit-btn" onClick={() => handleEditProduct(item)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeleteProduct(item.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockManagement;

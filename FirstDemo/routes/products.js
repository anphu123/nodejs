const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'Laptop', price: 1200, information: 'Powerful laptop for work and gaming', status: 'In stock', category: 'Electronics' },
  { id: 2, name: 'T-shirt', price: 25, information: 'Comfortable cotton t-shirt', status: 'Out of stock', category: 'Clothing' },
  { id: 3, name: 'JavaScript Book', price: 40, information: 'A comprehensive guide to JavaScript', status: 'In stock', category: 'Books' },
  { id: 4, name: 'Smartphone', price: 800, information: 'Latest smartphone with advanced features', status: 'In stock', category: 'Electronics' },
  { id: 5, name: 'Running Shoes', price: 60, information: 'High-performance running shoes', status: 'In stock', category: 'Clothing' },
  { id: 6, name: 'Python Book', price: 35, information: 'A guide to Python programming language', status: 'Out of stock', category: 'Books' },
  { id: 7, name: 'Headphones', price: 100, information: 'Noise-canceling headphones for immersive audio', status: 'In stock', category: 'Electronics' },
  { id: 8, name: 'Denim Jeans', price: 45, information: 'Classic denim jeans for a casual look', status: 'Out of stock', category: 'Clothing' }

];

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/category/:category', getProductsByCategory);

function getAllProducts(req, res) {
  res.json(products);
}

function getProductById(req, res) {
  const productId = parseInt(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
}

function createProduct(req, res) {
  const { name, price, information, status, category } = req.body;

  if (!name || !price || !information || !status || !category) {
    return res.status(400).json({ message: 'Name, price, information, status, and category are required for a new product' });
  }

  const newProduct = {
    id: generateUniqueId(),
    name: name,
    price: price,
    information: information,
    status: status,
    category: category
  };

  products.push(newProduct);

  res.status(201).json({ message: 'Product created successfully', product: newProduct });
}

function updateProduct(req, res) {
  const productId = parseInt(req.params.id);
  const { name, price, information, status, category } = req.body;

  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = {
    id: productId,
    name: name || products[productIndex].name,
    price: price || products[productIndex].price,
    information: information || products[productIndex].information,
    status: status || products[productIndex].status,
    category: category || products[productIndex].category
  };

  products[productIndex] = updatedProduct;

  res.json({ message: 'Product updated successfully', product: updatedProduct });
}

function deleteProduct(req, res) {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];

  res.json({ message: 'Product deleted successfully', product: deletedProduct });
}

function getProductsByCategory(req, res) {
  const category = req.params.category;
  const filteredProducts = products.filter((item) => item.category.toLowerCase() === category.toLowerCase());

  if (filteredProducts.length === 0) {
    return res.status(404).json({ message: `No products found for the category '${category}'` });
  }

  res.json(filteredProducts);
}

function generateUniqueId() {
  // A simple function to generate unique IDs for new products
  return Math.floor(Math.random() * 1000000) + 1;
}

module.exports = router;

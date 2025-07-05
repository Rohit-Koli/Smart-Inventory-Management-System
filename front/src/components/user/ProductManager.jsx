import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8081/product";

const ProductManager = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [userId]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/byUser/${userId}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE}/updateProduct?id=${editId}`, form);
      } else {
        await axios.post(`${API_BASE}/addProduct?id=${userId}`, form);
      }
      setForm({ name: "", description: "", price: "" });
      console.log(userId)
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/deleteProduct?id=${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setEditId(product.id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">{editId ? "Update" : "Add"} Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          required
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="col-span-full md:col-span-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Your Products</h2>
      <ul className="divide-y">
        {products.map((product) => (
          <li key={product.id} className="py-3 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm">Price: ₹{product.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManager;

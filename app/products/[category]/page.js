"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const ProductCard = ({ product, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-4">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-blue-600 font-semibold">${product.price}</p>
        {onDelete && (
          <button
            onClick={() => onDelete(product.id)}
            className="mt-2 text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default function CategoryPage() {
  const { category } = useParams();
  const { data: session } = useSession();
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!category) return;

      try {
        setLoading(true);
        setError(null);
        console.log("Fetching category with slug:", category);

        const response = await fetch(`/api/categories/?slug=${category}`);
        const data = await response.json();
        console.log("Category API response:", data);

        if (data.results && data.results.length > 0) {
          const categoryInfo = data.results[0];
          setCategoryData(categoryInfo);
          console.log("Category found:", categoryInfo);

          // Fetch products using the category ID
          console.log("Fetching products for category ID:", categoryInfo.id);
          const productsResponse = await fetch(
            `/api/products/?category_id=${categoryInfo.id}`
          );

          const productsData = await productsResponse.json();
          console.log("Products response:", productsData);

          if (!productsResponse.ok) {
            throw new Error(productsData.error || "Failed to fetch products");
          }

          setProducts(productsData.results || []);
        } else {
          setError("Category not found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("category_id", categoryData.id);
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      console.log("Creating product with data:", {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category_id: categoryData.id,
      });

      const response = await fetch("/api/products/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating product:", errorData);
        throw new Error(errorData.detail || "Failed to create product");
      }

      const data = await response.json();
      console.log("Product created successfully:", data);
      setProducts([...products, data]);
      setShowAddProduct(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: null,
      });
    } catch (err) {
      console.error("Error in handleAddProduct:", err);
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Category not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{categoryData.name}</h1>
        {session?.user?.is_admin && (
          <button
            onClick={() => setShowAddProduct(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        )}
      </div>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            No products found in this category.
          </p>
          {session?.user?.is_admin && (
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Add Your First Product
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={session?.user?.is_admin ? handleDeleteProduct : null}
            />
          ))}
        </div>
      )}

      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.files[0] })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

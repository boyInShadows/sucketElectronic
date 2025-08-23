"use client";

import { apiUrl } from "../../../libs/api";
import React, { useState, useEffect } from "react";
import { isAuthenticated, isAdmin } from "../../../libs/auth";
import ProductCard from "./ProductCard";
import AddProductModal from "./AddProductModal";

/**
 * CategoryPage Component
 * Displays products for a specific category with admin controls
 *
 * @param {Object} props
 * @param {string} props.categorySlug - The slug of the category to display
 */
const CategoryPage = ({ categorySlug }) => {
  // State management
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState(null);

  // Authentication and admin management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setIsUserAdmin(isAdmin());
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug) return;

      console.log("🔍 ===== CATEGORY PAGE DEBUG =====");
      console.log("🔍 Category slug received:", categorySlug);
      console.log("🔍 Category slug type:", typeof categorySlug);
      console.log("🔍 Category slug length:", categorySlug.length);
      console.log("🔍 Category slug raw:", JSON.stringify(categorySlug));
      
      try {
        // First, let's see what categories exist in the database
        const allCategoriesUrl = apiUrl('/categories/');
        console.log("🔍 Fetching all categories from:", allCategoriesUrl);
        
        const allCategoriesResponse = await fetch(allCategoriesUrl);
        const allCategoriesData = await allCategoriesResponse.json();
        console.log("🔍 All categories in database:", allCategoriesData);
        console.log("🔍 Total categories found:", Array.isArray(allCategoriesData) ? allCategoriesData.length : 'Not an array');
        
        // Now let's look for the specific slug
        // Fix: Don't use apiUrl for query parameters as it adds trailing slash
        const baseUrl = apiUrl('/categories/').replace(/\/$/, ''); // Remove trailing slash
        const categoriesUrl = `${baseUrl}?slug=${categorySlug}`;
        console.log("🔍 Categories API URL:", categoriesUrl);
        console.log("🔍 Looking for slug:", categorySlug);
        console.log("🔍 Encoded slug:", encodeURIComponent(categorySlug));
        
        const response = await fetch(categoriesUrl);
        console.log("🔍 Categories response status:", response.status);
        console.log("🔍 Categories response headers:", Object.fromEntries(response.headers.entries()));
        
        const data = await response.json();
        console.log("🔍 Categories data received:", data);
        console.log("🔍 Data type:", typeof data);
        console.log("🔍 Is array:", Array.isArray(data));
        console.log("🔍 Data length:", Array.isArray(data) ? data.length : 'Not an array');
        
        // Debug: Check if the slug exists in all categories
        const matchingCategory = allCategoriesData.find(cat => cat.slug === categorySlug);
        console.log("🔍 Matching category found:", matchingCategory);
        console.log("🔍 All category slugs:", allCategoriesData.map(cat => cat.slug));

        if (!response.ok) {
          throw new Error(
            `Failed to fetch category: ${response.status} ${response.statusText}`
          );
        }

        // The backend returns a list of categories, we need to find the one with matching slug
        const categoryInfo = Array.isArray(data)
          ? data.find((cat) => cat.slug === categorySlug)
          : null;

        if (categoryInfo) {
          setCategoryData(categoryInfo);
          console.log("🔍 Found category:", categoryInfo);

          // Fetch products using the category ID
          const productsUrl = apiUrl(`/products/?category_id=${categoryInfo.id}`);
          console.log("🔍 Products API URL:", productsUrl);
          
          const productsResponse = await fetch(productsUrl);
          console.log("🔍 Products response status:", productsResponse.status);
          
          const productsData = await productsResponse.json();
          console.log("🔍 Products data received:", productsData);

          if (!productsResponse.ok) {
            throw new Error(productsData.error || "Failed to fetch products");
          }

          setProducts(Array.isArray(productsData) ? productsData : []);
        } else {
          setError("Category not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [categorySlug]);

  // Handle adding new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Get the token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("You must be logged in to add products");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category_id", categoryData.id);

      // Handle image upload
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch(apiUrl("/products/"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating product:", errorData);
        throw new Error(errorData.detail || "Failed to create product");
      }

      const newProduct = await response.json();
      // Ensure the image URL is properly formatted
      if (newProduct.image && !newProduct.image.startsWith("http")) {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://omidelectronicazizkhani.ir';
        newProduct.image = `${baseUrl}/media${newProduct.image}`;
      }

      setProducts([...products, newProduct]);
      setIsModalOpen(false);
      setFormData({ name: "", description: "", price: "", image: null });
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    // Get the token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("You must be logged in to delete products");
      return;
    }

    try {
      const response = await fetch(apiUrl(
        `/api/products/${productId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ));

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error.message);
    }
  };

  // Loading state
  if (!isLoggedIn && !isUserAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E3A8A]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-500 font-vazirmatn">{error}</div>
      </div>
    );
  }

  // Category not found state
  if (!categoryData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500 font-vazirmatn">دسته‌بندی یافت نشد</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Add Product button for admins */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold font-vazirmatn text-neutral-800">
            {categoryData.name}
          </h1>
          {isUserAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-vazirmatn text-sm"
            >
              افزودن محصول
            </button>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-lg">
            <p className="text-neutral-500 mb-6 font-vazirmatn">
              محصولی در این دسته‌بندی یافت نشد.
            </p>
            {isUserAdmin && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-vazirmatn text-sm"
              >
                افزودن اولین محصول
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={isUserAdmin ? handleDeleteProduct : null}
              />
            ))}
          </div>
        )}

        {/* Add Product Modal */}
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProduct}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default CategoryPage;

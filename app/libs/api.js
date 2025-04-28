const API_URL = "http://localhost:8000/api";

// Helper function to handle API responses
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
}

// Helper function to get headers
function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };

  // Add auth token if exists
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Products API
export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products/`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}/`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

// Authentication API
export async function login(credentials) {
  const res = await fetch(`${API_URL}/auth/login/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
}

export async function register(userData) {
  const res = await fetch(`${API_URL}/auth/register/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
}

// Cart API
export async function getCart() {
  const res = await fetch(`${API_URL}/cart/`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

export async function addToCart(productId, quantity = 1) {
  const res = await fetch(`${API_URL}/cart/items/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  return handleResponse(res);
}

export async function removeFromCart(itemId) {
  const res = await fetch(`${API_URL}/cart/items/${itemId}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(res);
}

// Order API
export async function createOrder(orderData) {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(orderData),
  });
  return handleResponse(res);
}

export async function getOrders() {
  const res = await fetch(`${API_URL}/orders/`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

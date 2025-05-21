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
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
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

export async function sendVerificationCode(data) {
  try {
    const res = await fetch(`${API_URL}/auth/send-verification-code/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "خطا در ارسال کد تایید");
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Verification code error:", error);
    throw error;
  }
}

export async function register(userData) {
  try {
    const res = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || "خطا در ثبت نام");
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
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

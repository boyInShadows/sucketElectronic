// In production, use relative '' so browser hits your domain and Nginx proxies to Django.
// In dev, fall back to your local Django on 127.0.0.1:8000.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8000');

  export function getApiBase() {
    const isServer = typeof window === 'undefined';
    // Server code (Next route handlers / server components) should talk to Django via loopback
    if (isServer) return process.env.INTERNAL_API_URL || 'http://127.0.0.1:8000';
    // Browser should call the same origin so Nginx proxies /api → Django
    return process.env.NEXT_PUBLIC_API_URL ?? '';
  }

// Always build endpoints under /api and include trailing slash (DRF needs it)
export function apiUrl(path) {
  const p = path.endsWith('/') ? path : `${path}/`;
  return `${getApiBase()}/api${p}`;
}

// Auth headers helper (safe in browser and server)
export function authHeaders() {
  const h = { 'Content-Type': 'application/json' };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) h.Authorization = `Bearer ${token}`;
  }
  return h;
}

// Optional thin wrapper
export async function apiFetch(path, opts = {}) {
  const r = await fetch(apiUrl(path), opts);
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    throw new Error(`Request failed ${r.status}: ${txt || r.statusText}`);
  }
  return r.json();
}

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
  const res = await fetch(apiUrl("/products/"), {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

export async function fetchProduct(id) {
  const res = await fetch(apiUrl(`/products/${id}/`), {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

// Authentication API
export async function login(credentials) {
  const res = await fetch(apiUrl("/auth/login/"), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
}

export async function sendVerificationCode(data) {
  try {
    const res = await fetch(apiUrl("/auth/send-verification-code/"), {
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
    const res = await fetch(apiUrl("/auth/register/"), {
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
  const res = await fetch(apiUrl("/cart/"), {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

export async function addToCart(productId, quantity = 1) {
  const res = await fetch(apiUrl("/cart/items/"), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  return handleResponse(res);
}

export async function removeFromCart(itemId) {
  const res = await fetch(apiUrl(`/cart/items/${itemId}/`), {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(res);
}

// Order API
export async function createOrder(orderData) {
  const res = await fetch(apiUrl("/orders/"), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(orderData),
  });
  return handleResponse(res);
}

export async function getOrders() {
  const res = await fetch(apiUrl("/orders/"), {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

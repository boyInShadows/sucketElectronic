// Utility functions for handling authentication state

export const getAuthState = () => {
  if (typeof window === "undefined") {
    return {
      token: null,
      isAdmin: false,
      username: null,
    };
  }

  return {
    token: localStorage.getItem("token"),
    isAdmin: localStorage.getItem("is_admin") === "true",
    username: localStorage.getItem("username"),
  };
};

export const setAuthState = (token, username, isAdmin) => {
  if (typeof window === "undefined") return;

  if (token) localStorage.setItem("token", token);
  if (username) localStorage.setItem("username", username);
  localStorage.setItem("is_admin", isAdmin ? "true" : "false");
};

export const clearAuthState = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("is_admin");
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};

export const isAdmin = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("is_admin") === "true";
};

// Debug function to check authentication state
export const debugAuthState = () => {
  if (typeof window === "undefined") return "Server side";
  
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin");
  const username = localStorage.getItem("username");
  
  console.log("=== AUTH DEBUG ===");
  console.log("Token exists:", !!token);
  console.log("Token length:", token ? token.length : 0);
  console.log("Username:", username);
  console.log("Is Admin:", isAdmin);
  console.log("==================");
  
  return { token: !!token, isAdmin, username };
};

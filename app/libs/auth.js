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

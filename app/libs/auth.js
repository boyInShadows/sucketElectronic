// Utility functions for handling authentication state

const TOKEN_EXPIRY_HOURS = 36; // 36 hours as requested

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

  if (token) {
    localStorage.setItem("token", token);
    // Set token expiration time (36 hours from now)
    const expirationTime = Date.now() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    localStorage.setItem("tokenExpiration", expirationTime.toString());
  }
  if (username) localStorage.setItem("username", username);
  localStorage.setItem("is_admin", isAdmin ? "true" : "false");
};

export const clearAuthState = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("is_admin");
  localStorage.removeItem("tokenExpiration");
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  
  const token = localStorage.getItem("token");
  if (!token) return false;

  // Check if token has expired
  const expirationTime = localStorage.getItem("tokenExpiration");
  if (!expirationTime) return false;

  const now = Date.now();
  const expiration = parseInt(expirationTime);

  if (now >= expiration) {
    // Token has expired, clear auth state
    clearAuthState();
    return false;
  }

  return true;
};

export const isAdmin = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("is_admin") === "true";
};

export const isTokenExpired = () => {
  if (typeof window === "undefined") return true;
  
  const expirationTime = localStorage.getItem("tokenExpiration");
  if (!expirationTime) return true;
  
  return Date.now() >= parseInt(expirationTime);
};

export const getTokenExpirationTime = () => {
  if (typeof window === "undefined") return null;
  
  const expirationTime = localStorage.getItem("tokenExpiration");
  if (!expirationTime) return null;
  
  return parseInt(expirationTime);
};

export const getTimeUntilExpiration = () => {
  if (typeof window === "undefined") return 0;
  
  const expirationTime = getTokenExpirationTime();
  if (!expirationTime) return 0;
  
  const timeLeft = expirationTime - Date.now();
  return Math.max(0, timeLeft);
};

export const refreshTokenExpiration = () => {
  if (typeof window === "undefined") return;
  
  const token = localStorage.getItem("token");
  if (!token) return;
  
  // Reset expiration time to 36 hours from now
  const expirationTime = Date.now() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
  localStorage.setItem("tokenExpiration", expirationTime.toString());
};




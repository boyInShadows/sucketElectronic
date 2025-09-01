// Token management utilities for handling JWT tokens with expiration

const TOKEN_EXPIRY_HOURS = 36; // 36 hours as requested

export class TokenManager {
  static getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  static setToken(token) {
    if (typeof window === 'undefined' || !token) return;
    
    localStorage.setItem('token', token);
    
    // Set expiration time (36 hours from now)
    const expirationTime = Date.now() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    
    console.log(`Token set with expiration: ${new Date(expirationTime).toLocaleString()}`);
  }

  static removeToken() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

  static isTokenExpired() {
    if (typeof window === 'undefined') return true;
    
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) return true;
    
    const now = Date.now();
    const expiration = parseInt(expirationTime);
    
    return now >= expiration;
  }

  static getTimeUntilExpiration() {
    if (typeof window === 'undefined') return 0;
    
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) return 0;
    
    const now = Date.now();
    const expiration = parseInt(expirationTime);
    
    return Math.max(0, expiration - now);
  }

  static getExpirationDate() {
    if (typeof window === 'undefined') return null;
    
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) return null;
    
    return new Date(parseInt(expirationTime));
  }

  static formatTimeRemaining(milliseconds) {
    if (milliseconds <= 0) return "منقضی شده";
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours} ساعت و ${minutes} دقیقه`;
    }
    return `${minutes} دقیقه`;
  }

  static getWarningLevel() {
    const timeLeft = this.getTimeUntilExpiration();
    
    if (timeLeft <= 0) return 'expired';
    if (timeLeft < 1800000) return 'critical'; // Less than 30 minutes
    if (timeLeft < 3600000) return 'warning'; // Less than 1 hour
    return 'normal';
  }

  static shouldShowWarning() {
    const timeLeft = this.getTimeUntilExpiration();
    return timeLeft > 0 && timeLeft < 3600000; // Less than 1 hour
  }

  static refreshTokenExpiration() {
    const token = this.getToken();
    if (token) {
      this.setToken(token); // This will reset the expiration time
      return true;
    }
    return false;
  }

  static validateToken() {
    const token = this.getToken();
    if (!token) return false;
    
    if (this.isTokenExpired()) {
      this.removeToken();
      return false;
    }
    
    return true;
  }

  static getTokenInfo() {
    const token = this.getToken();
    const expirationDate = this.getExpirationDate();
    const timeUntilExpiration = this.getTimeUntilExpiration();
    const warningLevel = this.getWarningLevel();
    
    return {
      hasToken: !!token,
      isExpired: this.isTokenExpired(),
      expirationDate,
      timeUntilExpiration,
      formattedTimeRemaining: this.formatTimeRemaining(timeUntilExpiration),
      warningLevel,
      shouldShowWarning: this.shouldShowWarning()
    };
  }

  static clearAll() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('username');
    localStorage.removeItem('is_admin');
  }
}

// Export individual functions for backward compatibility
export const getToken = () => TokenManager.getToken();
export const setToken = (token) => TokenManager.setToken(token);
export const removeToken = () => TokenManager.removeToken();
export const isTokenExpired = () => TokenManager.isTokenExpired();
export const getTimeUntilExpiration = () => TokenManager.getTimeUntilExpiration();
export const getExpirationDate = () => TokenManager.getExpirationDate();
export const formatTimeRemaining = (ms) => TokenManager.formatTimeRemaining(ms);
export const getWarningLevel = () => TokenManager.getWarningLevel();
export const shouldShowWarning = () => TokenManager.shouldShowWarning();
export const refreshTokenExpiration = () => TokenManager.refreshTokenExpiration();
export const validateToken = () => TokenManager.validateToken();
export const getTokenInfo = () => TokenManager.getTokenInfo();
export const clearAll = () => TokenManager.clearAll(); 
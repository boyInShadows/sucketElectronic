import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    isAuthenticated: false,
    isAdmin: false,
    user: null,
  },
});

export const productsState = atom({
  key: "productsState",
  default: {
    products: [],
    loading: false,
    error: null,
  },
});

export const categoriesState = atom({
  key: "categoriesState",
  default: {
    categories: [],
    loading: false,
    error: null,
  },
});

export const modalState = atom({
  key: "modalState",
  default: {
    isOpen: false,
    type: null, // 'addProduct', 'editProduct', etc.
    data: null,
  },
});

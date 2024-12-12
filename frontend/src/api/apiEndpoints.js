const API_BASE = import.meta.env.VITE_API_BASE

export default {
  products: {
    getAll: `${API_BASE}/menu`,
    getById: (id) => `${API_BASE}/menu/${id}`,
    create: `${API_BASE}/menu/form`,
    updateById: (id) => `${API_BASE}/menu/form/${id}`,
    deleteById: `${API_BASE}/menu`,
  },
  categories: {
    getAll: `${API_BASE}/categories`,
  },
  auth: {
    login: `${API_BASE}/auth/login`,
    signup: `${API_BASE}/auth/signup`,
  },
  user: {
    profile: (id) => `${API_BASE}/users/${id}`,
  },
  cart: {
    getCartDetails: `${API_BASE}/cart`,
    addMealToCart: `${API_BASE}/cart/add-meal`,
    deleteMealFromCart: `${API_BASE}/cart/delete-meal`,
    updateMealAmount: `${API_BASE}/cart/update-meal-amount`,
  },
}

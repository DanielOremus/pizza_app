const API_BASE = import.meta.env.VITE_API_BASE

export default {
  products: {
    getAll: `${API_BASE}/menu`,
    getById: (id) => `${API_BASE}/menu/${id}`,
    create: `${API_BASE}/menu/form`,
    updateById: (id) => `${API_BASE}/menu/form/${id}`,
    deleteById: (id) => `${API_BASE}/menu/${id}`,
  },
}

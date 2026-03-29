const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'An error occurred');
  }

  return data;
}

// Products API
export const productsApi = {
  getAll: (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return fetchApi(`/products${query ? `?${query}` : ''}`);
  },
  
  getById: (id: string) => fetchApi(`/products/${id}`),
  
  getCategories: () => fetchApi('/categories'),
};

// Cart API
export const cartApi = {
  get: () => fetchApi('/cart'),
  
  addItem: (productId: string, quantity: number) => 
    fetchApi('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),
  
  updateItem: (itemId: string, quantity: number) =>
    fetchApi(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  
  removeItem: (itemId: string) =>
    fetchApi(`/cart/${itemId}`, {
      method: 'DELETE',
    }),
  
  clear: () =>
    fetchApi('/cart', {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersApi = {
  create: (data: { deliveryAddress: string; paymentMethod: string }) =>
    fetchApi('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getById: (id: string) => fetchApi(`/orders/${id}`),
  
  getByUser: () => fetchApi('/orders/user'),
};

// Delivery API
export const deliveryApi = {
  calculate: (address: string) =>
    fetchApi('/delivery/calculate', {
      method: 'POST',
      body: JSON.stringify({ address }),
    }),
};

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  register: (data: { email: string; password: string; name: string; phone?: string }) =>
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  logout: () => fetchApi('/auth/logout', { method: 'POST' }),
  
  me: () => fetchApi('/auth/me'),
};

export default fetchApi;

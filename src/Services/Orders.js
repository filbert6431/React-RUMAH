import seedOrders from "../Data/Orders.json";
import { getOrderTotal, removeItemSubtotals } from "../lib/orderUtils";

import axios from "axios";

const API_URL = "https://hqkzfluaalojxhwlhvwk.supabase.co/rest/v1/Orders";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3pmbHVhYWxvanhod2xodndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjIyMzQsImV4cCI6MjA5Njc5ODIzNH0.f6R9m70wSbXmmxyHaWMXKJRuca8mTWtpIT2Y9C4So00";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const STORAGE_KEY = "coffee-dashboard-orders";

const cleanOrder = (order) => {
  const items = removeItemSubtotals(order.items || []);

  return {
    ...order,
    id: order.id ?? order.order_id,
    items,
    total: getOrderTotal(items),
  };
};

const readFallbackOrders = () => {
  const savedOrders = localStorage.getItem(STORAGE_KEY);

  if (!savedOrders) {
    const cleanedSeedOrders = seedOrders.map(cleanOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedSeedOrders));
    return cleanedSeedOrders;
  }

  return JSON.parse(savedOrders).map(cleanOrder);
};

export const ordersAPI = {
  async fetchOrders() {
    try {
      const res = await axios.get(API_URL, { headers });
      if (!Array.isArray(res.data)) return [];
      return res.data.map(cleanOrder);
    } catch {
      // fallback (prevents raw errors in UI)
      return readFallbackOrders();
    }
  },

  async createOrder(data) {
    // Expected minimal fields:
    // order_id (or id), order_date, items [{name, qty, price}], total_price
    const payload = {
      order_date: data.order_date || new Date().toISOString(),
      customer_id: data.customer_id || null,
      items: removeItemSubtotals(data.items || []),
      total_price: getOrderTotal(removeItemSubtotals(data.items || [])),
      status: data.status || "Pending",
    };

    const res = await axios.post(API_URL, payload, { headers });
    const created = Array.isArray(res.data) ? res.data[0] : res.data;

    return cleanOrder(created);
  },

  // Keep other methods for admin screens (if they still rely on localStorage)
  async updateOrder(id, data) {
    const orders = readFallbackOrders();
    const updatedOrder = cleanOrder({ ...data, id });
    const nextOrders = orders.map((order) =>
      String(order.id) === String(id) ? updatedOrder : order
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders.map(cleanOrder)));
    return updatedOrder;
  },

  async deleteOrder(id) {
    // best-effort: attempt supabase delete, fallback to localStorage
    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    } catch {
      const orders = readFallbackOrders();
      const nextOrders = orders.filter((order) => String(order.id) !== String(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders.map(cleanOrder)));
    }
  },
};


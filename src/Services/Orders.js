import { getOrderTotal, removeItemSubtotals } from "../lib/orderUtils";
import seedOrders from "../Data/Orders.json";
import axios from "axios";

const API_URL = "https://hqkzfluaalojxhwlhvwk.supabase.co/rest/v1/Orders";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3pmbHVhYWxvanhod2xodndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjIyMzQsImV4cCI6MjA5Njc5ODIzNH0.f6R9m70wSbXmmxyHaWMXKJRuca8mTWtpIT2Y9C4So00";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const STORAGE_KEY = "coffee-dashboard-orders";

// Transform flat structure dari Supabase ke nested structure
const normalizeOrderFromSupabase = (order) => {
  // Handle format flattened dari Supabase: item_name, item_qty, item_price, order_total
  if (order.item_name && !Array.isArray(order.items)) {
    return {
      id: order.id ?? order.order_id,
      order_id: order.order_id,
      customer_id: order.customer_id,
      status: order.status || "Pending",
      total: order.order_total || order.total,
      items: [
        {
          name: order.item_name,
          qty: Number(order.item_qty) || 1,
          price: Number(order.item_price) || 0,
        },
      ],
      order_date: order.order_date,
    };
  }
  // Handle format nested (dari localStorage atau JSON)
  return order;
};

const cleanOrder = (order) => {
  // Normalize format Supabase terlebih dahulu
  const normalized = normalizeOrderFromSupabase(order);
  const items = removeItemSubtotals(normalized.items || []);

  return {
    ...normalized,
    id: normalized.id ?? normalized.order_id,
    items,
    total: normalized.total || getOrderTotal(items),
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
    } catch (err) {
      // fallback (prevents raw errors in UI)
      // But we also log the real Supabase error so we can debug why data isn't loading.
      console.error("Supabase fetchOrders failed:", {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });
      return readFallbackOrders();
    }
  },

  async createOrder(data) {
    // Data dari component punya format nested dengan items array
    // Kita flatten untuk Supabase yang expect: item_name, item_qty, item_price, order_total
    const items = removeItemSubtotals(data.items || []);
    const firstItem = items[0] || {};

    // Format flattened untuk Supabase (hanya item pertama untuk sekarang)
    const payload = {
      order_id: data.order_id,
      customer_id: data.customer_id || null,
      status: data.status || "Pending",
      order_date: data.order_date || new Date().toISOString().split('T')[0],
      order_total: getOrderTotal(items),
      item_name: firstItem.name || "",
      item_qty: firstItem.qty || 1,
      item_price: firstItem.price || 0,
    };

    try {
      const res = await axios.post(API_URL, payload, { headers });
      const created = Array.isArray(res.data) ? res.data[0] : res.data;
      return cleanOrder(created);
    } catch (err) {
      // Fallback to localStorage if Supabase fails
      console.warn("Supabase insert failed, using localStorage fallback:", err);
      const orders = readFallbackOrders();
      const newOrder = cleanOrder({
        ...payload,
        id: data.order_id,
        items: items,
        total: payload.order_total,
      });
      orders.push(newOrder);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.map(cleanOrder)));
      return newOrder;
    }
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


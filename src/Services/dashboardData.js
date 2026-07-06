import customers from "../Data/Customers.json";
import products from "../Data/Products.json";
import reviews from "../Data/Reviews.json";
import staff from "../Data/Staff.json";
import promo from "../Data/Promo.json";
import { ordersAPI } from "./Orders";

export const dashboardDataAPI = {
  async fetchDashboardData() {
    // Orders come from Supabase (with localStorage fallback inside ordersAPI).
    const ordersData = await ordersAPI.fetchOrders();

    // For the rest of dashboard datasets, use local seed JSON directly.
    // This prevents the dashboard from depending on http://localhost:3000/*
    // which may not be available / may not contain those routes.
    return {
      customers,
      orders: ordersData,
      products,
      reviews,
      staff,
      promo,
    };
  },
};


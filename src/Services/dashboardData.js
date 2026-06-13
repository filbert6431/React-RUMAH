import axios from "axios";
import customers from "../Data/Customers.json";
import products from "../Data/Products.json";
import reviews from "../Data/Reviews.json";
import staff from "../Data/Staff.json";
import promo from "../Data/Promo.json";
import { ordersAPI } from "./Orders";

const JSON_SERVER_URL = "http://localhost:3000";

const fetchJsonServer = async (endpoint, fallbackData) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/${endpoint}`);
    return response.data;
  } catch {
    return fallbackData;
  }
};

export const dashboardDataAPI = {
  async fetchDashboardData() {
    const fallbackOrders = await ordersAPI.fetchOrders();

    const [customersData, ordersData, productsData, reviewsData, staffData, promoData] =
      await Promise.all([
        fetchJsonServer("customers", customers),
        fetchJsonServer("orders", fallbackOrders),
        fetchJsonServer("products", products),
        fetchJsonServer("reviews", reviews),
        fetchJsonServer("staff", staff),
        fetchJsonServer("promo", promo),
      ]);

    return {
      customers: customersData,
      orders: ordersData,
      products: productsData,
      reviews: reviewsData,
      staff: staffData,
      promo: promoData,
    };
  },
};

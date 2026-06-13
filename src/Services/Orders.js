import seedOrders from "../Data/Orders.json";
import { getOrderTotal, removeItemSubtotals } from "../lib/orderUtils";

const STORAGE_KEY = "coffee-dashboard-orders";

const cleanOrder = (order) => {
  const items = removeItemSubtotals(order.items || []);

  return {
    ...order,
    items,
    total: getOrderTotal(items),
  };
};

const readOrders = () => {
  const savedOrders = localStorage.getItem(STORAGE_KEY);

  if (!savedOrders) {
    const cleanedSeedOrders = seedOrders.map(cleanOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedSeedOrders));
    return cleanedSeedOrders;
  }

  return JSON.parse(savedOrders).map(cleanOrder);
};

const writeOrders = (orders) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.map(cleanOrder)));
};

export const ordersAPI = {
  async fetchOrders() {
    return readOrders();
  },

  async createOrder(data) {
    const orders = readOrders();
    const nextId = Math.max(0, ...orders.map((order) => Number(order.id) || 0)) + 1;
    const newOrder = cleanOrder({ ...data, id: nextId });

    writeOrders([newOrder, ...orders]);
    return newOrder;
  },

  async updateOrder(id, data) {
    const orders = readOrders();
    const updatedOrder = cleanOrder({ ...data, id });
    const nextOrders = orders.map((order) =>
      String(order.id) === String(id) ? updatedOrder : order
    );

    writeOrders(nextOrders);
    return updatedOrder;
  },

  async deleteOrder(id) {
    const orders = readOrders();
    const nextOrders = orders.filter((order) => String(order.id) !== String(id));

    writeOrders(nextOrders);
  },
};

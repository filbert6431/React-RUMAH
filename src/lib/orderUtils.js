export const emptyOrderItem = {
  name: "",
  qty: 1,
  price: 0,
};

export const getOrderTotal = (items = []) => {
  return items.reduce((sum, item) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;

    return sum + qty * price;
  }, 0);
};

export const formatRupiah = (value) => {
  return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
};

export const removeItemSubtotals = (items = []) => {
  return items.map(({ name = "", qty = 1, price = 0 }) => ({
    name,
    qty: Number(qty) || 1,
    price: Number(price) || 0,
  }));
};

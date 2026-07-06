const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatRupiahCompact = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const getProductName = (product) => {
  return product.nama_product || product.name || "Unknown Product";
};

export const getProductPrice = (product) => {
  return Number(product.harga_product || product.price || 0);
};

export const getOrderItemRevenue = (item) => {
  // Revenue per item = quantity sold multiplied by the item price.
  return Number(item.qty || 0) * Number(item.price || 0);
};

export const getTotalRevenue = (orders) => {
  // Total Revenue = sum of every order item's revenue.
  return orders.reduce((orderTotal, order) => {
    const items = Array.isArray(order.items) ? order.items : [];
    return orderTotal + items.reduce((itemTotal, item) => itemTotal + getOrderItemRevenue(item), 0);
  }, 0);
};

export const getTotalPromoClaims = (promo) => {
  // Promo claims = sum of claim_count from every promo campaign.
  return promo.reduce((total, item) => total + Number(item.claim_count || 0), 0);
};

export const getProductSalesMap = (orders) => {
  return orders.reduce((salesMap, order) => {
    const items = Array.isArray(order.items) ? order.items : [];

    items.forEach((item) => {
      const name = item.name || "Unknown Product";
      const qty = Number(item.qty || 0);
      const revenue = getOrderItemRevenue(item);

      if (!salesMap[name]) {
        salesMap[name] = { name, qty: 0, revenue: 0 };
      }

      salesMap[name].qty += qty;
      salesMap[name].revenue += revenue;
    });

    return salesMap;
  }, {});
};

export const getBestSeller = (orders) => {
  const sales = Object.values(getProductSalesMap(orders));
  return sales.sort((a, b) => b.qty - a.qty)[0] || { name: "-", qty: 0 };
};

export const getAverageRating = (reviews) => {
  if (!reviews.length) return 0;

  // Company Rating = average of all review star values.
  const totalRating = reviews.reduce((total, review) => {
    return total + Number(review.star_review || review.rating || 0);
  }, 0);

  return totalRating / reviews.length;
};

export const getRevenueTrend = (orders) => {
  const revenueByMonth = {};

  orders.forEach((order) => {
    if (!order.order_date) return;

    const date = new Date(order.order_date);
    const month = monthNames[date.getMonth()];

    revenueByMonth[month] = (revenueByMonth[month] || 0) + getTotalRevenue([order]);
  });

  return monthNames
    .filter((month) => revenueByMonth[month])
    .map((month) => ({
      month,
      revenue: revenueByMonth[month],
    }));
};

export const getPromoUsage = (promo) => {
  return promo.map((item) => ({
    name: item.nama_promo || item.name || "Promo",
    claims: Number(item.claim_count || 0),
  }));
};

export const getRecentReviews = (reviews, customers) => {
  const customerNameById = customers.reduce((map, customer) => {
    map[customer.customer_id] = customer.name || customer.Username || customer.customer_id;
    return map;
  }, {});

  return [...reviews]
    .sort((a, b) => Number(b.review_id || b.id || 0) - Number(a.review_id || a.id || 0))
    .slice(0, 5)
    .map((review) => ({
      id: review.review_id || review.id,
      customerName: customerNameById[review.customer_id] || review.customer_id || "Customer",
      rating: Number(review.star_review || review.rating || 0),
      comment: review.review_text || review.comment || "-",
      date: review.review_date || review.date || "-",
    }));
};

export const getProductSalesRanking = (orders) => {
  return Object.values(getProductSalesMap(orders)).sort((a, b) => b.qty - a.qty);
};

export const getProductRevenueRanking = (orders) => {
  return Object.values(getProductSalesMap(orders)).sort((a, b) => b.revenue - a.revenue);
};

export const getStockChartData = (products) => {
  return products.map((product) => ({
    name: getProductName(product),
    stock: Number(product.stock || 0),
    threshold: 20,
  }));
};

export const getLowStockProducts = (products) => {
  return products
    .filter((product) => Number(product.stock || 0) < 20)
    .map((product) => ({
      name: getProductName(product),
      stock: Number(product.stock || 0),
    }));
};

export const getProductTrendComparison = (orders, selectedProducts) => {
  const normalize = (s) => String(s ?? "").trim().toLowerCase();
  const selectedSet = new Set(selectedProducts.map((p) => normalize(p)));

  const monthRows = {};
  monthNames.forEach((month) => {
    monthRows[month] = { month };

    // IMPORTANT: keep consistent keys for recharts dataKey.
    selectedProducts.forEach((productName) => {
      monthRows[month][productName] = 0;
    });
  });

  orders.forEach((order) => {
    if (!order.order_date) return;

    const date = new Date(order.order_date);
    const month = monthNames[date.getMonth()];
    if (!month) return;

    const items = Array.isArray(order.items) ? order.items : [];

    items.forEach((item) => {
      const itemName = item?.name ?? item?.nama_product ?? item?.product_name;
      const normalizedItemName = normalize(itemName);
      if (!selectedSet.has(normalizedItemName)) return;

      const qty = Number(item?.qty || 0);
      if (!qty) return;

      // Find the exact key name present in selectedProducts (case-sensitive) for recharts dataKey
      const exactKey = selectedProducts.find((p) => normalize(p) === normalizedItemName);
      if (!exactKey) return;

      monthRows[month][exactKey] += qty;
    });
  });

  // Keep months where at least one series has any value, so chart isn't empty.
  return monthNames.map((month) => monthRows[month]).filter((row) => {
    return selectedProducts.some((productName) => Number(row[productName] || 0) > 0);
  });
};

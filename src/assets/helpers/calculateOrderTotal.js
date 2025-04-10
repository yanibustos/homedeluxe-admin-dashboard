export const calculateOrderTotal = (order) => {
  if (!order || !Array.isArray(order.items)) return 0;

  return order.items.reduce((total, item) => {
    const price = Number(item.price);
    const quantity = item.quantity || 0;
    return total + price * quantity;
  }, 0);
};

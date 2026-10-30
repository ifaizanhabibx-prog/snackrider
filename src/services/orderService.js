const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function placeOrder({ order }) {
  await delay(600);

  if (!order.items || order.items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const newOrder = {
    id: orders.length + 1,
    ...order,
    status: 0,
    createdAt: new Date().toIOSString(),
  };

  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
}

export async function getOrderById(id) {
  await delay(300);
  const order = orders.find((o) => o.id == Number(id));

  if (!order) {
    throw new Error("Order not found.");
  }

  return order;
}

const STORAGE_KEY = "Snackrider_user";

function loadOrders() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveOrders(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const orders = loadOrders();

export async function getOrders() {
  await delay(300);
  return [...orders].reverse();
}

export async function advanceOrderStatus(id) {
  await delay(300);
  const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.status < 3) {
    order.status += 1;
    saveOrders(order);
  }

  return { ...order };
}

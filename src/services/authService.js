const USERS_KEY = "snackrider_users";
const USER_KEY = "snackrider_user";

export function getSavedUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSavedUser() {
  localStorage.removeItem(USER_KEY);
}

export async function registerUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}

export async function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Wrong email or password");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

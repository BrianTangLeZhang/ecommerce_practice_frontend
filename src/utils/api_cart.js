export const getCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart ? cart : [];
};

export const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) cart = [];
  const itemIndex = cart.findIndex((i) => i._id === product._id);
  if (itemIndex === -1) {
    cart.push({ ...product, quantity: 1 });
  } else {
    cart[itemIndex].quantity++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeItem = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.filter((item) => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeAll = () => {
  localStorage.removeItem("cart");
};

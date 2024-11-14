export const Cart = () => {
  const cart = useState('cart', () => [])

  const addToCart = (item) => {
    cart.value.push(item)
  }

  const removeFromCart = (item) => {
    const index = cart.value.findIndex(cartItem => cartItem.id === item.id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  return { cart, addToCart, removeFromCart }
}
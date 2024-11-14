export const Products = () => {
  let products = useState('products', () => [])

  const setProducts = (items) => {
    products = items
  }

  const toggle_select = (product) => {
    product.selected = !product.selected
  }

  const addProduct = (product) => {
    products.value.push(product);
  }

  const getProduct = (id) => {
    const item = products.value.filter(product => product.id == id).map(product => ({ ...product }));
    return item;
  }

  return { products, setProducts, toggle_select, addProduct, getProduct }
}
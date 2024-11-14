<template lang="">
    
    <cart_component/>

    <div class="container">
        <div class="product" v-for="p in products">
            <product_component :product="p"/>
        </div>
    </div>
</template>

<script setup>
    import { Cart } from '../components/cart/cart_store.js'
    import { Products } from '../components/product/product_store.js'

    const { cart, addToCart, removeFromCart } = Cart()
    let { products, setProducts, toggle_select, addProduct } = Products()

    definePageMeta({
        layout: 'store'
    })

    const url = 'https://fakestoreapi.com/products';
    let { data: products_data } = await useFetch(url);
    products_data = products_data.value.map(product => ({ ...product, selected: false }));

    if(!products.value.length){
        for(let i = 0; i < products_data.length; i++){
            addProduct(products_data[i]);
        }
    }

    useHead({
        title: 'Nuxt 3 Store App | store',
        meta: [
            {'name': 'description', 'content': 'This is the store Ppage of Nuxt 3 Store App'}
        ]
    })

</script>

<style scoped>
    div.container {    
        display: grid;
        gap: 0px 0px;
        grid-template-columns: repeat(auto-fill, minmax(280px, auto));
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
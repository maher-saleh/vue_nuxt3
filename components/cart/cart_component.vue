<template>
    <button class="cart">
        <i class="material-icons">shopping_cart</i>
        ({{ cart.length }})
    </button>
</template>

<script setup>
    import { Cart } from '../components/cart/cart_store.js'

    const { cart, addToCart, removeFromCart } = Cart()
    
</script>

<style scoped>
    button {
        position: fixed;
        right: 20px;
        border: none;
        background-color: #00000029;
        display: flex;
        align-items: center;
        font-size: 19px;
        font-weight: bold;
        padding: 5px;
        border-radius: 4px;
    }
</style>
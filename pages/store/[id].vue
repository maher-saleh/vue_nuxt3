<template>
    
    <Head>
        <Title>Nuxt 3 Store App | {{ product_item[0].title }}</Title>
        <Meta name="description" :content="product_item[0].description"/>
    </Head>

    <cart_component/>
    
        <div class="product" v-for="p in filteredProducts">
            <product_component class="product_card_component" :product="p"/>
        </div>

    <p class="description"><b>Item details: </b>{{ product_item[0].description }}</p>

</template>

<script setup>
    import { Cart } from '../components/cart/cart_store.js'
    import { Products } from '../components/product/product_store.js'

    const { cart, addToCart, removeFromCart } = Cart()

    const filteredProducts = computed(() => products.value.filter(p => p.id == id));

    let { products, setProducts, toggle_select, addProduct, getProduct } = Products()

    const { id, title } = useRoute().params;

    definePageMeta({
        layout: 'store'
    })

    const product_item = getProduct(id);
    let item = product_item[0]
    console.log(item);

    // Serve custom error page in case product id not found
    if(!product_item) {
        throw createError({ statusCode: 404, message: `Product not found: ${id}`, fatal: true });
    }
</script>

<style>

    .product_card_component {
        margin: auto;
    }

    .product_card_component:hover {
        box-shadow: unset !important;
    }

    p.description {
        font-size: 20px;
        margin: 40px 20px;
    }

</style>
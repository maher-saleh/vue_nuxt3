<template>
    <div @click="itemDetails">
        <img :src="product.image" alt="{{ product.title }}">
        <p>{{ product.title }}</p>
        <p><b>Price: </b>${{ product.price }}</p>
        <button :class="{selected: product.selected}" @click="itemSelect(product, $event)">
            <i v-if="product.selected" class="material-icons">clear</i>
            <i v-else class="material-icons">add_shopping_cart</i>
            <span>{{ product.selected ? 'Remove from Cart' : 'Add to Cart' }}</span>
        </button>
    </div>
</template>

<script setup>
    import { Cart } from '../components/cart/cart_store.js'
    import { Products } from '../components/product/product_store.js'

    const { cart, addToCart, removeFromCart } = Cart()
    const { toggle_select } = Products()

    const { product } = defineProps(['product']);
    const emit = defineEmits(['itemSelect', 'itemDeselect']);

    const itemSelect = (product, event) => {
        event.stopPropagation();
        toggle_select(product);
        if(product.selected){
            addToCart(product);
        }else{
            removeFromCart(product)
        }
        console.log(cart.value.length)
    };

    const itemDetails = () => {
        const router = useRoute();
        navigateTo({path:`/store/${product.id}`}); 
    }

</script>

<style scoped>

    div {
        border: 1px solid rgb(202, 202, 202);
        box-sizing: border-box;
        padding: 20px;
        text-align: center;
        width: 280px;
        cursor: pointer;
        transition: .3s;
    }

    div:hover {
        box-shadow: 3px 4px 5px #d1d1d1, -3px -4px 5px #e3e3e3;
    }

    img {
        max-width: 120px;
        object-fit: scale-down;
        height: 200px;
    }

    p {
        display: -webkit-box;
        height: 2em;
        line-height: .96em;  
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis; 
    }

    button {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: auto;
        padding: 5px 10px;
        background-color: #96e9b9;
        border: none;
        box-shadow: 0px 1px 5px #5d5d5d;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        line-height: .8;
    }

    button.selected {
        background-color: #d1d1d1;
    }

    button i {
        margin-right: 10px;
    }
</style>
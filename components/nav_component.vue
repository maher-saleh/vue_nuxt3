<template>
    <header>
        <nav>
            <h1>{{ capitalizedTitle }}</h1>
            <div>
                <ul><nuxt-link to="/">Home</nuxt-link></ul>
                <ul><nuxt-link to="/about">About</nuxt-link></ul>
                <ul><nuxt-link to="/store">Store</nuxt-link></ul>
                <ul><nuxt-link to="/currency">Currency</nuxt-link></ul>
            </div>
        </nav>
    </header>
</template>

<script setup>

    const props = defineProps({
        routePath: {
            type: String,
            default: '',
        },
    })

    const capitalizedTitle = computed(() => {
        let path = props.routePath;
        path = path.split('/');
        const second_path_segment = path.length > 1 ? ' - ' + path[1] : '';
        return path[0].charAt(0).toUpperCase() + path[0].slice(1).toLowerCase();
    });

</script>

<style scoped>
    header {    
        width: 100%;
        position: sticky;
        top: 0;
        left: 0;
        background-color: #e1e1e1;
        margin-bottom: 20px;
        z-index: 1;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav h1 {
        margin: 0;
        margin-left: 10px
    }

    nav div {
        display: flex;
        height: 40px;
        direction: rtl;
    }

    nav ul {
        display: flex;
        margin: 0;
        padding: 5px 10px;
        background-color: #e1e1e1;
        cursor: pointer;
        transition: .3s;
    }
    
    nav ul:hover {
        background-color: #c5c5c5;
    }

    nav ul:has(a.router-link-active) {
        background-color: #96e9b9;
    }

    nav ul a {
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: bold;
    }
</style>
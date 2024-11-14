<template lang="">

    <nav_component v-if="routePath" :routePath="routePath"/>

    <div>
        <slot/>
    </div>
</template>

<script setup>
    const route = useRoute();
    const routePath = computed(() => {
        let path = route.path.replace(/^\//, "");
        return path === '' ? 'Home' : path;
    });
</script>

<style scoped>
    header nav {
        position: absolute;
        left: 0;
        bottom: 0;
    }
</style>
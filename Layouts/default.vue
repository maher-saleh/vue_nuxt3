<template lang="">
    
    <nav_component v-if="routePath" :routePath="routePath"/>

    <div>
        <slot/>
    </div>

    <app_footer/>
    
</template>

<script setup>
    const route = useRoute();
    const routePath = computed(() => {
        let path = route.path.replace(/^\//, "");
        return path === '' ? 'About' : path;
    });
</script>
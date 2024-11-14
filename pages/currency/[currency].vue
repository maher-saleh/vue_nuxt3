<template>
    <div>
        {{ data }}
    </div>
</template>

<script setup>
    const { currency } = useRoute()
    const { data } = await useFetch(`/api/currency/${currency}`)
    console.log(data)
</script>

<style scoped>

</style>
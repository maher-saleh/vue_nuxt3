<template>
    <div>
        <h1>Custom Error Page</h1>
        <p>{{ error.statusCode }}</p>
        <p>{{ error.message }}</p>
        <button @click="handleClearError">Back to home ...</button>
    </div>

</template>

<script setup>
    defineProps(['error'])

    const handleClearError = () => {
        clearError({redirect: '/'})
    }

</script>

<style scoped>
    div {
        text-align: center;
        padding: 30px;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 4px;
    }

    h1 {
        color: #414141;
        font-size: 48px;
    }

    p {
        color: #414141;
        font-size: 40px;
    }

    button {
        padding: 8px 10px;
        background-color: #96d2e9;
        border: none;
        border-radius: 4px;
        box-shadow: 0px 1px 5px #5d5d5d;
        cursor: pointer;
        font-weight: bold;
        font-size: 16px;
    }
</style>
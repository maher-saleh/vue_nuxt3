<template>
    <footer>
        <p>&copy; {{ currentYear }} <span>| </span><span>MAHER SALEH</span> </p>
    </footer>
</template>

<script setup>
    const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>

    @font-face {
        font-family: 'ArialBlk';
        font-style: normal;
        font-weight: normal;
        src: url('@/assets/fonts/ARIBLK.woff') format('woff');
    }

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 20px;
        width: 100%;
        background-color: #c5c5c5;
        display: flex;
        align-items: center;
        padding-left: 10px;
        font-weight: bold;
        font-family: 'ArialBlk';
    }

    p {
        font-size: 12px;
        margin: 0;
    }
    p, span {
        font-family: inherit;
        letter-spacing: -1px;
        color: #888;
    }

    span:nth-child(2) {
        color: #636363;
    }
    </style>
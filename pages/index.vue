<template lang="">
    <div class="about">
        <h1>Nuxt 3 E-Commerce and Currency Exchange Application</h1>
        <p>This project is built using the Vue-based Nuxt 3 framework, designed to provide a seamless and efficient user experience. It integrates two key functionalities:</p>
        <p>- Shopping Cart Counter: The store fetches data from an external API to maintain and display the count of items in the user's cart, showcasing an intuitive way of managing cart items dynamically.</p>
        <p>- Currency Rates and Exchange: A dedicated page retrieves real-time currency rates from an external API, secured with a hidden API key for enhanced protection. This feature enables users to view the current exchange rates and perform currency-to-currency conversions, providing an essential tool for users dealing with multi-currency transactions.</p>
        <p>The application's layout is fully responsive, ensuring optimal display and functionality across all screen sizes, from desktops to mobile devices. With these core features, the application is equipped to handle e-commerce needs alongside currency management, leveraging Nuxt 3's capabilities for optimal performance and security.</p>
    </div>
</template>

<script></script>

<style lang="css">

    div.about {
        margin: 50px;
        transition: .3s ease-in-out;
    }

    div.about h1 {
        margin-bottom: 20px;
    }
    
    div.about * {
        color: #000d4f;
    }

    div.about p:nth-child(3),
    div.about p:nth-child(4) {
        margin-left: 20px;
    }
    
    @media screen and (max-width: 768px) {
        div.about {
            margin: 20px 20px 40px 20px;
            font-size: calc(8px + 1vw);
        }

        div.about p {
            font-size: calc(12px + 1vw);
        }
    }
</style>
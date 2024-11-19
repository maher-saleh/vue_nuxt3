<template>
    <header>
        

        <nav>
            <h1>{{ capitalizedTitle }}</h1>
            <div>
                <a id="burger-menu" ref="menu_toggle" @click="handle_burger_menu_click">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28" width="24" viewBox="0 0 448 512">
                        <!-- !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                    </svg>
                </a>
                <ul ref="menu_list">
                    <li><nuxt-link to="/">About</nuxt-link></li>
                    <li><nuxt-link to="/store">Store</nuxt-link></li>
                    <li><nuxt-link to="/currency">Currency</nuxt-link></li>
                </ul>
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
        return path[0].toUpperCase();
        // return path[0].charAt(0).toUpperCase() + path[0].slice(1).toLowerCase();
    });

    const menu_toggle = ref(null);
    const menu_list = ref(null);

    // Hamburger menu click
    function handle_burger_menu_click() {
        menu_list.value.classList.toggle('open');
    };

    function handleDocumentClick(event){
        
        if (!menu_toggle.value || !menu_list.value) return

        // Check if the click target is neither `menu_toggle` nor `menu_list`
        if (
            !menu_toggle.value.contains(event.target) &&
            !menu_list.value.contains(event.target) &&
            menu_list.value.classList.contains('open')
        ) {
            menu_list.value.classList.remove('open')
        }
    }

    onMounted(async ()=>{
        await nextTick()
        // Close Hamburger menu on click anywhere else
        document.addEventListener('click', handleDocumentClick);
    });



    onBeforeUnmount(() => {
        // Clean up the event listener when the component unmounts
        document.removeEventListener('click', handleDocumentClick);
    })


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
        margin-left: 10px;
        color: #636363;
        font-size: 18px;
        text-transform: uppercase;
        font-family: 'ArialBlk';
        letter-spacing: -1px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    nav div {
        display: flex;
        height: 35px;
        direction: rtl;
    }

    nav ul {
        display: flex;
        margin: 0;
        background-color: #e1e1e1;
        cursor: pointer;
        transition: .3s;
    }

    nav ul li {
        padding: 5px 10px;
        background-color: #e1e1e1;
        align-items: center;
        display: flex;
    }
    
    nav ul li:hover {
        background-color: #c5c5c5;
    }

    nav ul li:has(a.router-link-active) {
        background-color: #96e9b9;
    }

    nav ul a {
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: bold;
    }

    #burger-menu {
        position: relative;
        height: 35px;
        display: none;
        float: right;
        z-index: 4;
    }

    #burger-menu svg{
        margin: 3px 12px;
        transition: .5s;
    }

    #burger-menu svg path{
        fill: #3859ac;
    }

    @media screen and (max-width: 768px) {

        #burger-menu {
            display: block;
        }

        nav ul {
            display: none;
        }

        nav ul.open::before {
            content: '';
            width: 100%;
            height: 100%;
            filter: brightness(0.8) blur(10px);
        }

        nav ul.open {
            height: auto;
            flex-direction: column;
            width: 100%;
            margin: 0;
            padding: 0;
            position: relative;
            background-color: #efefef;
            display: block;
            font-size: 18px;
        }

        nav ul.open li {
            width: 100%;
            margin: 0 !important;
            padding: 0 !important;
        }
        
        nav ul.open li a {
            padding: 10px;
        }

        nav:has(ul.open) #burger-menu svg {
            transform: rotate(-90deg);
        }

        body:has(nav ul.open) #body-container #container,
        body:has(nav ul.open) #body-container #control-panel-container {
            filter: brightness(0.8) blur(10px);
            transition: unset;
        }
    }
</style>
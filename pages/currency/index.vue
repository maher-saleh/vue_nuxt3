<template>

    <div class="controls">
        <button class="fetch_all" @click="fetchAll">Currency Rates</button>
        <button class="fetch_one" @click="fetchOne">Exchange Rate</button>
    </div>

    <div class="exchange_div" v-if="fetching=='exchange_rate'">
        <div class="currency base">
            <label>Base Currency</label>
            <autocomplete :items="currencies" @valueChanged="handle_base_currency_value_change($event)"/>
        </div>

        <div class="currency target">
            <label>Target Currency</label>
            <autocomplete :items="currencies"@valueChanged="handle_target_currency_value_change($event)"/>
        </div>
        
        <div class="currency button">
            <button class="exchange_button" @click="getExchangeRate">Get Exchange Rate</button>
        </div>

        <div class="currency rate" v-if="fetching=='exchange_rate'">
            <p class="exchange_rate" v-if="exchange_rate != '' && status=='idle'">{{ exchange_rate.value }}</p>
        </div>

        <p class="error" v-if="exchange_error">{{ exchange_error }}</p>
    </div>
        

    <loader v-if="status=='loading'"/>

    <div class="data" v-if="status=='idle' && fetching=='all_rates'">
        <span class="pill" v-for="(value, key, index) in displayedResponse" :key="index"
            :class="{ 'odd-class': index % 2 !== 0 }">
            <span class="code">{{ value['code'] }}</span>
            <span class="value">{{ value['value'] }}</span>
        </span>
    </div>
    
</template>

<script setup>
    const currencies = ref([])
    const loading = ref(true)
    const error = ref(null)
    const data = []
    const exchange_error = ref('')
    const base_input = ref('')
    const target_input = ref('')
    const status = ref('idle');
    let response = null;
    const delay = 70;
    const displayedResponse = ref([]);
    const exchange_rate = ref('');
    const fetching = ref('');

    function getExchangeRate(){
        const base_currency = base_input.value;
        const target_currency = target_input.value;

        if(!base_currency) {
            exchange_error.value = 'Select base currency'
            return
        }

        if(!target_currency) {
            exchange_error.value = 'Select target currency'
            return
        }

        fetchExchangeRate(base_currency, target_currency);
    }

    function handle_base_currency_value_change(event) {
        base_input.value = event;
    }

    function handle_target_currency_value_change(event) {
        target_input.value = event;
    }

    onMounted(async () => {
        try {
            // Fetch JSON data from the public directory using $fetch
            const response = await $fetch('/currencies.json')
            currencies.value = response

            data = response.value

            // Assign fetched data to the currencies state
            currencies.value = data

            // Mark loading as false when data is successfully fetched
            loading.value = false
        } catch (err) {
            // If an error occurs, set the error message
            error.value = 'Failed to fetch currencies: ' + err.message
            loading.value = false
        }
    })

    async function delayItem() {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    function fetchOne() {
        fetching.value = 'exchange_rate';
    }

    async function fetchAll() {
        fetching.value = 'all_rates';
        status.value = 'loading';
        setTimeout(async () => {
            const data = await $fetch('/api/currencies', {method: 'POST'});
            const keys = Object.keys(data);
            let index = 0;

            const intervalId = setInterval(async () => {
                if (index < keys.length) {
                    const key = keys[index];
                    
                    displayedResponse.value.push(data[key]);
                    
                    // Wait for the DOM update
                    await nextTick();

                    // Move to the next item
                    index++;

                    // Delay the next update
                    // await delayItem();
                } else {
                    clearInterval(intervalId); // Stop the interval when all items are processed
                }
            }, 50);

            status.value = 'idle';

        }, 2000);
    }
    
    async function fetchExchangeRate(base_currency, target_currency) {
        
        status.value = 'loading';
        exchange_rate.value = '';
        exchange_error.value = '';

        setTimeout(async () => {
            try {
                const data = await $fetch('/api/currency', {method: 'POST', body: {base_currency, target_currency}});

                status.value = 'idle';
                
                if(data){
                    exchange_rate.value = data[target_currency]
                }
            }catch(e){
                status.value = 'idle';
                exchange_error.value = e.message;
            }

        }, 2000);
    }
</script>

<style scoped>

    div {
        display: flex;
        flex-wrap: wrap;
        height: 97px;
    }

    div.controls {
        height: auto;
        width: auto;
        margin-left: 20px;
        justify-content: center;
    }

    div.data {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, auto));
        grid-gap: 0px 30px;
        font-size: 16px;
        padding: 20px;
        height: 100%;
    }

    div.exchange_div {
        margin-top: 50px;
        display: grid;
        grid-template-columns: repeat(1, 354px);
        justify-content: center;
        align-items: center;
    }

    div.currency {
        padding: 10px 20px;
        display: block;
    }
    
    div.currency.rate {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.currency.button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: auto;
        padding: 8px 10px;
        background-color: #96e9b9;
        border: none;
        border-radius: 4px;
        box-shadow: 0px 1px 5px #5d5d5d;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        margin: 5px;
    }

    span {
        display: flex;
        align-items: center;
    }

    span.pill {
        margin-bottom: 15px;
        margin-right: 10px;
    }

    span:not(.pill) {
        border: 1px solid rgb(202, 202, 202);
    }
    
    span.code {
        border-radius: 50px 0 0 50px;
        font-weight: bold;
        background-color: rgb(187, 204, 255);
        padding: 4px 4px 4px 10px;
    }

    span.value {
        border-radius: 0 50px 50px 0;
        background-color: rgb(223, 223, 223);
        padding: 4px 10px 4px 4px;
    }

    label {
        color: #596081
    }

    p {
        padding: 20px;
    }

    p.exchange_rate {
        font-size: 36px;
        font-weight: bold;
        height: 50px;
        width: 296px;
        padding: 0 8px;
        margin: 0;
        border: 1px solid #e1e1e1;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ededed;
        border-color: #97a5e7;
    }

    p.error {
        width: 100%;
        padding: 0 20px;
        color: #b30c00;
        margin: 0;
    }

    button.exchange_button {
        height: max-content;
    }

</style>
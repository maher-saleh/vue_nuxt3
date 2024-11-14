<template>
  <div class="autocomplete-container">
    <input type="text" v-model="query" @input="onInput" placeholder="Select..."/>
        <ul v-if="filteredResults.length && query" class="autocomplete-list">
            <li v-for="(item, index) in filteredResults" :key="index" @click="onSelect(item)" class="autocomplete-item">
                {{ item.Name }} - ({{ item.Code }})
            </li>
        </ul>
  </div>
</template>

<script setup>

    const emit = defineEmits();

    const query = ref('');
    // const items = ref([]); // Predefined list of items
    const props = defineProps({
    items: {
        type: Array,
        required: true
    }
    });

    let currencies = ref([]);

    const filteredResults = ref([]);

    const onInput = () => {
        // const plainArray = [...props.items];
        currencies = convertToPlainArray(props.items);
    
        filteredResults.value = currencies.filter(item => {
            // if (typeof item === 'string') {
            return (item.Code.toLowerCase().includes(query.value.toLowerCase()) || item.Name.toLowerCase().includes(query.value.toLowerCase()));
            // }
            return false; // Return false if item is not a string
        });
    };

    const onSelect = (item) => {
        query.value = item.Code;
        filteredResults.value = [];
        emit('valueChanged', item.Code);
    };

    function unwrapProxy(value) {
        if (value && typeof value === 'object' && value.__v_isReactive) {
            // If the value is a Proxy, unwrap it by accessing its raw object
            return unwrapProxy(value.__v_raw);
        }
        return value;
    }

    // Convert Vue Proxy array to normal JavaScript array with plain objects
    function convertToPlainArray(reactiveArray) {
        return reactiveArray.map(item => unwrapProxy(item));
    }

</script>

<style scoped>
.autocomplete-container {
    position: relative;
}

.autocomplete-list {
    list-style: none;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    width: 300px;
    max-height: 200px;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
    margin-top: 57px;
    margin-left: 4px;
}

.autocomplete-item {
    padding: 8px;
    cursor: pointer;
}

.autocomplete-item:hover {
    background-color: #f0f0f0;
}

input {
    height: 50px;
    width: 296px;
    outline: none;
    border: 1px solid #e1e1e1;
    font-size: 24px;
    border-radius: 4px;
    padding: 0 8px;
    margin-top: 5px;
    font-weight: bold;
}

input:focus {
    border: 1px solid #001681;
}
</style>

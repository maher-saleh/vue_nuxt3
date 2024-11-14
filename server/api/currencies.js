export default defineEventHandler( async (event) => {
    const { currency_api_key } = useRuntimeConfig()

    const { data } = await $fetch(`https://api.currencyapi.com/v3/latest?apikey=${currency_api_key}`);
    return data;
})
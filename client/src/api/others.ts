import axios from "axios"
const API_KEY = import.meta.env.VITE_API_KEY

export const translate = (langpair: any, q: any) =>  axios.request({
    method: 'GET',
    url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
    params: {
        langpair,
        q,
        mt: '1',
        onlyprivate: '0',
        de: 'a@b.c'
    },
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
    }
})

export const get_currency = () => axios.request({
    method: 'GET',
    url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
})
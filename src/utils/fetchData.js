import axios from "axios"

const fetchData=axios.create({
    baseURL:import.meta.env.VITE.API.URL
})

export default fetchData
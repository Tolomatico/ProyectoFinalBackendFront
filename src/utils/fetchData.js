import axios from "axios"

const fetchData=axios.create({
    baseURL:"http://localhost:8080"
})

export default fetchData
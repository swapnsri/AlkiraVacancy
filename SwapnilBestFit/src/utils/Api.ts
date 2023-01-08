import axios from "axios";

const baseURL = 'https://www.balldontlie.io/api/v1'

const headers= {
  "Content-Type": "application/json"
}

const DataFetch = axios.create({
  baseURL,
  headers
})

export default DataFetch
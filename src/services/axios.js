import axios from 'axios';

const API_KEY = import.meta.env.VITE_NASA_API_KEY; // NASA API key from environment variables
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/'; // Base URL for NASA's NEO API


const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY 
  }
});

export default instance; 

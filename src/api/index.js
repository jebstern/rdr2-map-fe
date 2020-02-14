import axios from 'axios'

const API_URL = process.env.NODE_ENV === "production" ? "https://rdr2-map-be.herokuapp.com/collectibles" : "http://localhost:1234/collectibles";

export default {
  getLocations: () => {
    return axios.get(`${API_URL}/locations`).then(res => res.data)
  },
  getGroups: () => {
    return axios.get(`${API_URL}/groups`).then(res => res.data)
  },
  getCategories: () => {
    return axios.get(`${API_URL}/categories`).then(res => res.data)
  },
  toggleLocation: (username, locationId) => {
    return axios.put(`${API_URL}/${username}/${locationId}`)
  },
  getUserLocations: (username) => {
    return axios.get(`${API_URL}/users/${username}`).then(res => res.data)
  },
}

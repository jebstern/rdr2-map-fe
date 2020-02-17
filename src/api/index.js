import axios from 'axios'

const API_URL = process.env.NODE_ENV === "production" ? "https://rdr2-map-be.herokuapp.com/collectibles" : "http://localhost:3000/collectibles";

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
  toggleLocation: (username, locationId, token) => {
    return axios.put(`${API_URL}/${username}/${locationId}`, {}, {headers: {'Authorization': 'JWT ' + token}})
  },
  getUserLocations: (username, token) => {
    return axios.get(`${API_URL}/users/${username}`, {headers: {'Authorization': 'JWT ' + token}}).then(res => res.data)
  },
  verifyToken: (token) => {
    return axios.post(
      `${API_URL}/verifyToken`,
      {token},
    ).then(res => res.data)
  }
}

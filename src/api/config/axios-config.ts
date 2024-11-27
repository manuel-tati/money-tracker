import axios from "axios";


export const instance = (token?: string) => axios.create({
  headers: {
    'Accepts': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  },
  baseURL: "/api/v1/"
})

import axios from 'axios'

const BASE_API_URL = 'http://127.0.0.1:3001'

export const serverAPI = async ({
  path,
  payload,
}) => {
  try {
    
    const response = await axios.post(BASE_API_URL + path, payload, {
      baseURL: BASE_API_URL + path,
    })

    return response
  } catch (error) {
    console.log('API Error => ', error)
  }
}
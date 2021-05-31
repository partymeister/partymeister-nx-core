import { AxiosInstance } from 'axios'

export default ($axios: AxiosInstance) => ({
  post(payload: object) {
    return $axios.post(`/api-rpc/guests/scan_ticket`, payload)
  },
})

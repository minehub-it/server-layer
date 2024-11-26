import axios, {AxiosInstance} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: getAppEndpoints().apiBaseUrl
})

export default {
  async pingServer(address: string, platform: string) {
    return (await api.get(`api/ping/${address}/${platform}`)).data
  },
  async getServer(slug: string): Promise<IServer> {
    return (await api.get(`server/info/${slug}`)).data
  },
  async getPlayers(platform: string): Promise<IServer[]> {
    return (await api.get(`server/players/${platform}`)).data
  },
}
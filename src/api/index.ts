import axios, {AxiosInstance} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: getAppEndpoints().apiBaseUrl
})

export default {
  async getServer(slug: string): Promise<IServer> {
    return (await api.get(`server/info/${slug}`)).data
  },
  async getPlayers(platform: string): Promise<IServer[]> {
    return (await api.get(`server/players/${platform}`)).data
  },
}
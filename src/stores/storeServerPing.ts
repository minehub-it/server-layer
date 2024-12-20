export const useServerPingStore = defineStore('server/ping', () => {
  const serverListStore = useServerListStore()

  async function pingServers(servers: IServer[]) {
    for (let server of servers) {
      pingServer(server)
    }
  }

  async function pingServer(server: IServer) {
    const response = await api.pingServer(server.address, server.platform[0])

    if (response.status === 200) {
      serverListStore.updateServerByProperty(
          'address',
          server.address,
          response.result
      )
    }
  }

  return {
    pingServers
  }
})
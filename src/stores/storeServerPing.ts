export const useServerPingStore = defineStore('server/ping', () => {
  const serverListStore = useServerListStore()

  async function pingServers(servers: IServer[]) {
    for (let server of servers) {
      pingServer(server)
    }
  }

  async function pingServer(server: IServer) {
    const pingResult = await api.pingServer(server.address, server.platform[0])

    serverListStore.updateServerByProperty(
        'address',
        server.address,
        pingResult
    )
  }

  return {
    pingServers
  }
})
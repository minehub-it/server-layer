export const useServerDetailStore = defineStore('server/detail', () => {
  const server: any = ref(null)

  async function fetchServer(slug: string) {
    return api.server.getServer(slug)
      .then(response => setServer(response))
      .catch(e => {
        console.log(e)
      })
  }

  function setServer(data: IServer) {
    server.value = data

    if (server.value && server.value.themeColor) {
      //themeStore.setThemeColor(server.value.themeColor)
    } else {
      //themeStore.resetThemeColor()
    }
  }

  return {
    server,
    fetchServer,
    setServer,
  }
})
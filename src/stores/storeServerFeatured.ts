export const useServerFeaturedStore = defineStore('server/featured', () => {
  const serversFeatured: Ref<any[]> = ref([])

  async function fetchServersFeatured() {
    if (serversFeatured.value.length > 0) {
      return true
    }

    return apiServer.getServersFeatured()
      .then(response => {
        serversFeatured.value = response

        if (serversFeatured.value.length < 3) {
          while (serversFeatured.value.length < 3) {
            serversFeatured.value.push(undefined);
          }
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  return {
    serversFeatured,
    fetchServersFeatured,
  }
})
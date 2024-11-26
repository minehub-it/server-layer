import {defineStore} from "pinia";
import {useAxios} from "~/composables/axios.client";
import { useStorage } from '@vueuse/core'
import api from "~/api";
import {useThemeStore} from "~/stores/storeTheme";

export const useServerFeaturedStore = defineStore('server/featured', () => {
  const projectConfig = useProjectConfig()
  const themeStore = useThemeStore()

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
      themeStore.setThemeColor(server.value.themeColor)
    } else {
      themeStore.resetThemeColor()
    }
  }

  return {
    server,
    fetchServer,
    setServer,
  }
})
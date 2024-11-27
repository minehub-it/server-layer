export const useServerFavoriteStore = defineStore('server/favorite', () => {
  const favorites: Ref<string[]> = ref([])

  function isFavorite(address: string) {
    return favorites.value.includes(address)
  }

  function add(address: string) {
    if (!isFavorite(address)) {
      favorites.value.push(address)
    }
  }

  function remove(address: string) {
    if (isFavorite(address)) {
      favorites.value.splice(favorites.value.indexOf(address), 1)
    }
  }

  return {
    favorites,
    add,
    remove,
    isFavorite,
  }
}, {
  persist: true
})
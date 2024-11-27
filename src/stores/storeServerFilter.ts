export const useServerFilterStore = defineStore('server/filter', () => {
  const orders: any = ref({
    name: null,
    players: null,
  })

  const platform: Ref<string | null> = ref(null)
  const favorite: Ref<boolean> = ref(false)
  const category: Ref<string | null> = ref(null)
  const online: Ref<boolean | null> = ref(null)
  const keyword: Ref<string | null> = ref(null)

  const filters = computed(() => ({
    platform: platform.value,
    favorite: favorite.value,
    category: category.value,
    online: online.value,
    keyword: keyword.value,
  }))

  function setCategory(value: string | null) {
    if (!value) {
      category.value = null
    } else {
      category.value = value
    }

    keyword.value = ''
  }

  function setFavorite(value) {
    favorite.value = value
  }

  function setPlatform(value) {
    platform.value = value
  }

  function setOnline(value) {
    online.value = value
  }

  function setKeyword(value) {
    keyword.value = value
  }

  function setOrder(key: 'name' | 'players', value: null | string) {
    // reset other orders
    for (const k of Object.keys(orders.value)) {
      orders.value[k] = null
    }

    // set order
    orders.value[key] = value
  }

  function toggleOrder(key: 'name' | 'players') {
    switch (key) {
      case 'players':
        if (!orders.value[key]) {
          setOrder(key, 'za')
        } else if (orders.value[key] === 'za') {
          setOrder(key, 'az')
        } else {
          setOrder(key, null)
        }
        break;
      default:
        if (!orders.value[key]) {
          setOrder(key, 'az')
        } else if (orders.value[key] === 'az') {
          setOrder(key, 'za')
        } else {
          setOrder(key, null)
        }

        break;
    }
  }

  return {
    filters,
    orders,
    setOrder,
    toggleOrder,
    setCategory,
    setFavorite,
    setPlatform,
    setOnline,
    setKeyword,
  }
}, {
  persist: piniaPluginPersistedstate.cookies()
})
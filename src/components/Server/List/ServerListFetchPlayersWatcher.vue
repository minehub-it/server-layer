<script setup lang="ts">
let intervalFetchPlayers: any = null

onMounted(() => {
  const { idle } = useIdle(4000)

  intervalFetchPlayers = setInterval(() => {
    if (idle.value) return false
  }, 5000)
})

onBeforeRouteLeave((from, to) => {
  clearInterval(intervalFetchPlayers)
})
</script>

<template />
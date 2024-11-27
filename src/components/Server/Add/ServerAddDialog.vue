<script setup lang="ts">
const dialog = ref(false)
const contactFormSent = ref(false)
const serverAddStore = useServerAddStore()

function onFormSent() {
  window.open(serverAddStore.href, '_blank')

  dialog.value = false
  contactFormSent.value = true

  setTimeout(() => {
    serverAddStore.$v.$reset();
  }, 2000)
}
</script>

<template>
  <v-dialog
      max-width="600px"
      activator="parent"
  >
    <DialogCard>
      <v-card-title>
        Aggiungi server
      </v-card-title>

      <v-card-text>
        <ServerAddForm
            @sent="onFormSent"
        />
      </v-card-text>

    </DialogCard>
  </v-dialog>
</template>

<style scoped lang="scss">
.v-card {
  cursor: default;

  :deep(.v-btn) {
    background: #e0e0e0 !important;
    color: black !important;
    box-shadow: none;
  }
}
</style>
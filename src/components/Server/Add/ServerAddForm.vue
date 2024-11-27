<script setup lang="ts">
const emit = defineEmits(['sent'])

const serverAddStore = useServerAddStore()
const serverCategoryStore = useServerCategoryStore()
const form = ref(undefined)

const $v = serverAddStore.$v

async function onFormSend() {
  const result = await serverAddStore.$v.$validate()

  if (!result) {
    return
  }

  emit('sent')
}
</script>

<template>
  <form
      class="dx-shop__item__contact"
      autocomplete="off"
      ref="form"
  >
    <v-row>
      <v-col>

        <v-text-field
            name="name" autocomplete="off" spellcheck="false"
            label="Nome" :maxlength="30"
            placeholder="SlimeCraft"
            v-model="serverAddStore.fieldName"
            :error="$v.fieldName.$invalid"
            hide-details
        />

      </v-col>
      <v-col>
        <v-text-field
            name="address" autocomplete="off" spellcheck="false"
            label="Indirizzo" :maxlength="30"
            placeholder="mc.slimecraft.net"
            v-model="serverAddStore.fieldAddress"
            :error="$v.fieldAddress.$invalid"
            hide-details
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-select
            multiple
            :items="serverCategoryStore.categories"
            item-title="name"
            item-value="slug"
            label="Categorie"
            placeholder=""
            autocomplete="off" spellcheck="false"
            v-model="serverAddStore.fieldCategories"
            :error="$v.fieldCategories.$invalid"
            hide-details
        />
      </v-col>
      <v-col>
        <v-select
            multiple
            :items="Object.values(platforms)"
            item-title="name"
            item-value="slug"
            label="Piattaforma"
            placeholder=""
            autocomplete="off" spellcheck="false"
            v-model="serverAddStore.fieldPlatform"
            :error="$v.fieldPlatform.$invalid"
            hide-details
        />
      </v-col>
    </v-row>

    <v-btn
        block text="Aggiungi server" class="mt-7"
        size="x-large"
        @click="onFormSend"
    />

  </form>
</template>

<style scoped lang="scss">
.dx-shop__item__contact {
  :deep(.v-input__details) {
    min-height: 20px;
  }

  &__accept-label {
    margin-top: 4px;
    font-size: 16px;
  }
}
</style>
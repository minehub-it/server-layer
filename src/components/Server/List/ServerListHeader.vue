<script setup lang="ts">
const serverListStore = useServerListStore()
const serverFilterStore = useServerFilterStore()
const serverCategoryStore = useServerCategoryStore()
const {categories } = serverCategoryStore
const filters = computed(() => serverFilterStore.filters)
const list = computed(() => serverListStore.list)

const search = reactive({
  text: '',
})

// sync reset
watch(() => filters.value.keyword, value => {
  if (!value) search.text = ''
})

const categorySelected = ref(null)
</script>

<template>
  <MainHeaderSearch name="serverlist">
    <template v-slot:logo>
      <!--
      <LogoTextcraft
        v-if="filters.platform"
        name="serverlist" class="mb-2 mb-md-0 mt-3 mt-sm-0"
        :to="'/lista-server-' + convertPlatformIdToSlug(filters.platform)"
        :description="`Lista server per Minecraft: ${convertPlatformIdToFullName(filters.platform)}`"
        :alt="`Lista dei server italiani per Minecraft: ${convertPlatformIdToFullName(filters.platform)}`"
      />
      -->
      <div class="text-h5 mt-md-3 mt-0 mb-sm-0 mb-2">
        Lista server per <br class="hidden-md-and-up" />
        <strong>Minecraft: {{ convertPlatformIdToFullName(filters.platform) }}</strong>
      </div>
    </template>

    <template v-slot:search>
      <client-only>
        <v-text-field
          class="minehub-smart-search-1"
          chips variant="solo"
          placeholder="Cerca server"
          hide-details
          v-model="search.text"
          @update:modelValue="value => serverFilterStore.setKeyword(value)"
        >
          <template v-slot:append-inner>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </client-only>
    </template>

    <template v-slot:categoriesWide>
      <v-btn
        :to="`/lista-server-${convertPlatformIdToSlug(filters.platform)}`"
        :active="!filters.category"
        class="mx-1 mt-2"
        exact @click="serverFilterStore.setCategory(null)"
      >
       Tutti
      </v-btn>

      <v-btn
        v-for="category of categories"
        :to="`/lista-server-${convertPlatformIdToSlug(filters.platform)}/${category.slug}`"
        class="mx-1 mt-2"
        exact @click="serverFilterStore.setCategory(category.slug)"
      >
        {{category.name}}
      </v-btn>
    </template>

    <template v-slot:categoriesSelect>
      <client-only>
        <ServerCategorySelect
          v-model="categorySelected"
          :categories="categories"
          @update:model-value="category => serverFilterStore.setCategory(category)"
        />
      </client-only>
    </template>
  </MainHeaderSearch>
</template>

<style lang="scss">
#serverlist-main-header {
  .text-h5 {
    strong {
      font-weight: 500;
    }
  }

  .v-btn {
    background: none !important;
    box-shadow: none !important;

    &:not(&--active) {
      .v-btn__overlay {
        display: none;
      }
    }
  }

  .main-header-categories-container {
    max-width: 990px;
  }

  // fix margin between header categories and table
  .v-input {
    .v-input__slot {
      margin-bottom: 0;
    }
  }
}

@media(max-width: 600px) {
  .minehub-smart-search-1 .v-field {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .minehub-smart-search-2 .v-field {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }
}
</style>

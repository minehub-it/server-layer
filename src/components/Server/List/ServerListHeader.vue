<script setup lang="ts">
const serverListStore = useServerListStore()
const serverFilterStore = useServerFilterStore()
const serverCategoryStore = useServerCategoryStore()

const categories = computed(() => serverCategoryStore.categories)
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
        :to="'/lista-server-' + convertPlatformIdToSlug(filters.platform)"
      -->
      <LogoTextcraft
        v-if="filters.platform || filters.favorite"
        name="serverlist" class="mt-3 mb-2 mb-lg-0 mt-sm-1"
        :description="`Lista server per Minecraft: ${convertPlatformIdToFullName(filters.platform)}`"
        :alt="`Lista dei server italiani per Minecraft: ${convertPlatformIdToFullName(filters.platform)}`"
      />
      <v-chip
          v-if="filters.platform"
          class="minehub-serverlist-edition hidden-md-and-down text-overline" size="small"
          :text="filters.platform"
      />
    </template>

    <template v-slot:search>
      <v-text-field
        class="minehub-smart-search-1"
        chips variant="plain"
        placeholder="Cerca server"
        hide-details
        v-model="search.text"
        @update:modelValue="value => serverFilterStore.setKeyword(value)"
      >
        <template v-slot:append-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </template>

    <template v-slot:categoriesWide>
      <ServerCategoryButton
        :to="`/lista-server-${convertPlatformIdToSlug(filters.platform)}`"
        :active="!filters.category"
        text="Tutti"
        @click="serverFilterStore.setCategory(null)"
      />

      <ServerCategoryButton
        v-for="category of categories"
        :to="`/lista-server-${convertPlatformIdToSlug(filters.platform)}/${category.slug}`"
        @click="serverFilterStore.setCategory(category.slug)"
        :text="category.name"
      />
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
.minehub-serverlist-edition {
  font-size: 12px !important;
  margin-top: -58px;
  padding-top: 2px;
  opacity: 0.75;
}

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

  .minehub-smart-search-1 .v-field {
    margin-top: -2px !important;
  }
}

@media(max-width: 600px) {
  .minehub-smart-search-2 .v-field {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }
}
</style>

<template>
  <div id="header-div">
    <img
      :src="require('@/assets/images/logo/portal.svg')"
      width="125"
    >
    <b-navbar-nav class="nav align-items-center ml-auto locale">
      <locale />

    </b-navbar-nav>
  </div>
</template>

<script>
import locale from '@core/layouts/components/app-navbar/components/Locale.vue'
import {
  BNavbarNav,
} from 'bootstrap-vue'

export default {
  components: {
    locale,
    BNavbarNav,
  },
}
</script>
<style scoped>
</style>

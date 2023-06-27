<template>
  <b-img
    :src="logo"
    width="100"
    :alt="logo"
  />
</template>

<script>
import { BImg } from 'bootstrap-vue'

export default {
  components: {
    BImg,
  },
  data() {
    return {
      // eslint-disable-next-line global-require
      logo: require('@/assets/images/avatars/article-logo.png'),
    }
  },
}
</script>

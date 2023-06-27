<template>
  <div>
    <Logout />
    <articles />
  </div>
</template>

<script>
import {
} from 'bootstrap-vue'
import Logout from '../layouts/components/Logout.vue'
import Articles from './Articles.vue'

export default {
  components: {
    // BLink,
    Logout,
    Articles,
  },
}
</script>

<style>
.m-10 {
  margin: 10px;
}
</style>

<template>
  <b-card
    no-body
    class="card-developer-meetup"
  >
    <b-card-header class="pb-1">
      <div class="meetup-header d-flex align-items-center">
        <div class="meetup-day">
          <h6 class="mb-0">
            {{ weekdayName }}
          </h6>
          <h3 class="mb-0">
            {{ todaysDate }}
          </h3>
        </div>
        <div class="my-auto">
          <b-card-title class="mb-25">
            Hello {{ userData.user.name }},
          </b-card-title>
          <b-card-text class="mb-0">
            Enjoy reading Articles 🚀
          </b-card-text>
        </div>
      </div>
      <div>
        <b-link
          v-b-modal.modal-settings
          class="ml-2"
        >
          <feather-icon
            size="16"
            icon="SettingsIcon"
            class="mr-50"
          />
        </b-link>
        <b-link
          class="ml-2"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
        </b-link>
      </div>
    </b-card-header>
    <settings
      :source-id="userData.user.usersettings ? userData.user.usersettings.source_id : 0"
      :catagories-ids="userData.user.usersettings ? userData.user.usersettings.usersettingscatagories : []"
      :reload-method="getArticleFeed"
    />
  </b-card>
</template>

<script>
import { getUserData } from '@/auth/utils'
import {
  BCardHeader, BLink, BCard, BCardTitle, BCardText,
} from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import { EventBus } from '@/event-bus'
import Settings from '@/views/Settings.vue'

export default {
  components: {
    BCardHeader,
    BLink,
    BCardTitle,
    BCardText,
    // Navbar Components
    BCard,
    Settings,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      userData: getUserData(),
      weekdayName: '',
      todaysDate: '',
    }
  },
  created() {
    this.getDayDate()
  },
  methods: {
    getArticleFeed() {
      EventBus.$emit('triggerGetArticleFeed')
    },
    getDayDate() {
      const today = new Date()
      const weekday = today.getDay()
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      this.weekdayName = weekdays[weekday].toUpperCase()

      const date = today.getDate()
      const month = today.getMonth()
      const year = today.getFullYear()
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
      ]
      const monthName = monthNames[month]
      this.todaysDate = `${monthName} ${date}, ${year}`
    },
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'login' })
    },
    getName() {
      return this.userData.data.name
    },
    getRole() {
      const { role } = this.userData
      return role[0]
    },
  },

}
</script>

<style lang="scss">
.content {
  margin-left: 0px !important;
}

.card-developer-meetup .meetup-header {
  margin-bottom: 0px;
}
</style>

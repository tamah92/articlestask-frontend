<template>
  <div>
    <b-overlay
      id="overlay-background"
      :show="loader"
      variant="dark"
      opacity="0.85"
      blur="2px"
      rounded="sm"
      spinner-variant="primary"
      spinner-medium
    >
      <b-row
        class="m-10"
      >
        <b-col
          offset-sm="2"
          offset-md="2"
          offset-lg="2"
          md="8"
          lg="8"
          sm="8"
        >
          <b-card
            no-body
            class="card-employee-task"
          >
            <b-card-header>
              <b-card-title>Articles Feed</b-card-title>
              <b-row>
                <b-col
                  cols="12"
                  md="6"
                  class="d-flex align-items-center justify-content-start mb-1"
                >
                  <label class="mr-1">Author</label>
                  <b-form-input
                    v-model="filterAuthor"
                  />
                </b-col>
                <b-col
                  cols="12"
                  md="6"
                  class="d-flex align-items-center justify-content-start mb-1"
                >
                  <label class="mr-1">Search</label>
                  <b-form-input
                    v-model="filterQuery"
                  />
                </b-col>
              </b-row>
            </b-card-header>
            <b-card-body>
              <div
                v-for="(data, index) in feedData"
                :key="index"
                class="employee-task d-flex justify-content-between align-items-center task-row"
              >
                <b-link
                  class="navbar-brand"
                  :href="data.url"
                  target="_blank"
                >
                  <b-media no-body>
                    <b-media-aside class="mr-75">
                      <b-avatar
                        rounded
                        size="42"
                        src="@/assets/images/avatars/article-logo.png"
                      />
                    </b-media-aside>
                    <b-media-body class="my-auto">
                      <h6 class="mb-0">
                        {{ data.title }}
                      </h6>
                      <div class="minor-details-font">
                        {{ 'Author: '+ data.author }}
                      </div>
                      <div class="minor-details-font">
                        {{ 'Source: ' + data.source }}
                      </div>
                      <div class="minor-details-font">
                        {{ 'Catagory: ' + data.catagory }}
                      </div>
                    </b-media-body>
                  </b-media>
                  <div class="d-flex align-items-center">
                    <small class="text-muted mr-75">{{ data.date }}</small>
                  </div>
                </b-link>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
import {
  BFormInput, BRow, BCol, BCard, BCardBody, BMedia, BMediaBody, BCardHeader, BCardTitle, BMediaAside, BAvatar, BOverlay, BLink,
} from 'bootstrap-vue'
// import store from '@/store'
// import { computed, onUnmounted } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { showToast } from '@core/mixins/ui/toastnotification'
// import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import { required } from '@validations'
import axios from '@axios'
import { EventBus } from '@/event-bus'
// import vSelect from 'vue-select'
// import NewsModal from './NewsModal.vue'

export default {
  components: {
    BLink, BRow, BCol, BCard, BCardBody, BMedia, BMediaBody, BCardHeader, BCardTitle, BMediaAside, BAvatar, BOverlay, BFormInput,
  },
  directives: {
    Ripple,
  },
  mixins: [showToast],
  data() {
    return {
      filterAuthor: '',
      filterQuery: '',
      loader: false,
      feedData: [],
      originalData: [],
    }
  },
  watch: {
    filterQuery: {
      handler() {
        if (!this.filterQuery) this.feedData = this.originalData
        this.filterRecordWithQuery()
      },
    },
    filterAuthor: {
      handler() {
        if (!this.filterAuthor) this.feedData = this.originalData
        if (this.filterAuthor) this.filterRecordWithAuthor()
      },
    },
  },
  created() {
    this.getArticleFeed()
    EventBus.$on('triggerGetArticleFeed', () => {
      this.getArticleFeed()
    })
  },
  beforeMount() {
  },
  methods: {
    filterRecordWithAuthor() {
      this.feedData = this.originalData.filter(element => {
        let result = false
        if (element.author) {
          const lowered = (element.author).toLowerCase()
          result = lowered.includes(this.filterAuthor)
        }
        return result
      })
    },
    filterRecordWithQuery() {
      this.feedData = this.originalData.filter(element => {
        let result = false
        if (element.title) {
          const lowered = (element.title).toLowerCase()
          result = lowered.includes(this.filterQuery)
        }
        return result
      })
    },
    async getArticleFeed() {
      try {
        this.loader = true
        const feedData = await axios.get('/feed/get-feed')
        if (feedData.status) {
          this.feedData = feedData.data.data
          this.originalData = feedData.data.data
          this.loader = false
        }
      } catch (error) {
        console.log('error ', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';
.spinner-border{
  width: 6rem;
  height: 6rem;
}
.card-header {
  border-bottom: 1px solid #efeaea !important;
}

.card-body{
  padding-top: 20px !important;
}

.task-row {
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 10px;
}

span.spinner-border.text-primary {
    width: 25px;
    height: 25px;
}

.media-body {
  margin-top: 10px;
  a {
    color: #606062;
    font-weight: 450;
  }
}

.minor-details-font {
  font-size: 12px;
}
</style>

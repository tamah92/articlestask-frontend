import axios from '@axios'
import { ref } from '@vue/composition-api'
// import constants from '@/app-configs/constants'

export default {
  namespaced: true,
  state: {
    feed: ref({
      status: 0,
      message: '',
      data: [],
    }),
  },
  getters: {},
  mutations: {
    lettersDataHandler(state, data) {
      if (data.status) {
        console.log('data is ', data)
        state.feed.value.status = data.status
        state.feed.value.message = 'Data has been fetch successfully.'
        state.feed.value.data = data.data.data.data
      } else {
        state.feed.value.status = data.status
        state.feed.value.message = 'Data could not be fetched'
        state.feed.value.data = []
      }
    },
  },
  actions: {
    fetchArticleFeed(ctx) {
      axios
        .get('/feed/get-feed')
        .then(response => {
          if (response.status) {
            ctx.commit('feedDataHandler', response)
          }
        })
        .catch(error => console.log(error))
    },
  },
}

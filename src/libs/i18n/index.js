import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from '@axios'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'da',
  fallbackLocale: 'da',
})

async function loadLocaleMessages() {
  const response = await axios.get('/translations/get-translations')
  for (const [lang, trans] of Object.entries(response.data.data)) {
    i18n.setLocaleMessage(lang, trans)
  }
}

loadLocaleMessages()

export default i18n

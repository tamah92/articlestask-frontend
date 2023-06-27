import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context('./messages', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const translations = locales(key)
      messages[locale] = translations
    }
  })
  return messages
}

const i18n = new VueI18n({
  locale: 'en',
  messages: loadLocaleMessages(),
})
export default i18n

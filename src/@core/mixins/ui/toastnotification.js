// We haven't added icon's computed property because it makes this mixin coupled with UI

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export const showToast = {
  data() {
    return {
      msg: '',
    }
  },
  methods: {
    successToast(msg) {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: 'Success',
          icon: 'CoffeeIcon',
          variant: 'success',
          text: msg,
        },
      })
    },
    failureToast(msg) {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: 'Error',
          icon: 'CoffeeIcon',
          variant: 'danger',
          text: msg,
        },
      })
    },
  },
}
export const _ = null

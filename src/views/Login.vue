<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <!-- <vuexy-logo /> -->
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5 banner-side"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
            class="img-background"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5 position-relative"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto credentials-box marginLeftClass"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            {{ 'Sign in to your portal' }}
          </b-card-title>

          <b-alert
            :show="error.length > 0"
            variant="danger"
          >
            <div class="alert-body font-small-2">
              <p>
                <small
                  v-for="(item, index) in error"
                  :key="item + index"
                  class="mr-50"
                ><span class="font-weight-bold">{{ error[index] }}</span></small>
              </p>
            </div>
          </b-alert>

          <!-- form -->
          <validation-observer ref="loginForm">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >
              <!-- username -->
              <b-form-group
                label="Username"
                label-for="login-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Username"
                  rules="required"
                >
                  <b-form-input
                    id="login-username"
                    v-model="username"
                    :state="errors.length > 0 ? false:null"
                    name="login-username"
                    placeholder="username"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">{{ 'Password' }}</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
              >
                {{ 'Sign in' }}
              </b-button>
              <div class="demo-inline-spacing float-right">
                <span class="mr-1">Get yourself</span>
                <b-button
                  v-b-modal.modal-register
                  class="mr-1"
                  variant="relief-primary"
                >
                  Register
                </b-button><span>Here!</span>
              </div>
            </b-form>
          </validation-observer>

        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
    <register />
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BCardTitle, BImg, BForm, BButton, BAlert,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
// import locale from '@core/layouts/components/app-navbar/components/Locale.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
// import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import jwtDefaultConfig from '@core/auth/jwt/jwtDefaultConfig'
import Register from './Register.vue'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    // VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    Register,
    // BNavbarNav,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      username: '',
      sideImg: require('@/assets/images/pages/articleposter.png'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      error: [],
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/articleposter.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  created() {
    if (localStorage.getItem('accessToken')) {
      this.$router.replace('/')
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          useJwt.login({
            email: this.username,
            password: this.password,
          }).then(response => {
            const userData = response.data.data
            useJwt.setToken(userData.token)
            localStorage.setItem(jwtDefaultConfig.storageUserData, JSON.stringify(userData))
            this.$router.replace('/').then(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Welcome to your portal',
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: 'You have successfully logged in. Now you can start to explore different articles!',
                },
              })
            })
          }).catch(error => {
            this.error = error.response.data.message
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
.language-bar {
  position: absolute;
    right: 4rem;
    top: 1rem;
    z-index: 1;
}

.float-right {
  float: right;
}

.credentials-box {
  border: 1px solid #000000;
  border-radius: 15px;
  border-color: #d2edec;
  padding: 20px;
  background-color: #d2edec;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px !important;
}

.img-background {
  box-shadow: 50px 50px 50px 50px white !important;
}

.banner-side {
  background-color: white;
}

@media only screen and (min-width: 992px) {
  .marginLeftClass {
    margin-left: -225px !important;
  }
}
</style>

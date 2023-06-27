<template>
  <div>
    <b-modal
      id="modal-register"
      ref="modal-register"
      cancel-variant="outline-secondary"
      title="Register"
      no-close-on-backdrop
      centered
      hide-footer
      @hidden="resetRegisterModal"
      @ok="submitHandler"
    >
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
        <b-card
          bg-variant="transparent"
          class="shadow-none mb-1"
        >
          <validation-observer ref="registerForm">
            <b-form>
              <b-row>
                <b-col md="12">
                  <b-form-group
                    label="Name"
                    label-for="name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Name"
                      rules="required"
                    >
                      <b-form-input
                        id="name"
                        v-model="name"
                        :state="errors.length > 0 ? false:null"
                        name="Name"
                        placeholder="Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <b-form-group
                    label="Username"
                    label-for="username"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Username"
                      rules="required"
                    >
                      <b-form-input
                        id="username"
                        v-model="username"
                        :state="errors.length > 0 ? false:null"
                        name="Username"
                        placeholder="Username"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <b-form-group
                    label="Password"
                    label-for="password"
                  >
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
                </b-col>
              </b-row>
              <b-button
                variant="relief-primary float-right"
                @click="submitHandler"
              >
                Register
              </b-button>
            </b-form>
          </validation-observer>
        </b-card>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import {
  BCard,
  BFormGroup,
  BFormInput,
  BButton,
  BForm,
  BRow,
  BCol,
  BInputGroup,
  BInputGroupAppend,
  BOverlay,
} from 'bootstrap-vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import axios from '@axios'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    BCard,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BInputGroup,
    BOverlay,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  props: {},
  data() {
    return {
      loader: false,
      name: '',
      Username: '',
      password: '',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  watch: {},
  created() {
  },
  methods: {
    submitHandler() {
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          this.loader = true
          const data = {
            name: this.name,
            email: this.username,
            password: this.password,
          }
          axios.post('/auth/register', data).then(response => {
            console.log('done', response)
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Success',
                icon: 'CoffeeIcon',
                variant: 'primary',
                text: 'You have been registered successfully!',
              },
            })
            this.loader = false
            this.$refs['modal-register'].hide()
          }).catch(err => {
            if (err.response.data.message) {
              this.alertErrors.push(err.response.data.message)
            }
          })
        } else {
          this.loader = false
          // reject()
        }
      })
    },
    resetRegisterModal() {
      this.name = ''
      this.username = ''
      this.password = ''
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';

  .module-card{
    border: 1px solid #d0d0d0 !important;
    margin-bottom: 10px;
  }

  .float-right {
    float: right;
  }

  .card-body {
    padding-bottom: 0px;
  }
</style>

<template>
  <div>
    <b-modal
      id="modal-settings"
      ref="modal-settings"
      cancel-variant="outline-secondary"
      title="User Preferences and Settings"
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
          <validation-observer ref="settingsForm">
            <b-form>
              <b-row>
                <b-col md="12">
                  <b-form-group
                    label="Source"
                    label-for="source"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Source"
                      rules="required"
                    >
                      <v-select
                        v-model="source"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="sourceOptions"
                        :reduce="val => val.value"
                        :clearable="false"
                        input-id="login-status"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <b-form-group
                    label="Catagories"
                    label-for="catagories"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Catagories"
                      rules="required"
                    >
                      <v-select
                        v-model="catagories"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="catagoriesOptions"
                        :reduce="val => val.value"
                        :clearable="false"
                        multiple
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button
                variant="relief-primary float-right"
                @click="submitHandler"
              >
                Save
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
  BButton,
  BForm,
  BRow,
  BCol,
  BOverlay,
} from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import axios from '@axios'
import { required } from '@validations'
import vSelect from 'vue-select'
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
    BOverlay,
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  props: {
    sourceId: {
      type: Number,
      required: true,
    },
    catagoriesIds: {
      type: Array,
      required: true,
    },
    reloadMethod: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      userData: getUserData(),
      loader: false,
      sourceOptions: [],
      source: 0,
      catagories: [],
      catagoriesOptions: [],
      firstLoad: true,
      required,
    }
  },
  watch: {
    source: {
      handler() {
        this.catagories = []
        if (this.firstLoad) this.filterCatagoriesIds()
        this.getCatagories(this.source)
      },
    },
    sourceId: {
      handler() {
        this.source = this.sourceId
      },
    },
  },
  created() {
    this.getSources()
    if (this.sourceId > 0) this.source = this.sourceId
  },
  methods: {
    filterCatagoriesIds() {
      this.catagoriesIds.forEach(element => {
        this.catagories.push(element.catagory_id)
      })
      this.firstLoad = false
    },
    getSources() {
      this.loader = true
      const url = '/settings/get-sources-dropdown'
      axios.get(url).then(response => {
        if (response.status === 200) {
          this.sourceOptions = response.data.data
          this.loader = false
        }
      })
    },
    getCatagories(id) {
      this.loader = true
      const url = `/settings/get-catagories-dropdown?source_id=${id}`
      axios.get(url).then(response => {
        if (response.status === 200) {
          this.catagoriesOptions = response.data.data
          this.loader = false
        }
      })
    },
    submitHandler() {
      this.$refs.settingsForm.validate().then(success => {
        if (success) {
          this.loader = true
          const data = {
            user_id: this.userData.user.id,
            source_id: this.source,
            catagories_ids: this.catagories,
          }
          axios.post('/settings/save-user-settings', data).then(response => {
            if (response.status) {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Success',
                  icon: 'CoffeeIcon',
                  variant: 'primary',
                  text: 'Settings have been saved successfully!',
                },
              })
              this.loader = false
              this.$refs['modal-settings'].hide()
              this.reloadMethod()
            }
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

  .search_by_select .vs__dropdown-toggle{
    width: 160px;
  }
</style>

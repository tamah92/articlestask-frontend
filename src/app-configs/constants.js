import baseUrl from './baseUrl'

export default {
  action: {
    permissionUserView: 'view-users',
    permissionUserAdd: 'add-users',
    permissionUserEdit: 'edit-users',
    permissionUserDelete: 'delete-users',
    permissionUserLogin: 'login',
    permissionClientView: 'view-client',
    permissionClientAdd: 'add-client',
    permissionClientEdit: 'edit-client',
    permissionClientDelete: 'delete-client',
    permissionLogin: 'login',
    permissionPaymentMethodView: 'view-payment-method',
    permissionPaymentMethodAdd: 'add-payment-method',
    permissionPaymentMethodEdit: 'edit-payment-method',
    permissionPaymentMethodDelete: 'delete-payment-method',
    permissionSettings: 'settings',
    permissionTranslationView: 'view-translation',
    permissionTranslationAdd: 'add-translation',
    permissionTranslationEdit: 'edit-translation',
    permissionTranslationDelete: 'delete-translation',
    permissionRoleView: 'view-roles',
    permissionRoleAdd: 'add-roles',
    permissionRoleEdit: 'edit-roles',
    permissionRoleDelete: 'delete-roles',
    permissionApiTokenAdd: 'add-api-tokens',
    permissionApiTokenEdit: 'edit-api-tokens',
    permissionApiTokenDelete: 'delete-api-tokens',
    permissionApiTokenList: 'view-api-tokens',
    permissionApiTokenRevoke: 'revoke-api-tokens',
  },

  resource: {
    user: 'App\\Models\\User\\User',
    client: 'App\\Models\\Client\\Client',
    paymentMethod: 'App\\Models\\PaymentMethod\\PaymentMethod',
    translation: 'App\\Models\\Translation\\Translation',
    role: 'App\\Models\\Permission\\DefaultPermission',
    apiToken: 'App\\Models\\ApiTokens',
  },

  // BASEURL
  baseUrl: baseUrl.ApiBaseUrl,
  serverBaseUrl: baseUrl.serverBaseUrl,
}

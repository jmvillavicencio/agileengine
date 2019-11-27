<template>
  <div>
    <v-container class="fill-height">
      <v-row class="justify-center">
        <custom-card width="400">
          <v-form
            v-model="validLogin"
            @submit.prevent="submitLogin"
            lazy-validation
            ref="form"
          >
            <h3 class="mb-6">
              {{ __('Fake Login') }} <span class="caption">Almost any email or psw should work ;)</span>
            </h3>
            <v-alert
              v-if="success"
              dense
              text
              type="success"
            >
              Successfuly authenticated
            </v-alert>
            <v-alert
              v-if="error"
              dense
              text
              type="error"
            >
            {{ this.error || 'Oops! Something went wrong. Please, try again later' }}.
          </v-alert>
            <v-text-field
              v-model="email"
              :label="__('E-mail')"
              :rules="emailRules"
              name="email"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :label="__('Password')"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              name="password"
              outlined
            ></v-text-field>
            <v-btn
              :loading="loading"
              color="primary"
              block
              rounded
              type="submit"
            >
              {{ __('Login') }}
            </v-btn>
          </v-form>
        </custom-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      showPassword: false,
      password: null,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'Password must be less than 10 characters',
      ],
      email: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      loading: false,
      success: false,
      error: false,
      validLogin: true,
    };
  },
  computed: {
    ...mapGetters('user', ['userId']),
  },
  methods: {
    ...mapActions('user', {
      userLogin: 'login',
    }),
    async submitLogin() {
      this.error = false;
      this.success = false;
      this.loading = true;
      if (this.$refs.form.validate()) {
        try {
          await this.userLogin({
            email: this.email,
            password: this.password,
          });
          this.success = true;
          this.$router.push({ name: 'NewTransaction' });
        } catch (e) {
          this.error = this.handleAPIError(e.response.data.error);
        }
      }
      this.loading = false;
    },
  },
  watch: {
    userId(v) {
      if (v) {
        this.$router.push({ name: 'NewTransaction' });
      }
    },
  },
};
</script>

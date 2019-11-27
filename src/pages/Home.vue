<template>
  <div>
    <v-container class="fill-height">
      <v-row class="justify-center">
        <custom-card width="400">
          <v-form @submit.prevent="submitLogin">
            <h3 class="mb-6">
              {{ __('Fake Login') }}
            </h3>
            <v-text-field
              v-model="email"
              :label="__('Email')"
              name="email"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="password"
              :label="__('Password')"
              name="password"
              type="password"
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
      password: null,
      email: null,
      loading: false,
      success: false,
      error: false,
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
      try {
        await this.userLogin({
          email: this.email,
          password: this.password,
        });
        this.success = true;
        this.$router.push({ name: 'NewTransaction' });
      } catch (e) {
        this.error = true;
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
